import { create } from 'zustand';

const THEMES = [
    { left: "Pas drôle", right: "Hilarant" },
    { left: "Moche", right: "Magnifique" },
    { left: "Inutile", right: "Indispensable" },
    { left: "Éphémère", right: "Éternel" },
    { left: "Pas cher", right: "Hors de prix" },
    { left: "Dégoûtant", right: "Délicieux" },
    { left: "Ennuyeux", right: "Passionnant" },
    { left: "Lâche", right: "Courageux" },
    { left: "Fragile", right: "Indestructible" },
    { left: "Doux", right: "Rugueux" },
    { left: "Silencieux", right: "Assourdissant" },
    { left: "Lent", right: "Rapide" },
    { left: "Froid", right: "Brûlant" },
    { left: "Triste", right: "Joyeux" },
    { left: "Légal", right: "Illégal" },
    { left: "Non-comestible", right: "Comestible" },
    { left: "Calme", right: "Chaotique" },
    { left: "Sec", right: "Mouillé" },
    { left: "Sale", right: "Propre" },
    { left: "Inconfortable", right: "Confortable" },
    { left: "Stupide", right: "Génial" },
    { left: "Rare", right: "Commun" },
    { left: "Mou", right: "Dur" },
    { left: "Sombre", right: "Lumineux" },
    { left: "Démodé", right: "Tendance" },
    { left: "Faible", right: "Puissant" },
    { left: "Inoffensif", right: "Mortel" },
    { left: "Facile", right: "Impossible" },
    { left: "Mauvais acteur", right: "Acteur oscarisable" },
    { left: "Film navet", right: "Chef-d'œuvre" },
    { left: "Plat sans saveur", right: "Explosion culinaire" },
    { left: "Boisson saine", right: "Poison sucré" },
    { left: "Animal mignon", right: "Animal terrifiant" },
    { left: "Super-pouvoir nul", right: "Super-pouvoir ultime" },
    { left: "Hobby de vieux", right: "Hobby de jeune" },
    { left: "Cadeau pourri", right: "Cadeau de rêve" },
    { left: "Pire endroit pour un 1er date", right: "Meilleur endroit pour un 1er date" },
    { left: "Personne malhonnête", right: "Personne de confiance" },
    { left: "Job d'enfer", right: "Job de rêve" },
    { left: "Vêtement pyjama", right: "Tenue de gala" },
    { left: "Activité relaxante", right: "Activité stressante" },
    { left: "Sujet de conversation chiant", right: "Sujet captivant" },
    { left: "Personnage secondaire", right: "Héros principal" },
    { left: "Musique d'ascenseur", right: "Tube de l'été" },
    { left: "Ça sent mauvais", right: "Ça sent le paradis" },
    { left: "Mauvaise habitude", right: "Bonne habitude" },
    { left: "Objet du passé", right: "Technologie du futur" },
    { left: "Mensonge évident", right: "Mensonge indétectable" },
    { left: "Insulte", right: "Compliment" },
    { left: "Snack sain", right: "Snack gras" },
    { left: "Émission télé poubelle", right: "Documentaire Arte" },
    { left: "Sport de canapé", right: "Sport extrême" },
    { left: "Célébrité oubliée", right: "Icône mondiale" },
    { left: "Raison de rupture nulle", right: "Raison de rupture valable" },
    { left: "Phobie ridicule", right: "Peur rationnelle" },
    { left: "Prénom démodé", right: "Prénom stylé" },
    { left: "Pizza ananas", right: "Pizza truffe" },
    { left: "Café jus de chaussette", right: "Café barista" },
    { left: "Voiture épave", right: "Voiture de luxe" },
    { left: "Blague de papa", right: "Humour noir" },
    { left: "Voisin bruyant", right: "Voisin idéal" },
    { left: "Voyage en enfer", right: "Voyage de noces" },
    { left: "Compétence inutile", right: "Talent incroyable" },
    { left: "Animal domestique", right: "Animal sauvage" },
    { left: "Endroit bruyant", right: "Endroit paisible" },
    { left: "Dessin d'enfant", right: "Art contemporain" },
    { left: "Logiciel buggé", right: "Logiciel parfait" },
    { left: "Mot de passe faible", right: "Coffre-fort numérique" },
    { left: "Influenceur vide", right: "Leader d'opinion" },
    { left: "Fake news", right: "Vérité scientifique" },
    { left: "Petit-déjeuner triste", right: "Brunch royal" },
    { left: "Dimanche soir déprime", right: "Samedi soir fièvre" },
    { left: "Transport galère", right: "Première classe" },
    { left: "Smartphone 2010", right: "Dernier iPhone" },
    { left: "Coupe de cheveux ratée", right: "Coiffure de star" },
    { left: "Odeur de métro", right: "Odeur de boulangerie" },
    { left: "Guerre", right: "Paix" },
    { left: "Dystopie", right: "Utopie" },
    { left: "Dictature", right: "Démocratie" },
    { left: "Égoïste", right: "Altruiste" },
    { left: "Pollution", right: "Écologie" },
    { left: "Fast-food", right: "Gastronomie" },
    { left: "Vie réelle", right: "Fiction" },
    { left: "Travail manuel", right: "Travail intellectuel" },
    { left: "Introverti", right: "Extroverti" },
    { left: "Minimaliste", right: "Baroque" },
    { left: "Scientifique", right: "Magique" },
    { left: "Objectif", right: "Subjectif" },
    { left: "Théorie", right: "Pratique" },
    { left: "Traditionnel", right: "Avant-garde" },
    { left: "Local", right: "Global" },
    { left: "Manuel", right: "Automatique" },
    { left: "Physique", right: "Numérique" },
    { left: "Naturel", right: "Artificiel" },
    { left: "Rustique", right: "Sophistiqué" },
    { left: "Amateur", right: "Professionnel" },
    { left: "Innocent", right: "Coupable" },
    { left: "Ignorance", right: "Savoir" },
    { left: "Hasard", right: "Destin" },
    { left: "La fin", right: "Le début" }
];
const useGameStore = create((set) => ({
    gameState: 'HOME', // HOME, LOBBY, PLAYING
    gamePhase: 'THINKING', // THINKING, GUESSING, REVEAL
    gameMode: 'ONLINE', // ONLINE, OFFLINE

    isHost: false,
    roomCode: null,
    nickname: '',
    players: [],

    // Game Data
    theme: THEMES[0],
    targetValue: 50, // 0-100
    clue: '',
    sliderValue: 50,
    skipsRemaining: 2,

    // Actions
    setNickname: (name) => set({ nickname: name }),
    createRoom: () => set((state) => ({
        gameState: 'LOBBY',
        gameMode: 'ONLINE',
        isHost: true,
        roomCode: Math.random().toString(36).substring(2, 6).toUpperCase(),
        players: [{ name: state.nickname || 'Host', id: 1 }]
    })),
    joinRoom: (code) => set((state) => ({
        gameState: 'LOBBY',
        gameMode: 'ONLINE',
        isHost: false,
        roomCode: code,
        players: [{ name: 'Host', id: 1 }, { name: state.nickname || 'Guest', id: 2 }]
    })),
    startGame: () => set({
        gameState: 'PLAYING',
        gamePhase: 'THINKING',
        theme: THEMES[Math.floor(Math.random() * THEMES.length)],
        targetValue: Math.random() * 100,
        skipsRemaining: 2
    }),
    startOfflineGame: () => set({
        gameState: 'PLAYING',
        gameMode: 'OFFLINE',
        gamePhase: 'THINKING',
        theme: THEMES[Math.floor(Math.random() * THEMES.length)],
        targetValue: Math.random() * 100,
        players: [{ name: 'Players', id: 1 }],
        skipsRemaining: 2
    }),
    submitClue: (clue) => set({ clue, gamePhase: 'GUESSING' }),
    submitGuess: () => set({ gamePhase: 'REVEAL' }),
    nextRound: () => set({
        gamePhase: 'THINKING',
        clue: '',
        targetValue: Math.random() * 100,
        sliderValue: 50,
        theme: THEMES[Math.floor(Math.random() * THEMES.length)],
        skipsRemaining: 2
    }),
    skipTheme: () => set((state) => {
        if (state.skipsRemaining > 0) {
            return {
                theme: THEMES[Math.floor(Math.random() * THEMES.length)],
                skipsRemaining: state.skipsRemaining - 1
            };
        }
        return state;
    }),
    setSliderValue: (val) => set({ sliderValue: val }),
}));

export default useGameStore;
