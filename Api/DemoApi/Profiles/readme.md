# ?? Understanding the Role of `Profiles/` in This API Architecture

## ?? What is a Profile?

In this API project, the `Profiles/` directory contains **AutoMapper profiles**, which define how objects are mapped from one type to another—typically between **domain models (entities)** and **DTOs (Data Transfer Objects)**.

AutoMapper is a library that automates object-to-object mapping, helping you avoid repetitive and error-prone boilerplate code.

---

## ?? Why Profiles Matter in a Layered Architecture

### ?? Separation of Concerns

Profiles enforce a clean separation between:

* **Entities** used in the `Data/` and `Repositories/` layers
* **DTOs** used in the `Controllers/` layer for API inputs and outputs

This prevents exposing database structures directly to API consumers and decouples internal logic from external contracts.

---

### ?? Key Benefits of Using AutoMapper Profiles

| Benefit                         | Description                                                                              |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| ? Simplified Code               | Reduces repetitive code for manually copying property values between objects.            |
| ?? Clean Controllers & Services | Keeps your business and controller logic focused on logic—not data transformation.       |
| ?? Data Protection              | Prevents over-posting attacks by explicitly defining what gets mapped.                   |
| ?? Testability                  | Profiles can be unit tested to ensure correct mapping configurations.                    |
| ?? Consistency                  | Centralizes transformation logic in one place, ensuring uniform behavior across the app. |

---

## ?? Example: `TicketProfile.cs`

```csharp
public class TicketProfile : Profile
{
    public TicketProfile()
    {
        CreateMap<Ticket, TicketDto>();
        CreateMap<CreateTicketDto, Ticket>();
    }
}
```

### What It Does:

* Maps the `Ticket` entity to a `TicketDto` for output.
* Maps the `CreateTicketDto` (incoming request) to a `Ticket` entity for saving.

---

## ?? Using the Profile in the App

### Registering AutoMapper in `Program.cs` or `Startup.cs`

```csharp
services.AddAutoMapper(typeof(TicketProfile).Assembly);
```

This scans and registers all profiles in the assembly for DI usage.

### Example Usage in a Service:

```csharp
public class TicketService : ITicketService
{
    private readonly IMapper _mapper;

    public TicketService(IMapper mapper)
    {
        _mapper = mapper;
    }

    public async Task<TicketDto> GetTicketAsync(int id)
    {
        var ticket = await _ticketRepository.GetByIdAsync(id);
        return _mapper.Map<TicketDto>(ticket);
    }
}
```

---

## ?? Folder Structure Summary

```
API/
?
??? Controllers/
??? Services/
??? Repositories/
??? Models/
??? Data/
??? Profiles/         <-- Contains AutoMapper configuration
      ??? TicketProfile.cs
```

---

## ?? In Summary

The `Profiles/` folder plays a **critical role** in ensuring that your API is:

* **Clean** – separating model and DTO logic
* **Secure** – exposing only intended data to clients
* **Maintainable** – centralizing mapping logic
* **Testable** – enabling mapping validation with unit tests

By using AutoMapper profiles, your API becomes more maintainable, consistent, and aligned with best practices in .NET Web API development.

---
