# Angular StorageService with SSR Support

## 🧠 Why Create a Custom StorageService?

In a typical Angular application, developers use `localStorage` or `sessionStorage` to persist data such as authentication tokens, theme preferences, or language settings. However, when you enable **Server-Side Rendering (SSR)** using Angular Universal, `localStorage` becomes problematic.

---

## ⚠️ The Problem with SSR and localStorage

When rendering on the server:

* The app runs in a Node.js environment.
* `window`, `document`, and `localStorage` are **not available**.

Attempting to access them directly will throw runtime errors like:

```
ReferenceError: localStorage is not defined
```

To prevent these errors and maintain compatibility between server and browser environments, you must **guard access to browser-only APIs**.

---

## ✅ Solution: `StorageService`

The `StorageService` provides an abstraction layer around `localStorage`. It checks whether the current environment is the browser using Angular’s built-in `isPlatformBrowser()` function.

### How it works:

```ts
@Injectable({ providedIn: 'root' })
export class StorageService {
  private isBrowser: boolean;

  constructor() {
    const platformId = inject(PLATFORM_ID);
    this.isBrowser = isPlatformBrowser(platformId);
  }

  getItem(key: string): string | null {
    return this.isBrowser ? localStorage.getItem(key) : null;
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }
}
```

---

## 🔎 Why This Pattern is Important

### 1. ✅ Safe SSR Compatibility

Prevents your app from crashing when rendered on the server.

### 2. 🔄 Centralized Access

Instead of sprinkling `localStorage` access across the app, this service encapsulates the logic in one place.

### 3. 🧪 Easier Testing

Since the logic is centralized, you can easily mock this service in unit tests.

### 4. 📦 Future Proofing

If you ever want to switch to another storage mechanism (like `sessionStorage`, `IndexedDB`, or a cloud storage adapter), you only need to update this service.

---

## 🧭 Summary

| Feature             | Without `StorageService`        | With `StorageService`                |
| ------------------- | ------------------------------- | ------------------------------------ |
| SSR-Compatible      | ❌ Risk of runtime error         | ✅ Safe with platform checks          |
| Centralized Logic   | ❌ Duplicated in multiple places | ✅ Clean and maintainable abstraction |
| Testing Convenience | ❌ Hard to mock browser API      | ✅ Easy to mock and test              |

Using a `StorageService` is a clean, safe, and scalable way to manage browser storage in Angular apps, especially when using Server-Side Rendering.
