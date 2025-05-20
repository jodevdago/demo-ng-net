# Utilise une image Node Alpine légère
FROM node:22-alpine

# Installe quelques outils utiles
RUN apk add --no-cache bash wget nano

# Définit le répertoire de travail
WORKDIR /app

# Copie les fichiers de dépendances
COPY package*.json ./

# Installe les dépendances
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port Angular
EXPOSE 4200
ENV PORT=4200

# Commande pour démarrer l'application Angular en mode développement
CMD ["npm", "run", "start"]
