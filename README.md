# MenuPro - Restaurant & Table Booking Management System

MenuPro is a comprehensive full-stack application designed to streamline restaurant management and table booking processes. It features a modern React frontend and a robust .NET Core backend.

## 🚀 Key Features

- **User Authentication**: Secure Login/Register with JWT (Json Web Token) authentication.
- **Restaurant Management**: Admin functionality to manage restaurant listings and details.
- **Table Booking**: Users can book tables at their favorite restaurants for specific time slots.
- **Menu Management**: Manage food items and menu categories.
- **Payments**: Integrated payment processing for bookings (e.g., Razorpay).
- **History & Reviews**: Track booking history and provide feedback with reviews.
- **Admin Dashboard**: Comprehensive dashboard for system administration.

## 🛠️ Technology Stack

### Backend
- **Framework**: .NET Core 8.0 / 9.0 (ASP.NET Core Web API)
- **Database**: Microsoft SQL Server (LocalDB)
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer Authentication
- **Documentation**: Swagger/OpenAPI

### Frontend
- **Framework**: React 19 (Vite)
- **Routing**: React Router DOM 
- **API Communication**: Axios
- **Styling**: Vanilla CSS (Modern design)

## 📋 Prerequisites

- [.NET SDK](https://dotnet.microsoft.com/download) (Version 8.0 or later)
- [Node.js](https://nodejs.org/) (Version 18 or later)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (LocalDB is used by default)

## 🏗️ Getting Started

### 1. Backend Setup
1. Open `Menu_Pro_Solution/Menu_Pro_Solution.sln` in Visual Studio or VS Code.
2. Update the connection string in `appsettings.json` if necessary.
3. Run Entity Framework migrations to set up the database:
   ```bash
   dotnet ef database update
   ```
4. Start the backend:
   ```bash
   dotnet run
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd MenuProFrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📁 Project Structure

- `Menu_Pro_Solution/`: Contains the .NET backend solution.
  - `MenuPro/`: Main Web API project.
    - `Controllers/`: API endpoints.
    - `Models/`: Database entities.
    - `DTOs/`: Data Transfer Objects.
    - `Data/`: DB Context and configurations.
- `MenuProFrontend/`: Contains the React/Vite frontend.
  - `src/`: React source code.
    - `components/`: Reusable UI components.
    - `services/`: API service layers.
    - `pages/`: Page-level components.

## 📜 License

This project is for educational purposes as part of the IET Final Project.
