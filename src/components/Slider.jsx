import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const Slider = ({
    value = 50,
    onChange,
    disabled = false,
    showTarget = false,
    targetValue = 50, // 0 to 100
    targetWidth = 10, // Width of the winning zone in percent
    className
}) => {
    const containerRef = useRef(null);
    const [constraints, setConstraints] = useState({ width: 0, height: 0 });

    // Angle: -90 (left) to 90 (right). 0 is top/center.
    // Input Value: 0 to 100.
    // Mapping: 0 -> -80deg, 100 -> 80deg (keeping some padding)
    const MAX_ANGLE = 80;

    const valueToAngle = (v) => ((v / 100) * (MAX_ANGLE * 2)) - MAX_ANGLE;
    const angleToValue = (a) => ((a + MAX_ANGLE) / (MAX_ANGLE * 2)) * 100;

    const angle = useMotionValue(valueToAngle(value));

    // Update angle when value prop changes externally (e.g. from other players)
    useEffect(() => {
        animate(angle, valueToAngle(value), { type: "spring", stiffness: 300, damping: 30 });
    }, [value]);

    const handlePan = (event, info) => {
        if (disabled || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height; // Pivot is at the bottom center of the mostly-half-circle

        // Mouse/Touch position relative to container
        const x = info.point.x - rect.left - centerX;
        const y = info.point.y - rect.top - centerY;

        // Calculate angle in degrees
        // atan2(y, x) -> gives angle from positive x axis.
        // We want 0 at -90deg (up).
        // Actually, let's just use simple geometry relative to vertical.
        // At top (x=0, y=-R), angle should be 0.
        // Left (x=-R, y=0), angle -90.

        let newAngle = Math.atan2(x, -y) * (180 / Math.PI);

        // Clamp
        newAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, newAngle));

        angle.set(newAngle);

        if (onChange) {
            onChange(angleToValue(newAngle));
        }

        // Haptic feedback on movement (throttled implicitly by frame rate, might need explicit throttle for haptics)
        if (navigator.vibrate) {
            // Only vibrate if value changed significantly? For now just simple light vibration.
            // navigator.vibrate(5); // Can be annoying if too frequent.
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full aspect-[2/1] max-w-lg mx-auto overflow-hidden ${className}`}
            style={{ touchAction: 'none' }} // Prevent scrolling while dragging
            onPointerDown={(e) => {
                // Allow instant jump on click/tap
                if (disabled || !containerRef.current) return;
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height;
                const x = e.clientX - rect.left - centerX;
                const y = e.clientY - rect.top - centerY;
                let newAngle = Math.atan2(x, -y) * (180 / Math.PI);
                newAngle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, newAngle));
                animate(angle, newAngle, { type: "spring", bounce: 0.1 });
                if (onChange) onChange(angleToValue(newAngle));
            }}
        >
            <motion.div
                className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
                onPan={handlePan}
            >
                {/* Background Arc */}
                <svg viewBox="0 0 200 100" className="w-full h-full overflow-visible">
                    {/* Glow Filter */}
                    <defs>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Track */}
                    <path d="M 10 100 A 90 90 0 0 1 190 100" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-800" />

                    {/* Detailed Score Zones (RevealMode) */}
                    {showTarget && (
                        <g filter="url(#glow)">
                            {/* 2 Points Zone (Total Width ~ 30% -> +/- 15) */}
                            <TargetArc value={targetValue} width={30} maxAngle={MAX_ANGLE} color="#34D399" opacity={0.3} strokeWidth={12} />

                            {/* 3 Points Zone (Total Width ~ 16% -> +/- 8) */}
                            <TargetArc value={targetValue} width={16} maxAngle={MAX_ANGLE} color="#34D399" opacity={0.6} strokeWidth={12} />

                            {/* 4 Points Zone (Total Width ~ 4% -> +/- 2) */}
                            <TargetArc value={targetValue} width={4} maxAngle={MAX_ANGLE} color="#FFFFFF" opacity={1} strokeWidth={14} />
                        </g>
                    )}

                    {/* Graduations 0-10 */}
                    <g className="text-gray-600 dark:text-gray-500 text-[8px] font-medium pointer-events-none select-none">
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((tick) => {
                            // Don't show 0 and 100 if they clutter
                            if (tick === 0 || tick === 100) return null;

                            const angle = valueToAngle(tick);
                            // Polar to cartesian for label position (slightly outside radius 90)
                            const radius = 78; // Inside the arc
                            const angleRad = (angle - 90) * Math.PI / 180;
                            const x = 100 + radius * Math.cos(angleRad);
                            const y = 100 + radius * Math.sin(angleRad);

                            return (
                                <text
                                    key={tick}
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="currentColor"
                                    className="opacity-60"
                                >
                                    {tick / 10}
                                </text>
                            );
                        })}
                    </g>
                </svg>
            </motion.div>

            {/* Needle */}
            <motion.div
                style={{ rotate: angle }}
                className="absolute bottom-0 left-1/2 w-1 h-[90%] origin-bottom -ml-0.5 pointer-events-none z-10"
            >
                <div className="absolute top-0 left-1/2 -ml-0.5 w-1 h-full bg-primary-indigo shadow-[0_0_15px_rgba(99,102,241,0.6)]"></div>
                <div className="absolute -top-2 left-1/2 -ml-3 w-6 h-6 bg-gray-900 border-2 border-primary-indigo rounded-full shadow-[0_0_20px_rgba(99,102,241,0.8)]" />
            </motion.div>

            {/* Pivot Point */}
            <div className="absolute bottom-0 left-1/2 -ml-4 -mb-4 w-8 h-8 bg-gray-800 rounded-full z-20 pointer-events-none shadow-lg border border-gray-700" />
        </div>
    );
};

// Helper for SVG Arc calculation
const TargetArc = ({ value, width, maxAngle, color = "#6366F1", opacity = 0.5, strokeWidth = 8 }) => {
    // value 0-100.
    // Angle -MAX to +MAX.
    // Clamp values to avoid drawing outside the range
    const clampedValue = Math.max(0, Math.min(100, value));

    // Width is in percentage points.
    const startVal = Math.max(0, clampedValue - width / 2);
    const endVal = Math.min(100, clampedValue + width / 2);

    const startAngle = ((startVal / 100) * (maxAngle * 2)) - maxAngle;
    const endAngle = ((endVal / 100) * (maxAngle * 2)) - maxAngle;

    // Convert to Polar for SVG path
    // Center 100, 100. Radius 90.
    // 0 deg is UP. SVG coords: -90 deg is Left (10, 100).
    // Math.cos/sin take radians. 0 rad is Right.
    // So -90 deg (our left view) is actually 180 deg in standard circle terms?
    // Let's allow standard math: 0 is Right (190, 100). -90 is Top (100, 10). -180 is Left (10, 100).
    // Our input angles: -80 (Left) to +80 (Right) relative to Top.
    // So in standard SVG circle terms (0=Right, clockwise):
    // Top is -90 deg.
    // Our '0' is -90.
    // Our '-80' is -170.
    // Our '+80' is -10.

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
        const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    const start = polarToCartesian(100, 100, 90, endAngle); // SVG stroke goes clockwise usually, but let's just draw arc
    const end = polarToCartesian(100, 100, 90, startAngle);

    const largeArcFlag = (endAngle - startAngle) >= 180 ? "1" : "0";

    const d = [
        "M", start.x, start.y,
        "A", 90, 90, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return (
        <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="butt" className="transition-all duration-500" style={{ opacity }} />
    );
}

export default Slider;
