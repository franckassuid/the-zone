import React from 'react';
import clsx from 'clsx';

const Layout = ({ children, className }) => {
    return (
        <div className={clsx("min-h-screen flex flex-col bg-transparent text-gray-100 transition-colors duration-300", className)}>
            <main className="flex-1 flex flex-col w-full max-w-md mx-auto p-6 relative">
                {children}
            </main>
        </div>
    );
};

export default Layout;
