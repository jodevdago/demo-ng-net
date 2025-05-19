# .NET Web API Architecture Documentation

This documentation explains the architecture of the .NET Web API project, focusing on key components such as Controllers, Services, Repositories, and the importance of using interfaces for loose coupling.

## 🧱 Project Layers Overview

```
Client (Angular Frontend)
       ↓
[Controller Layer]         <-- Handles HTTP requests
       ↓
[Service Layer]            <-- Contains business logic
       ↓
[Repository Layer]         <-- Handles data access logic
       ↓
      [Data]               <-- EF Core DbContext
       ↓
     [Database]
```

## 🧱 Project Structure

### 📁 `Controllers/`

* Define HTTP endpoints.
* Act as entry points for incoming API requests.
* Handle routing, basic validation, and delegate business logic to the appropriate service layer.

> Example: `TicketController.cs` handles ticket-related endpoints.

---

### 📁 `Services/`

* Contain business logic.
* Act as an intermediary between controllers and repositories.
* Implement rules, validations, and any processing logic before data access.

> Example: `TicketService.cs` manages business operations related to tickets.

---

### 📁 `Repositories/`

* Abstract the data access layer.
* Handle database operations (CRUD and custom queries).
* Prevent direct usage of Entity Framework Core in the service layer.

> Example: `ITicketRepository.cs` (interface) and `TicketRepository.cs` (implementation).

---

### 📁 `Models/` (or `Entities/`)

* Define the core data structures.
* Map to database tables via Entity Framework Core.
* Annotated with EF Core attributes (`[Key]`, `[Required]`, etc.) as needed.

> Example: `Ticket.cs`, `User.cs` represent core entities.

---

### 📁 `Data/`

* Contains the EF Core `DbContext` class (`AppDbContext.cs`).
* Responsible for configuring entity mappings, constraints, and relationships.
* Can include seed data or migration setup files.

---

### 📁 `Profiles/`

* Store AutoMapper profiles.
* Used for converting between Models and DTOs.
* Centralizes object transformation logic for cleaner code.

> Example: `TicketProfile.cs` maps `Ticket` to `TicketDto` and vice versa.

---

## ✅ Benefits of This Architecture

* Clear **separation of concerns** between layers.
* Facilitates **unit testing** (each layer can be mocked or stubbed).
* Modular and easy to extend as the application grows.
* Aligns with best practices in modern .NET development (simplified Clean Architecture).

---

## 🔧 Why Use Interfaces and Loose Coupling?

### 🧩 Loose Coupling

Using interfaces decouples components, making the system more modular and easier to test.

✅ **Advantages:**
- Easier unit testing with mocking frameworks
- Supports Dependency Injection
- Swappable implementations without changing dependent code
- Aligns with the Dependency Inversion Principle (DIP)

**Example – Recommended (Loose Coupling):**

## 📦 1. Controllers

Controllers are responsible for handling incoming HTTP requests and returning responses. They act as intermediaries between the client and the service layer.

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userService.GetAllUsersAsync();
        return Ok(users);
    }
}
```

## ⚙️ 2. Services

Services contain the business logic of the application. They orchestrate the operations and call the necessary repositories to fetch or manipulate data.

```csharp
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        return await _userRepository.GetAllAsync();
    }
}
```

## 🗃️ 3. Repositories

Repositories are responsible for interacting with the database. They contain data access logic and isolate the data layer from the business logic.

```csharp
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }
}
```

### 🔗 Tight Coupling Example (What Not to Do):

```csharp
public class UsersController : ControllerBase
{
    private readonly UserService _userService = new UserService(); // Bad: tightly coupled
}
```

### ❌ Problems With Tight Coupling:

* Cannot easily mock `UserService` in unit tests
* Cannot replace `UserService` with another implementation
* Violates the Dependency Inversion Principle (DIP)

### ✅ Loose Coupling Example (Recommended):

```csharp
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }
}
```

This allows easy mocking, testing, and flexibility.

## 🧭 Summary

* Controllers handle HTTP logic
* Services contain business logic
* Repositories manage database interactions
* Interfaces allow for flexibility, maintainability, and testability

This architecture ensures the application is clean, modular, and follows best practices such as SOLID principles.

---
