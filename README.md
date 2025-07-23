
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

### 👨‍🔧 Professionals
- Set availability
- Manage bookings, mark as completed/cancelled
- View customer feedback

### 🛡️ Admin
- View stats and top-rated professionals
- Manage services
- Access platform-wide booking stats



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
├── backend/             # ASP.NET Web API
│   ├── Controllers/
│   └── Models/
├── frontend/            # React + Ant Design + Tailwind
│   ├── components/
│   └── pages/
├── db/                  # SQL dump & schema
│   └── schema.sql
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
