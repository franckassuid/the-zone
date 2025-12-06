import React, { useState, useEffect } from 'react';
import Button from './Button';
import { Share, PlusSquare } from 'lucide-react';

const PWAInstallPrompt = () => {
    const [deferredPrompt, setDeferredPrompt] = useState(null);
    const [isIOS, setIsIOS] = useState(false);
    const [showPrompt, setShowPrompt] = useState(false);

    useEffect(() => {
        // Check if iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
        const isStandalone = window.navigator.standalone === true || window.matchMedia('(display-mode: standalone)').matches;

        if (isIosDevice && !isStandalone) {
            setIsIOS(true);
            // Show prompt after a delay to not be annoying immediately
            const timer = setTimeout(() => setShowPrompt(true), 2000);
            return () => clearTimeout(timer);
        }

        // Check for Android/Chrome install prompt
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowPrompt(true);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                setDeferredPrompt(null);
                setShowPrompt(false);
            });
        }
    };

    if (!showPrompt) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 p-4 z-50 animate-in slide-in-from-bottom duration-500">
            <div className="bg-surface-light dark:bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-2xl relative">
                <button
                    onClick={() => setShowPrompt(false)}
                    className="absolute top-2 right-4 text-gray-500 hover:text-white text-xl font-bold"
                >
                    &times;
                </button>

                <h3 className="text-lg font-bold mb-2">Installer l'Application</h3>

                {isIOS ? (
                    <div className="text-sm text-gray-400 space-y-4">
                        <p>Pour une meilleure expérience, installez l'app sur votre écran d'accueil :</p>
                        <div className="flex items-center space-x-2">
                            <span>1. Appuyez sur</span>
                            <Share size={20} className="text-primary-indigo" />
                            <span>(Partager)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span>2. Sélectionnez</span>
                            <span className="font-bold text-gray-200">"Sur l'écran d'accueil"</span>
                            <PlusSquare size={20} className="text-gray-200" />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-400">Installez l'application pour jouer hors ligne et en plein écran !</p>
                        <Button fullWidth onClick={handleInstallClick}>
                            Installer
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PWAInstallPrompt;
