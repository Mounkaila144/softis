# Configuration de Firebase pour l'administrateur de traductions

Ce dossier contient les scripts nécessaires pour configurer Firebase afin de permettre le bon fonctionnement de l'interface d'administration des traductions.

## Configuration initiale

Avant d'exécuter les migrations, assurez-vous d'avoir:

1. Créé un projet Firebase sur [console.firebase.google.com](https://console.firebase.google.com)
2. Installé Firebase CLI: `npm install -g firebase-tools`
3. Connecté Firebase CLI à votre compte: `firebase login`
4. Initialisé Firebase dans votre projet: `firebase init` (sélectionnez Firestore et Storage)

## Fichier de clé de service

Vous devez générer une clé de service Firebase Admin:

1. Accédez à la [Console Firebase](https://console.firebase.google.com)
2. Sélectionnez votre projet
3. Allez dans **Paramètres du projet** > **Comptes de service**
4. Cliquez sur **Générer une nouvelle clé privée**
5. Enregistrez le fichier JSON téléchargé sous `src/config/serviceAccount.json`

## Exécution de la migration

Une fois les prérequis installés:

```bash
# Installez les dépendances nécessaires
npm install firebase-admin

# Exécutez le script de migration
node src/migrations/setupFirebase.js
```

## Configuration des règles de sécurité

Après l'exécution du script de migration, assurez-vous de configurer les règles de sécurité pour Firestore et Storage:

### Firestore Rules (`firestore.rules`)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permettre l'accès aux utilisateurs authentifiés seulement
    match /translations/{document=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    match /users/{userId} {
      allow read: if request.auth != null && (request.auth.uid == userId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

### Storage Rules (`storage.rules`)

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /translations/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

Après avoir modifié ces fichiers, déployez-les avec:

```bash
firebase deploy --only firestore:rules,storage:rules
```

## Solution temporaire

En attendant la configuration complète de Firebase, l'application utilise le stockage local (localStorage) pour sauvegarder temporairement les modifications de traduction. Les traductions modifiées sont affichées dans la console du navigateur pour permettre une copie manuelle dans les fichiers de traduction. 