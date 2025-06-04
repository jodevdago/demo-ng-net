# Makefile

.PHONY: build up down logs restart

# Build all services
build:
	docker compose build

# Start all services
up:
	docker compose up -d

# Stop all services
down:
	docker compose down

# View logs for all services
logs:
	docker compose logs -f

# Restart all services
restart: down up

# Rebuild and restart (useful during development)
rebuild:
	docker compose down --volumes --remove-orphans
	docker compose build --no-cache
	docker compose up -d

# Run Angular container with hot reload (if you want to run interactively)
ng-serve:
	docker compose exec angular npm start

# Run .NET migrations or dotnet CLI commands (example)
dotnet-cli:
	docker compose exec dotnet dotnet ef database update
