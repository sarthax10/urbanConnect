
```markdown
# UrbanConnect

> A full-featured home service booking platform built with **React**, **ASP.NET Core**, and **MySQL**.

UrbanConnect allows users to easily book professionals for various home services like plumbing, AC repair, cleaning, grooming, and much more. It features role-based access for **customers**, **professionals**, and **admins**, enabling seamless service scheduling, booking management, and reviews.



## 🧱 Tech Stack

- **Frontend**: React, Tailwind CSS, Ant Design
- **Backend**: ASP.NET Core Web API
- **Database**: MySQL
- **Auth**: Clerk.dev
- **Deployment**: Vercel (frontend), Render/Azure (backend), PlanetScale/AWS RDS (MySQL)



## 🔧 Features

### 🧑 Customers
- Book services and select available professionals
- View past and upcoming bookings
- Submit reviews after service completion


### 🛡️ Admin
- View stats and top-rated professionals
- Manage services
- Access platform-wide booking stats
- Manage bookings, mark as completed/cancelled



## 📐 Database Structure

A normalized MySQL schema with:

- `users`: stores customers, professionals, admins
- `services`: list of offerings like AC repair, plumbing, etc.
- `bookings`: service transactions with status tracking
- `professional_availability`: time slots for confirmed/unconfirmed availability
- `reviews`: feedback on completed jobs
- `professional_services`: many-to-many between professionals ↔ services

See [`/db/schema.sql`](./db/schema.sql) or [`/dump.sql`](./dump.sql) if available.



## 🗂️ Project Structure


urbanConnect/
├── backend/                         # ASP.NET Core backend API
│   ├── Controllers/                 # API controller classes
│   ├── Data/                       # DbContext, migrations, seed data
│   ├── DTOs/                       # Data Transfer Objects (requests/responses)
│   ├── Interfaces/                 # Repository/service interfaces
│   ├── Models/                     # Entity models matching DB tables
│   ├── Repositories/               # Database access layer implementations
│   ├── Services/                   # Business logic services
│   ├── StoredProcedures/           # SQL Stored Procedure scripts (optional)
│   ├── Program.cs                  # Main application entry
│   └── appsettings.json            # Configuration
│
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── api/                   # API call utilities
│   │   ├── components/            # Reusable UI components
│   │   ├── pages/                 # Application pages/screens
│   │   ├── styles/                # CSS/Tailwind configuration files
│   │   ├── utils/                 # Utility functions/contexts/hooks
│   │   └── main.jsx               # React app entry point
│   ├── public/                    # Static assets
│   ├── package.json               # Frontend package config
│
├── db/                           # Database files
│   ├── schema.sql                # Full DB schema definition
│   ├── seed.sql                  # Initial test/sample data
│   └── stored-procedures.sql     # All SP scripts, if stored separately
│
├── .gitignore
├── README.md



## ✅ Status

Project is in MVP phase with full booking, service, and role-based access:
- [x] Booking system
- [x] Availability management
- [x] Admin insights
- [x] React UI & dashboard
- [x] SQL dump ready for migration


## 🙋 Author

**Shreyansh Sarthak**  
GitHub: [@sarthax10](https://github.com/sarthax10)

---

```
