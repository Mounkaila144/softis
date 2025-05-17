#!/bin/bash

# Script à exécuter immédiatement sur le serveur pour résoudre le problème des images

# 1. Créer les répertoires nécessaires
echo "Création des répertoires..."
mkdir -p /var/www/softis/dist/src/assets
mkdir -p /var/www/softis/dist/src/assets/IMG

# 2. Copier les images d'origine
echo "Copie des images depuis src/assets vers dist/src/assets..."
if [ -d "/var/www/softis/src/assets" ]; then
  cp -r /var/www/softis/src/assets/* /var/www/softis/dist/src/assets/
  echo "Copie des images originales réussie."
else
  echo "Le répertoire source n'existe pas. Création des liens manuellement..."
fi

# 3. Copie directe des fichiers spécifiques
echo "Copie directe des images spécifiques..."
cp /var/www/softis/dist/assets/*.png /var/www/softis/dist/src/assets/ 2>/dev/null || echo "Aucun fichier PNG trouvé."
cp /var/www/softis/dist/assets/*.jpg /var/www/softis/dist/src/assets/ 2>/dev/null || echo "Aucun fichier JPG trouvé."
cp /var/www/softis/dist/assets/*.jpeg /var/www/softis/dist/src/assets/ 2>/dev/null || echo "Aucun fichier JPEG trouvé."
cp /var/www/softis/dist/assets/*.svg /var/www/softis/dist/src/assets/ 2>/dev/null || echo "Aucun fichier SVG trouvé."
cp /var/www/softis/dist/assets/*.webp /var/www/softis/dist/src/assets/ 2>/dev/null || echo "Aucun fichier WEBP trouvé."

# 4. Copie directe des images depuis les sous-dossiers IMG
echo "Copie des images depuis le sous-dossier IMG..."
if [ -d "/var/www/softis/src/assets/IMG" ]; then
  cp -r /var/www/softis/src/assets/IMG/* /var/www/softis/dist/src/assets/IMG/
  echo "Copie des images IMG réussie."
else
  echo "Le répertoire source IMG n'existe pas."
fi

# 5. Mise à jour du fichier .htaccess
echo "Mise à jour du fichier .htaccess..."
cat > /var/www/softis/dist/.htaccess << 'EOL'
# Activer le module de réécriture
RewriteEngine On

# Ne pas rediriger les requêtes vers les assets
RewriteRule ^assets/(.*)$ - [L]

# Si le fichier ou le répertoire existe physiquement, servir directement
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# Ajouter une règle spécifique pour les requêtes /src/assets/
RewriteRule ^src/assets/(.*) /assets/$1 [L]

# Rediriger toutes les autres requêtes vers index.html
RewriteRule ^ index.html [L]

# Ajouter les en-têtes de cache appropriés pour les assets statiques
<FilesMatch "\.(js|css|jpg|jpeg|png|gif|webp|svg|ico)$">
  Header set Cache-Control "max-age=31536000, public"
</FilesMatch>

# Désactiver le cache pour les fichiers HTML
<FilesMatch "\.html$">
  Header set Cache-Control "no-cache, no-store, must-revalidate"
  Header set Pragma "no-cache"
  Header set Expires 0
</FilesMatch>
EOL

# 6. Mise à jour des permissions
echo "Mise à jour des permissions..."
chown -R www-data:www-data /var/www/softis/dist
chmod -R 755 /var/www/softis/dist

# 7. Redémarrer Apache
echo "Redémarrage d'Apache..."
systemctl restart apache2

echo "Correction terminée. Veuillez vérifier si les images s'affichent correctement." 