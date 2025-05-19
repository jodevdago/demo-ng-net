
using DemoApi.Models;
using DemoApi.Services;
using DemoApi.DTOs;
using Microsoft.EntityFrameworkCore;

namespace DemoApi.Data
{
	public static class DbInitializer
	{
		public static void SeedUsers(AppDbContext context, PasswordService passwordService)
		{
			if (!context.Users.Any())
			{
				context.Users.AddRange(
				new User
				{
					Id = Guid.NewGuid(),
					Fullname = "Jonathan Rabefialy",
					Email = "jonathan@example.com",
					Level = UserLevel.Level3,
					Password = passwordService.HashPassword("admin123"),
					Role = UserRole.Admin,
					Auth = true
				},
				new User
				{
					Id = Guid.NewGuid(),
					Fullname = "Tommy Lee",
					Email = "tommy@example.com",
					Level = UserLevel.Level2,
					Password = passwordService.HashPassword("user123"),
					Role = UserRole.User,
					Auth = true
				},
				new User
				{
					Id = Guid.NewGuid(),
					Fullname = "John Doe",
					Email = "john@example.com",
					Level = UserLevel.Level1,
					Password = passwordService.HashPassword("user123"),
					Role = UserRole.User,
					Auth = false
				},
				new User
				{
					Id = Guid.NewGuid(),
					Fullname = "Evan Crew",
					Email = "evan@example.com",
					Level = UserLevel.Level2,
					Password = passwordService.HashPassword("user123"),
					Role = UserRole.User,
					Auth = true
				}
			);
				context.SaveChanges();
			}
		}

		public static void SeedTickets(AppDbContext context)
		{
			if (!context.Tickets.Any())
			{
				var jonathan = context.Users.FirstOrDefault(u => u.Email == "jonathan@example.com");
				var tommy = context.Users.FirstOrDefault(u => u.Email == "tommy@example.com");
				var evan = context.Users.FirstOrDefault(u => u.Email == "evan@example.com");
				var john = context.Users.FirstOrDefault(u => u.Email == "john@example.com");

				if (jonathan == null || tommy == null || evan == null)
					return;

				context.Tickets.AddRange(
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Panne serveur principal",
						Desc = "Le serveur de production ne répond plus depuis 8h ce matin.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Erreur 500 sur l'authentification",
						Desc = "Les utilisateurs ne peuvent pas se connecter via le SSO.",
						Priority = 1,
						Status = TicketStatus.INPROGRESS,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Service de paiement instable",
						Desc = "Le paiement échoue aléatoirement pour certains clients.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Pic de latence détecté",
						Desc = "La latence des requêtes dépasse les 3s pendant les heures de pointe.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Base de données en surcharge",
						Desc = "Augmentation anormale du CPU sur PostgreSQL.",
						Priority = 1,
						Status = TicketStatus.INPROGRESS,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Expiration du certificat SSL",
						Desc = "Le certificat SSL du domaine principal expire dans 3 jours.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Faille de sécurité détectée",
						Desc = "Une faille XSS a été détectée sur le module des commentaires.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "API lente",
						Desc = "Les réponses de l’API mettent plus de 5s.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Bug d’affichage sur mobile",
						Desc = "Le tableau de bord ne s’affiche pas correctement sur iOS.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Champ obligatoire non détecté",
						Desc = "Le formulaire permet d’envoyer des données vides sans alerte.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Incohérence des données clients",
						Desc = "Certains clients ont des informations contradictoires entre 2 modules.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Temps de chargement trop long",
						Desc = "La page 'Rapports mensuels' met plus de 10s à se charger.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Email de confirmation non reçu",
						Desc = "Les utilisateurs ne reçoivent pas l’email après l’inscription.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Recherche ne retourne aucun résultat",
						Desc = "Même avec des termes valides, la recherche reste vide.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Lien de téléchargement cassé",
						Desc = "Le lien vers le PDF ne fonctionne plus.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Erreur JavaScript dans la console",
						Desc = "Une erreur apparaît dans la console sur la page d’accueil.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Traductions manquantes",
						Desc = "Des éléments ne sont pas traduits en anglais dans le back-office.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Bogue dans le filtre de recherche",
						Desc = "Filtrer par date ne fonctionne pas correctement.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Page blanche après login",
						Desc = "Une page blanche s'affiche juste après la connexion.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Impossible de changer le mot de passe",
						Desc = "Le formulaire de changement de mot de passe renvoie une erreur 400.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Icône manquante sur le bouton d’envoi",
						Desc = "Le bouton 'Envoyer' est vide dans le formulaire de contact.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Erreur de typographie",
						Desc = "Un mot est mal orthographié sur la page d’accueil.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Lien vers les CGU obsolète",
						Desc = "Le lien redirige vers une ancienne version.",
						Priority = 3,
						Status = TicketStatus.CLOSED,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Photo de profil non centrée",
						Desc = "La photo est décalée à gauche dans la section utilisateur.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Bouton non aligné",
						Desc = "Le bouton 'Valider' déborde sur mobile.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Favicon manquant",
						Desc = "L’icône du site n’apparaît pas dans l’onglet du navigateur.",
						Priority = 3,
						Status = TicketStatus.CLOSED,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Taille de police incohérente",
						Desc = "La taille du texte change d’un paragraphe à l’autre.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Marge trop grande dans les cartes",
						Desc = "Les cartes d’information ont trop d’espace en bas.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					}
				);

				context.SaveChanges();
			}
		}

		public static void Initialize(AppDbContext context, PasswordService passwordService)
		{
			SeedUsers(context, passwordService);
			SeedTickets(context);
		}
	}
}

