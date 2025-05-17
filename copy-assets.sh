#!/bin/bash

# Script pour copier les images depuis le dossier dist/assets vers dist/src/assets
# Cela permettra de servir les images depuis leur chemin d'origine dans le code source

echo "Création du dossier src/assets dans le répertoire dist..."
mkdir -p /var/www/softis/dist/src/assets

echo "Création de répertoires pour les sous-dossiers..."
mkdir -p /var/www/softis/dist/src/assets/IMG
mkdir -p /var/www/softis/dist/src/assets/logos

echo "Copie des images depuis leur emplacement actuel vers dist/src/assets..."
find /var/www/softis/dist/assets -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.svg" -o -name "*.webp" -o -name "*.gif" \) -exec cp {} /var/www/softis/dist/src/assets/ \;

echo "Copie des images originales depuis src/assets..."
cp -r /var/www/softis/src/assets/* /var/www/softis/dist/src/assets/

echo "Mise à jour des permissions..."
chown -R www-data:www-data /var/www/softis/dist/src
chmod -R 755 /var/www/softis/dist/src

echo "Terminé!" 