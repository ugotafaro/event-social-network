# Utilisation de l'image Node.js officielle
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json (ou yarn.lock) dans le conteneur
COPY package*.json ./

# Installer les dépendances
RUN npm install --force

# Copier tous les fichiers du projet dans le conteneur
COPY . .

# Exposer le port que Vite utilise par défaut
EXPOSE 5173

# Lancer le serveur Vite en mode développement
CMD ["npm", "run", "dev", "--", "--host"]
