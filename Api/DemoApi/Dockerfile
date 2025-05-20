# Utilise l'image SDK .NET 8 officielle
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

# Définit le répertoire de travail
WORKDIR /src

# Copie tout le code source dans le conteneur
COPY . .

# Expose le port utilisé par ton API
EXPOSE 5027

# Lance l'application en mode watch avec l'URL exposée
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5027"]
