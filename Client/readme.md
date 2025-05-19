## 🧩 Application Architecture Overview

This project leverages Angular **Standalone Components**, which eliminates the need for traditional Angular modules (`NgModule`). This leads to simpler, more modular and maintainable code.

### ✅ Benefits of Standalone Components:

* No more boilerplate module declarations
* Components can be lazy-loaded or used independently
* Encourages cleaner and feature-based architecture

### 📁 Project Structure

```txt
src/
├── guards/       → Route guards (auth, permissions...)
├── services/     → Shared Angular services (API, logic)
├── types/        → TypeScript interfaces & types
├── pipes/        → Custom Angular pipes
├── views/        → Main feature pages (routed views)
├── layouts/      → Layout components (navbar, sidebar)
```

This folder structure supports scalability, separation of concerns, and easier navigation through your codebase.

---

📌 **Best Practice:** Rename this file to `README.storage.md` if you want to isolate documentation specifically related to `StorageService` in a large project.
