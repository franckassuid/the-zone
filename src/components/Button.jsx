import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const variants = {
    primary: "bg-primary-indigo text-white shadow-lg shadow-primary-indigo/30 hover:bg-primary-indigo/90",
    secondary: "bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800",
    success: "bg-success text-white shadow-lg shadow-success/30 hover:bg-success/90",
    danger: "bg-primary-coral text-white shadow-lg shadow-primary-coral/30 hover:bg-primary-coral/90",
    ghost: "bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-100",
};

const Button = ({
    children,
    variant = 'primary',
    className,
    loading = false,
    fullWidth = false,
    ...props
}) => {
    return (
        <motion.button
            whileTap={{ scale: 0.96 }}
            className={clsx(
                "relative rounded-xl font-semibold py-3.5 px-6 transition-all duration-200 flex-center disabled:opacity-50 disabled:cursor-not-allowed",
                variants[variant],
                fullWidth && "w-full",
                className
            )}
            disabled={loading || props.disabled}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {children}
        </motion.button>
    );
};

export default Button;
