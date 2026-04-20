# Guide d'utilisation du système d'internationalisation (i18n)

Ce projet utilise react-i18next pour gérer les traductions en plusieurs langues (français, anglais, japonais).

## Structure des fichiers

- `src/i18n/index.ts` : Configuration principale de i18next
- `src/i18n/locales/` : Contient les fichiers de traduction JSON pour chaque langue
  - `fr.json` : Traductions en français
  - `en.json` : Traductions en anglais
  - `ja.json` : Traductions en japonais
- `src/i18n/useTranslation.tsx` : Hook personnalisé et contexte pour l'utilisation des traductions
- `src/i18n/languageSelector.css` : Styles pour le sélecteur de langue

## Comment utiliser les traductions

### 1. Dans un composant React

```tsx
import { useTranslation } from '../i18n/useTranslation';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.home')}</h1>
      <p>{t('home.welcome')}</p>
    </div>
  );
};
```

### 2. Ajouter le sélecteur de langue

```tsx
import { LanguageSelector } from '../i18n/useTranslation';

const Header = () => {
  return (
    <header>
      <nav>
        {/* ... autres éléments de navigation ... */}
        <LanguageSelector />
      </nav>
    </header>
  );
};
```

### 3. Ajouter de nouvelles traductions

Pour ajouter de nouvelles traductions, modifiez les fichiers JSON dans le dossier `src/i18n/locales/`.

Exemple d'ajout d'une nouvelle section "about" :

```json
{
  "common": {
    // Traductions existantes...
  },
  "about": {
    "title": "À propos",
    "description": "Description de la page À propos"
  }
}
```

Assurez-vous d'ajouter les traductions correspondantes dans tous les fichiers de langue.

### 4. Utilisation avancée: Traductions avec placeholders

Pour des traductions avec des variables:

```tsx
// Dans le fichier JSON
{
  "greeting": "Bonjour, {{name}} !"
}

// Dans le composant
const { t } = useTranslation();
return <p>{t('greeting', { name: 'John' })}</p>;
```

### 5. Changer la langue manuellement

```tsx
const { changeLanguage } = useTranslation();

// Pour changer la langue en français
<button onClick={() => changeLanguage('fr')}>Français</button>
```

## Structure des clés de traduction

Pour maintenir l'organisation du projet, suivez cette structure pour les clés de traduction:

- Utilisez `common.` pour les éléments communs (navigation, boutons standard, etc.)
- Utilisez le nom de la page comme préfixe pour les éléments spécifiques à cette page (ex: `home.welcome`, `contact.title`)
- Utilisez des structures imbriquées pour organiser les traductions de manière logique

## Détection de la langue

Le système est configuré pour détecter automatiquement la langue du navigateur de l'utilisateur. Si la langue n'est pas disponible dans les traductions ou si aucune langue n'est détectée, le japonais (ja) sera utilisé par défaut. 