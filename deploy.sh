#!/bin/bash

# Script de déploiement pour Softis.jp

echo "Début du déploiement..."

# 1. Build du projet
echo "Construction du projet..."
npm run build

# 2. Vérifier si le build a réussi
if [ $? -ne 0 ]; then
  echo "Échec de la construction du projet."
  exit 1
fi

# 3. Synchroniser les fichiers avec le serveur
echo "Synchronisation des fichiers avec le serveur..."
rsync -avz --delete dist/ user@server:/var/www/softis/dist/

# 4. Copier le fichier .htaccess
echo "Copie du fichier .htaccess..."
rsync -avz .htaccess user@server:/var/www/softis/dist/

# 5. Copier le script de copie des assets
echo "Copie du script copy-assets.sh..."
rsync -avz copy-assets.sh user@server:/var/www/softis/

# 6. Exécuter le script de copie des assets sur le serveur
echo "Exécution du script de copie des assets..."
ssh user@server "chmod +x /var/www/softis/copy-assets.sh && sudo /var/www/softis/copy-assets.sh"

# 7. Mise à jour des permissions
echo "Mise à jour des permissions..."
ssh user@server "sudo chmod -R 755 /var/www/softis/dist && sudo chown -R www-data:www-data /var/www/softis/dist"

# 8. Redémarrer Apache
echo "Redémarrage d'Apache..."
ssh user@server "sudo systemctl restart apache2"

echo "Déploiement terminé avec succès!" 