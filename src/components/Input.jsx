import React from 'react';
import clsx from 'clsx';

const Input = React.forwardRef(({ className, error, label, ...props }, ref) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    {label}
                </label>
            )}
            <input
                ref={ref}
                className={clsx(
                    "w-full bg-surface-light dark:bg-surface-dark text-gray-900 dark:text-white rounded-xl border-2 px-4 py-3 outline-none transition-all duration-200 placeholder:text-gray-400",
                    error
                        ? "border-primary-coral focus:border-primary-coral focus:shadow-[0_0_0_4px_rgba(244,63,94,0.1)]"
                        : "border-gray-200 dark:border-gray-800 focus:border-primary-indigo focus:shadow-[0_0_0_4px_rgba(99,102,241,0.1)] hover:border-gray-300 dark:hover:border-gray-700",
                    className
                )}
                {...props}
            />
            {error && (
                <p className="text-sm text-primary-coral animate-in slide-in-from-left-1">{error}</p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
