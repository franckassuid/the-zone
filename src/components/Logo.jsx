import React from 'react';
import clsx from 'clsx';

const Logo = ({ className }) => {
    return (
        <div className={clsx("flex items-center justify-center space-x-2", className)}>
            <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-primary-indigo/20 rounded-full blur-md"></div>
                <svg viewBox="0 0 100 100" className="w-full h-full text-white overflow-visible">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#logo-gradient)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="20" fill="url(#logo-gradient)" />
                    <defs>
                        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366F1" />
                            <stop offset="100%" stopColor="#F472B6" />
                        </linearGradient>
                    </defs>
                    {/* Animated Pulse or Signal */}
                    <path d="M 50 25 L 50 15" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
                    <path d="M 75 50 L 85 50" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <path d="M 50 75 L 50 85" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                    <path d="M 25 50 L 15 50" stroke="white" strokeWidth="4" strokeLinecap="round" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                </svg>
            </div>
            <div className="flex flex-col">
                <h1 className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-indigo to-primary-coral tracking-tighter leading-none">
                    THE ZONE
                </h1>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] leading-none ml-0.5">
                    Trouvez la fréquence
                </span>
            </div>
        </div>
    );
};

export default Logo;
