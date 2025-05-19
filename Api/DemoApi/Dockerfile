FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src

COPY . .

EXPOSE 5027

CMD ["dotnet", "watch", "run", "--urls", "http://0.0.0.0:5027"]


