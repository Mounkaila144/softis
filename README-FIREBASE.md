# Configuration Firebase pour le système de traductions

## Prérequis
1. Node.js et npm installés
2. Firebase CLI installé (`npm install -g firebase-tools`)
3. Un projet Firebase créé

## Configuration réalisée

Nous avons configuré le système d'administration des traductions pour utiliser uniquement Firestore Database, sans nécessiter Firebase Storage. Cette approche est plus simple et évite d'avoir à configurer plusieurs services.

### Structure Firestore
- Collection `translations` avec document `latest` qui contient:
  - `timestamp` - Date de la dernière modification
  - `updatedBy` - Utilisateur ayant fait la modification
  - `numChanges` - Nombre de changements
  - `fr` - JSON des traductions françaises
  - `en` - JSON des traductions anglaises 
  - `ja` - JSON des traductions japonaises
- Collection `translations_history` pour l'historique des modifications

## Comment utiliser le système

1. Accédez à la page d'administration des traductions via `/translations-admin`
2. Connectez-vous avec vos identifiants administrateur
3. Modifiez les traductions via l'interface
4. Cliquez sur Enregistrer pour sauvegarder dans Firestore

## Résolution des problèmes

### Erreur "Missing or insufficient permissions"
Si vous rencontrez cette erreur:
1. Vérifiez que vous êtes bien connecté à Firebase (`firebase login`)
2. Vérifiez que les règles Firestore permettent l'accès
3. Redéployez les règles si nécessaire:
   ```bash
   firebase deploy --only firestore:rules
   ```

## Notes importantes
- En production, vous devriez activer des règles de sécurité plus restrictives
- Les traductions sont sauvegardées dans Firestore au format JSON
- En cas d'échec de Firestore, le système utilise localStorage comme solution de secours 