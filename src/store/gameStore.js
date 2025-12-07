import { create } from 'zustand';

const THEMES = [
    { left: "Pauvre", right: "Riche" },
    { left: "Petit", right: "Grand" },
    { left: "Doux", right: "Violent" },
    { left: "Nul en cuisine", right: "Chef étoilé" },
    { left: "Faible", right: "Musclé" },
    { left: "Lente", right: "Rapide" },
    { left: "Timide", right: "Confiant" },
    { left: "Naïf", right: "Parano" },
    { left: "Sale", right: "Propre" },
    { left: "Calme", right: "Explosif" },
    { left: "Froid", right: "Chaud" },
    { left: "Triste", right: "Heureux" },
    { left: "Vieillot", right: "Futuriste" },
    { left: "Délicat", right: "Robuste" },
    { left: "Fragile", right: "Indestructible" },
    { left: "Inutile", right: "Essentiel" },
    { left: "Discret", right: "Tape-à-l’œil" },
    { left: "Ennuyant", right: "Passionnant" },
    { left: "Irréel", right: "Hyper réaliste" },
    { left: "Sobre", right: "Déjanté" },
    { left: "Économique", right: "Luxueux" },
    { left: "Sain", right: "Catastrophique pour la santé" },
    { left: "Minuscule", right: "Immense" },
    { left: "Simple", right: "Ultra complexe" },
    { left: "Basique", right: "Classe" },
    { left: "Zéro confiance", right: "Confiance totale" },
    { left: "Fade", right: "Épicé" },
    { left: "Mou", right: "Dur" },
    { left: "Faible", right: "Monstrueusement puissant" },
    { left: "Ennuyeux", right: "Hilarant" },
    { left: "Débutant", right: "Expert" },
    { left: "Ringard", right: "Stylé" },
    { left: "Inoffensif", right: "Dangereux" },
    { left: "Confus", right: "Clair" },
    { left: "Bas bruit", right: "Très bruyant" },
    { left: "Léger", right: "Lourd" },
    { left: "Peu motivé", right: "Surmotivé" },
    { left: "Flemmard", right: "Productif" },
    { left: "Peu connu", right: "Ultra connu" },
    { left: "Petit risque", right: "Gros risque" },
    { left: "Plat", right: "Montagneux" },
    { left: "Alcool faible", right: "Alcool fort" },
    { left: "Zéro hype", right: "Maxi hype" },
    { left: "Peu romantique", right: "Ultra romantique" },
    { left: "Bas budget", right: "Hors de prix" },
    { left: "Peu stimulant", right: "Très stimulant" },
    { left: "Hypo sucré", right: "Hyper sucré" },
    { left: "Sans goût", right: "Explosion de saveur" },
    { left: "Normal", right: "Complètement fou" },
    { left: "Invisible", right: "Visible" },
    { left: "Peu organisé", right: "Très organisé" },
    { left: "Introverti", right: "Extraverti" },
    { left: "Impoli", right: "Hyper poli" },
    { left: "Ancien", right: "Moderne" },
    { left: "Minimaliste", right: "Maximaliste" },
    { left: "Pas stressant", right: "Ultra stressant" },
    { left: "Zéro ambiance", right: "Ambiance énorme" },
    { left: "Moelleux", right: "Croquant" },
    { left: "Zéro énergie", right: "Plein d’énergie" },
    { left: "Peu responsable", right: "Très responsable" },
    { left: "Court", right: "Très long" },
    { left: "Peu fiable", right: "Très fiable" },
    { left: "Simple", right: "Technique" },
    { left: "Faible intensité", right: "Haute intensité" },
    { left: "Plat", right: "Dramatique" },
    { left: "Peu effrayant", right: "Terrifiant" },
    { left: "Petit bruit", right: "Grosse explosion" },
    { left: "Pas addictif", right: "Ultra addictif" },
    { left: "Peu rare", right: "Très rare" },
    { left: "Peu précis", right: "Chirurgical" },
    { left: "Peu cher", right: "Hors de prix" },
    { left: "Peu recherché", right: "Très recherché" },
    { left: "Pas tendance", right: "Très tendance" },
    { left: "Pas jaloux", right: "Ultra jaloux" },
    { left: "Peu spicy", right: "Dragon spicy" },
    { left: "Peu flexible", right: "Très flexible" },
    { left: "Loin", right: "Très proche" },
    { left: "Peu gourmand", right: "Très gourmand" },
    { left: "Peu câlin", right: "Très câlin" },
    { left: "Petit impact", right: "Gros impact" },
    { left: "Peu magique", right: "Très magique" },
    { left: "Bas volume", right: "Très fort" },
    { left: "Désert", right: "Jungle" },
    { left: "Mouillé", right: "Sec" },
    { left: "Peu réaliste", right: "Très réaliste" },
    { left: "Peu exotique", right: "Très exotique" },
    { left: "Peu parfumé", right: "Très parfumé" },
    { left: "Peu dramatique", right: "Ultra dramatique" },
    { left: "Sobre", right: "Trash" },
    { left: "Peu dangereux", right: "Mortel" },
    { left: "Peu aventureux", right: "Très aventureux" },
    { left: "Bas QI", right: "Haut QI" },
    { left: "Peu lumineux", right: "Très lumineux" },
    { left: "Peu visible", right: "Flashy" },
    { left: "Court terme", right: "Long terme" },
    { left: "Peu profond", right: "Très profond" },
    { left: "Petit bruit", right: "Éruption volcanique" },
    { left: "Peu fiable", right: "Ultra fiable" },
    { left: "Peu sociable", right: "Très sociable" },
    { left: "Pas sportif", right: "Très sportif" },
    { left: "Peu stratégique", right: "Ultra stratégique" },
    { left: "Dégueu", right: "Délicieux" },
    { left: "Peu drôle", right: "Hilarant" },
    { left: "Boring", right: "Épique" },
    { left: "Peu technologique", right: "Très technologique" },
    { left: "Bas niveau", right: "Haut niveau" },
    { left: "Petit volume", right: "Subwoofer mode" },
    { left: "Peu toxique", right: "Très toxique" },
    { left: "Peu sexy", right: "Très sexy" },
    { left: "Peu ambitieux", right: "Très ambitieux" },
    { left: "Pas épique", right: "Totalement épique" },
    { left: "Petit confort", right: "Confort ultime" },
    { left: "Peu intense", right: "Ultra intense" },
    { left: "Peu mystérieux", right: "Énigmatique" },
    { left: "Bas budget", right: "Carte black" },
    { left: "Peu dangereux", right: "Haute tension" },
    { left: "Sans style", right: "Over stylé" },
    { left: "Peu curieux", right: "Très curieux" },
    { left: "Petit frisson", right: "Grosse adrénaline" },
    { left: "Peu spicy", right: "Boucherie mexicaine" },
    { left: "Peu attachant", right: "Très attachant" },
    { left: "Léger", right: "Tank" },
    { left: "Peu mignon", right: "Ultra cute" },
    { left: "Peu rare", right: "Légendaire" },
    { left: "Petit ego", right: "Égo démesuré" },
    { left: "Peu philosophique", right: "Très philosophique" },
    { left: "Simple", right: "Esprit 4D" },
    { left: "Petit chaos", right: "Apocalypse" },
    { left: "Peu social", right: "Très social" },
    { left: "Peu mature", right: "Très mature" },
    { left: "Zéro vibe", right: "Max vibe" },
    { left: "Peu beau", right: "Très beau" },
    { left: "Petit mystère", right: "Enigme totale" },
    { left: "Peu nerveux", right: "Ultra nerveux" },
    { left: "Peu motivant", right: "Ultra motivant" },
    { left: "Peu sucré", right: "Candyland" },
    { left: "Bas IQ chocolat", right: "100% cacao" },
    { left: "Petit fun", right: "Full fun" },
    { left: "Peu impactant", right: "Révolutionnaire" },
    { left: "Peu magique", right: "Sorcellerie" },
    { left: "Léger", right: "Atomique" },
    { left: "Calme", right: "Chaotique" },
    { left: "Peu random", right: "Très random" },
    { left: "Peu épique", right: "Mythique" },
    { left: "Petit délire", right: "Grosse dinguerie" },
    { left: "Peu crédible", right: "Très crédible" },
    { left: "Peu connu", right: "Iconique" },
    { left: "Peu dangereux", right: "On risque sa vie" },
    { left: "Pas stylé", right: "Ultra stylé" },
    { left: "Sans émotion", right: "Hyper émotif" },
    { left: "Peu inspirant", right: "Très inspirant" },
    { left: "Petit talent", right: "Très talentueux" },
    { left: "Peu classe", right: "Ultra classe" },
    { left: "Petit pouvoir", right: "Pouvoir cosmique" },
    { left: "Léger humour", right: "Fou rire" },
    { left: "Peu créatif", right: "Génie créatif" },
    { left: "Peu vintage", right: "Ultra vintage" },
    { left: "Peu bruyant", right: "Concert métal" },
    { left: "Peu sucré", right: "Ultra sucré" },
    { left: "Peu salé", right: "Mer Morte" },
    { left: "Peu piquant", right: "Feu de l’enfer" },
    { left: "Peu fragile", right: "Incassable" },
    { left: "Peu romantique", right: "Hollywood" },
    { left: "Petit drama", right: "Télénovela" },
    { left: "Peur faible", right: "Panique totale" },
    { left: "Peu lumineux", right: "Soleil" },
    { left: "Faible", right: "Surpuissant" },
    { left: "Petit flow", right: "Flow légendaire" },
    { left: "Peu parfumé", right: "Nuage de parfum" },
    { left: "Peu énergique", right: "Tornade" },
    { left: "Zéro swag", right: "Top swag" },
    { left: "Léger humour", right: "One-man show" },
    { left: "Peu marrant", right: "Mort de rire" },
    { left: "Peu social", right: "Influenceur" },
    { left: "Petit budget", right: "Limousine" },
    { left: "Peu sale", right: "Très sale" },
    { left: "Peu clean", right: "Chirurgical" },
    { left: "Peu alcoolisé", right: "Très alcoolisé" },
    { left: "Petit volume", right: "Explosion nucléaire" },
    { left: "Peu organisé", right: "Maître Feng Shui" },
    { left: "Petit appétit", right: "Ogre" },
    { left: "Peu connecté", right: "Cyborg" },
    { left: "Bas niveau", right: "Overlevel" },
    { left: "Peu dangereux", right: "Extrême" },
    { left: "Peu épicé", right: "Volcano mode" },
    { left: "Petit fun", right: "Full carnaval" },
    { left: "Peu stylé", right: "Haute couture" },
    { left: "Peu rare", right: "Collector" },
    { left: "Sans humour", right: "Humoriste pro" },
    { left: "Peu compact", right: "XXL" },
    { left: "Peu solide", right: "Indestructible" },
    { left: "Peu ambitieux", right: "Visionnaire" },
    { left: "Petit confort", right: "Boutique hotel" },
    { left: "Pas intense", right: "Brutal" },
    { left: "Peu précis", right: "Sniper" },
    { left: "Petit ego", right: "Kanye West" },
    { left: "Peu fragile", right: "Vitres blindées" },
    { left: "Peu fun", right: "Fiesta totale" },
    { left: "Pas magique", right: "Wizard mode" },
    { left: "Petit bonheur", right: "Bonheur ultime" }
];
// ... imports
import { createOnlineRoom, joinOnlineRoom, subscribeToRoom, updateRoomState } from '../services/firebase';

const useGameStore = create((set, get) => ({
    // ... initial state ...
    gameState: 'HOME',
    gamePhase: 'THINKING',
    gameMode: 'ONLINE',
    isHost: false,
    roomCode: null,
    nickname: '',
    players: [],
    theme: THEMES[0],
    targetValue: 50,
    clue: '',
    sliderValue: 50,
    skipsRemaining: 2,

    setNickname: (name) => set({ nickname: name }),

    createRoom: async () => {
        const state = get();
        // DEBUG: Proof of life
        console.log("createRoom called via UI");
        import('../services/firebase').then(m => console.log("DB Instance:", m.db));

        const code = Math.random().toString(36).substring(2, 6).toUpperCase();
        const initialPlayers = [{ name: state.nickname || 'Hôte', id: Date.now() }];

        const initialRoomState = {
            gameState: 'LOBBY',
            gamePhase: 'THINKING',
            players: initialPlayers,
            theme: THEMES[Math.floor(Math.random() * THEMES.length)],
            targetValue: Math.random() * 100,
            clue: '',
            sliderValue: 50,
            skipsRemaining: 2
        };

        // Create in Firebase with a timeout race
        // If Firebase takes > 2s, we assume it failed or is slow and proceed anyway showing the lobby
        const timeoutPromise = new Promise((resolve) => setTimeout(() => resolve('TIMEOUT'), 3000));
        const creationPromise = createOnlineRoom(code, initialRoomState);

        const result = await Promise.race([creationPromise, timeoutPromise]);

        if (result === 'TIMEOUT') {
            console.warn("Firebase creation timed out (>3s). Proceeding locally.");
        } else if (!result) {
            // Explicit failure (false returned)
            console.error("Failed to create room in Firebase. Check logs.");
            const { isFirebaseInitialized } = await import('../services/firebase');
            if (isFirebaseInitialized) {
                alert("Erreur de création ! Vérifiez vos règles Firestore.");
                console.error("Creation failed despite initialization. Check Rules.");
            }
        } else {
            console.log("Room created successfully (Confirmed via Promise).");
        }

        set({
            gameState: 'LOBBY',
            gameMode: 'ONLINE',
            isHost: true,
            roomCode: code,
            players: initialPlayers,
            // Subscribe to updates immediately
        });

        // Setup subscription
        get().subscribeToRoom(code);
    },

    joinRoom: async (code) => {
        const state = get();
        const player = { name: state.nickname || 'Invité', id: Date.now() };

        try {
            await joinOnlineRoom(code, player);
            set({
                gameState: 'LOBBY',
                gameMode: 'ONLINE',
                isHost: false,
                roomCode: code
            });
            get().subscribeToRoom(code);
        } catch (e) {
            alert("Room introuvable !");
        }
    },

    subscribeToRoom: (code) => {
        const unsubscribe = subscribeToRoom(code, (data) => {
            // sync local state with remote data
            set({
                gameState: data.gameState,
                gamePhase: data.gamePhase,
                players: data.players,
                theme: data.theme,
                targetValue: data.targetValue,
                clue: data.clue,
                // Only sync sliderValue if we are in reveal phase or if needed?
                // Real-time slider sync might be heavy. Let's sync it on critical events or throttle it.
                // For now, let's sync it to allow watching the guesser.
                sliderValue: data.sliderValue,
                skipsRemaining: data.skipsRemaining
            });
        });
        // We could store the unsubscribe function if we needed to cleanup
    },

    startGame: () => {
        const state = get();
        const updates = {
            gameState: 'PLAYING',
            gamePhase: 'THINKING',
            theme: THEMES[Math.floor(Math.random() * THEMES.length)],
            targetValue: Math.random() * 100,
            skipsRemaining: 2
        };

        if (state.gameMode === 'ONLINE') {
            updateRoomState(state.roomCode, updates);
        } else {
            set(updates);
        }
    },

    startOfflineGame: () => set({
        gameState: 'PLAYING',
        gameMode: 'OFFLINE',
        gamePhase: 'THINKING',
        theme: THEMES[Math.floor(Math.random() * THEMES.length)],
        targetValue: Math.random() * 100,
        players: [{ name: 'Joueurs', id: 1 }],
        skipsRemaining: 2
    }),

    submitClue: (clue) => {
        const state = get();
        if (state.gameMode === 'ONLINE') {
            updateRoomState(state.roomCode, { clue, gamePhase: 'GUESSING' });
        } else {
            set({ clue, gamePhase: 'GUESSING' });
        }
    },

    submitGuess: () => {
        const state = get();
        if (state.gameMode === 'ONLINE') {
            updateRoomState(state.roomCode, { gamePhase: 'REVEAL' });
        } else {
            set({ gamePhase: 'REVEAL' });
        }
    },

    nextRound: () => {
        const state = get();
        const updates = {
            gamePhase: 'THINKING',
            clue: '',
            targetValue: Math.random() * 100,
            sliderValue: 50,
            theme: THEMES[Math.floor(Math.random() * THEMES.length)],
            skipsRemaining: 2
        };

        if (state.gameMode === 'ONLINE') {
            updateRoomState(state.roomCode, updates);
        } else {
            set(updates);
        }
    },

    skipTheme: () => {
        const state = get();
        if (state.skipsRemaining > 0) {
            const updates = {
                theme: THEMES[Math.floor(Math.random() * THEMES.length)],
                skipsRemaining: state.skipsRemaining - 1
            };
            if (state.gameMode === 'ONLINE') {
                updateRoomState(state.roomCode, updates);
            } else {
                set(updates);
            }
        }
    },

    setSliderValue: (val) => {
        set({ sliderValue: val });
        // Optional: Throttle broadcast of slider value to others?
        // For simplicity, we won't broadcast every micro-movement to avoid write limits,
        // but typically you'd want to.
        // Let's rely on local update and only submitGuess finalizes it?
        // Actually, users like to see the slider move? 
        // Let's skip live syncing slider for now to save quota/complexity, 
        // OR add a throttled update if asked.
        // User didn't explicitly ask for live slider syncing, just "Online Mode".
        // The most important is phases and clues.
        // But for "submitGuess", we need the value. 
        // We should probably update the remote sliderValue when submitting.
    },

    // Explicit sync for slider on release/end of drag could be added to Slider component
    syncSlider: (val) => {
        const state = get();
        if (state.gameMode === 'ONLINE') {
            updateRoomState(state.roomCode, { sliderValue: val });
        }
    }
}));

export default useGameStore;
