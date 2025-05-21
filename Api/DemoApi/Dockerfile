# Utilise l'image SDK .NET 8 officielle
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS dev

# D�finit le r�pertoire de travail
WORKDIR /src

# Copie tout le code source dans le conteneur
COPY . .

# Expose le port utilis� par ton API
EXPOSE 80

# Lance l'application en mode watch avec l'URL expos�e
CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:80"]