
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
						Desc = "Le serveur de production ne r�pond plus depuis 8h ce matin.",
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
						Desc = "Le paiement �choue al�atoirement pour certains clients.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Pic de latence d�tect�",
						Desc = "La latence des requ�tes d�passe les 3s pendant les heures de pointe.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Base de donn�es en surcharge",
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
						Title = "Faille de s�curit� d�tect�e",
						Desc = "Une faille XSS a �t� d�tect�e sur le module des commentaires.",
						Priority = 1,
						Status = TicketStatus.PENDING,
						AssignedId = jonathan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "API lente",
						Desc = "Les r�ponses de l�API mettent plus de 5s.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Bug d�affichage sur mobile",
						Desc = "Le tableau de bord ne s�affiche pas correctement sur iOS.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Champ obligatoire non d�tect�",
						Desc = "Le formulaire permet d�envoyer des donn�es vides sans alerte.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Incoh�rence des donn�es clients",
						Desc = "Certains clients ont des informations contradictoires entre 2 modules.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Temps de chargement trop long",
						Desc = "La page 'Rapports mensuels' met plus de 10s � se charger.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Email de confirmation non re�u",
						Desc = "Les utilisateurs ne re�oivent pas l�email apr�s l�inscription.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Recherche ne retourne aucun r�sultat",
						Desc = "M�me avec des termes valides, la recherche reste vide.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = tommy.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Lien de t�l�chargement cass�",
						Desc = "Le lien vers le PDF ne fonctionne plus.",
						Priority = 2,
						Status = TicketStatus.PENDING,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Erreur JavaScript dans la console",
						Desc = "Une erreur appara�t dans la console sur la page d�accueil.",
						Priority = 2,
						Status = TicketStatus.FINISHED,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Traductions manquantes",
						Desc = "Des �l�ments ne sont pas traduits en anglais dans le back-office.",
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
						Title = "Page blanche apr�s login",
						Desc = "Une page blanche s'affiche juste apr�s la connexion.",
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
						Title = "Ic�ne manquante sur le bouton d�envoi",
						Desc = "Le bouton 'Envoyer' est vide dans le formulaire de contact.",
						Priority = 2,
						Status = TicketStatus.INPROGRESS,
						AssignedId = evan.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Erreur de typographie",
						Desc = "Un mot est mal orthographi� sur la page d�accueil.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Lien vers les CGU obsol�te",
						Desc = "Le lien redirige vers une ancienne version.",
						Priority = 3,
						Status = TicketStatus.CLOSED,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Photo de profil non centr�e",
						Desc = "La photo est d�cal�e � gauche dans la section utilisateur.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Bouton non align�",
						Desc = "Le bouton 'Valider' d�borde sur mobile.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Favicon manquant",
						Desc = "L�ic�ne du site n�appara�t pas dans l�onglet du navigateur.",
						Priority = 3,
						Status = TicketStatus.CLOSED,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Taille de police incoh�rente",
						Desc = "La taille du texte change d�un paragraphe � l�autre.",
						Priority = 3,
						Status = TicketStatus.PENDING,
						AssignedId = john.Id
					},
					new Ticket
					{
						Id = Guid.NewGuid(),
						Title = "Marge trop grande dans les cartes",
						Desc = "Les cartes d�information ont trop d�espace en bas.",
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

