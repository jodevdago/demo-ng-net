# 💪 Angular + .NET Ticket Management Demo App

This is a **demo application** built with **Angular v18** and **.NET 8.8**, designed to showcase core full-stack development skills such as **authentication**, **ticket management**, and **user management**.

⚠️ **Note**: This is not a production-ready application. It is intended **solely for demonstration purposes** and to **measure development capabilities** in both frontend and backend technologies.

---

## 🔐 Features Overview

### ✅ Authentication with JWT

* Secure login using JSON Web Tokens (JWT)
* Stateless authentication with access tokens stored on the client
* Role-based access supported

### 🎫 Ticket Management

* Create, view, update, and delete tickets
* Assign tickets to users
* Filter and sort based on ticket status and priority

### 👥 User Management

* View the list of users
* Assign or reassign tickets
* Limited admin features for demonstration

---

## 🚀 Getting Started

### 💽 Run Angular Locally

1. Go to the Angular project folder:

   ```bash
   cd Client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   ng serve
   ```

4. Visit the app in your browser:

   ```
   http://localhost:4200
   ```

---

### 🧪 Run Angular Unit Tests

* Run all tests:

  ```bash
  npm run test
  ```

* View test coverage:

  ```bash
  npm run test:coverage
  ```

---

### 💽 Run .NET API Locally

1. Go to the backend project folder:

   ```bash
   cd Api/DemoApi
   ```

2. Run the API:

   ```bash
   dotnet run --launch-profile http
   ```

3. The API will be available at:

   ```
   http://localhost:5027
   ```
4. You can use also Swagger at:

   ```
   http://localhost:5027/swagger
   ```

---

## 🐳 Run the Full App with Docker

1. In the root project directory, run:

   ```bash
   docker compose up --build
   ```

2. The Angular frontend and .NET backend will be launched together.

---

### ⚠️ Docker Troubleshooting

> **Current issue**:
> During Docker build, there is a known problem where the `npm install` step may fail due to network or caching issues.
> This is actively being investigated and will be fixed in future updates.

---

## 🔑 Demo Login Credentials

You can log into the app using the following demo account (admin):

* **Email**: `jonathan@example.com`
* **Password**: `admin123`

---

## 📁 Project Structure

```
/Client     --> Angular frontend
/Api     --> .NET Web API backend
/docker-compose.yml         --> Docker configurations
```

---

## 📬 Contact

For questions or improvements, feel free to reach out.
