# Configurer le Mode En Ligne (Firebase)

Pour que le mode multijoueur fonctionne entre différents appareils (téléphone, ordinateur, amis à distance), le jeu doit être relié à une base de données centralisée. Nous utilisons **Google Firebase** (gratuit).

## Étape 1 : Créer un projet Firebase
1. Rendez-vous sur [console.firebase.google.com](https://console.firebase.google.com/).
2. Connectez-vous avec un compte Google.
3. Cliquez sur **"Créer un projet"** (ou "Ajouter un projet").
4. Nommez-le "The Zone" (ou autre) et continuez (désactivez Google Analytics si vous voulez faire simple).

## Étape 2 : Activer la base de données
1. Dans le menu de gauche, allez dans **Build** > **Firestore Database**.
2. Cliquez sur **"Créer une base de données"**.
3. Choisissez l'emplacement **eur3 (Europe-West)** (ou un autre proche de vous).
4. **IMPORTANT** : Choisissez **"Démarrer en mode test"** (Start in test mode). Cela permet à tout le monde d'écrire sans authentification complexe pour l'instant. (Valable 30 jours, suffisant pour tester).

## Étape 3 : Récupérer les clés API
1. Cliquez sur la **roue dentée** (Paramètres) en haut à gauche > **Paramètres du projet**.
2. Descendez tout en bas à "Vos applications".
3. Cliquez sur l'icône **Web** (`</>`).
4. Donnez un surnom à l'app (ex: "The Zone Web") et cliquez sur "Enregistrer".
5. Vous verrez un bloc de code `const firebaseConfig = { ... }`. Copiez ces valeurs.

## Étape 4 : Ajouter les clés au projet
Créez un fichier `.env.local` à la racine du projet (au même niveau que `package.json`) et remplissez-le comme suit avec vos valeurs :

```env
VITE_FIREBASE_API_KEY=vos_caracteres_bizarres_ici
VITE_FIREBASE_AUTH_DOMAIN=the-zone-123.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=the-zone-123
VITE_FIREBASE_STORAGE_BUCKET=the-zone-123.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

Recommitez et redéployez sur Vercel (n'oubliez pas d'ajouter ces mêmes variables d'environnement dans les réglages de votre projet Vercel : **Settings > Environment Variables**).

Une fois cela fait, le mode en ligne fonctionnera réellement !
