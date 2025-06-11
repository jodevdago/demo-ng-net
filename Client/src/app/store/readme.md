# 🧠 Why Use Signal Store for Tickets Management

## 🚀 Context

In this application, we chose to manage ticket data using **Signal Store** (`@ngrx/signals`) to take advantage of Angular's reactive reactivity model introduced with **Signals**. Our goal was to ensure that **ticket lists stay up to date immediately** after any action (create, update, delete), with a clear and declarative pattern.

---

## ✅ Why This Approach?

### 1. **Reactivity First**: Automatically Reflect State Changes

With Signals, any component or service that subscribes to the ticket store automatically reacts to changes. When we `patchState` after CRUD actions, **the UI is updated immediately** without needing manual event emitters, Subjects, or RxJS boilerplate.

```ts
patchState(store, { tickets });
```

This single line ensures that every consumer of `tickets()` gets the new state.

---

### 2. **Encapsulated Logic with `withMethods`**

We centralize all ticket-related logic in one place:

- `loadTicketsByUserIds()`
- `createTicket()`
- `updateTicket()`
- `deleteTicket()`

The logic is clean, testable, and makes the store **the source of truth**.

---

### 3. **Minimal Boilerplate, Maximum Clarity**

Unlike NgRx Store (with actions, reducers, effects), Signal Store:

- Eliminates the need for actions and reducers
- Is much easier to set up
- Offers a simpler mental model with direct state access

---

## 🔄 What We Wanted

- After any action (e.g. creating a ticket), the **list of tickets should update automatically**.
- No manual refresh needed.
- Clear feedback to the user with snack bars (`MatSnackBar`).
- Clean, minimal, and scalable code.

This is exactly what Signal Store + `reload()` achieves.

```ts
createTicket(ticketData: TicketDto) {
    ticketsService.createTicket(ticketData).subscribe(() => {
        this.reload();
        snackBar.open('Ticket created successfully', 'Close', { duration: 3000 });
    });
}
```

---

## 🔁 Alternatives (and Why Not)

### 1. **Traditional NgRx Store (with actions/effects/reducers)**

- ✅ Good for large applications
- ❌ Too verbose for simple CRUD flows
- ❌ Needs a lot of boilerplate and indirection

### 2. **Services + BehaviorSubject**

- ✅ Reactive
- ❌ Re-implement state management manually
- ❌ Harder to compose, track and test state

### 3. **Component State Only (e.g. inside component)**

- ✅ OK for local, isolated data
- ❌ Not scalable
- ❌ Duplicated logic across components

---

## 🧭 Conclusion

Using **Signal Store** allows us to:

- Keep the app reactive and responsive
- Centralize all state-related logic
- Avoid unnecessary boilerplate
- Ensure that **ticket data is always in sync** after any action

This is the modern Angular way of building clean and reactive state management, especially when the application requires instant updates and feedback after user actions.
