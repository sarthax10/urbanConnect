# 🌆 **UrbanConnect - Home & Lifestyle Service Booking Platform**

![UrbanConnect Banner](https://yourdomain.com/images/banner.png) <!-- Replace with actual image URL -->

---

## 🔍 Overview

**UrbanConnect** is engineered as a scalable, secure, and efficient platform for booking home and lifestyle services. The application emphasizes:

- 🔐 Conflict-free scheduling  
- 🔄 Real-time updates  
- 👥 Role-based access control  
- 📱 Responsive interface  

This ensures a seamless experience for **users**, **professionals**, and **admins**.

---

## 🚀 Application Features

### 🧭 1. Landing & Navigation
- Navbar includes: **Home**, **About Us**, **Contact Us**, **Login**
- Simple top-level navigation for intuitive flow
- Welcoming landing page with branding and a clear call-to-action

---

### 🔑 2. Authentication & Roles
- **Auth Provider**: [Clerk](https://clerk.dev/)
- Protected routes for bookings & dashboard
- First-time users are assigned the `customer` role by default
- Dynamic UI for `admin` controls

![Auth UI](https://yourdomain.com/images/auth.png)

---

### 📊 3. Dashboard Experience
Once logged in, users access a personalized dashboard:

- 🎉 Welcome Banner  
- 🎯 Action Buttons: Book Services, View Orders, Admin Access  
- 🧾 Summary Cards:
  - Upcoming Appointments
  - Completed Bookings
  - Statistics
- 🔐 Admin Panel (only for admins)

---

### 🛠️ 4. Service Booking Workflow

1. **Category Selection** – e.g., appliances, cleaning  
2. **Service Discovery** – show details, duration  
3. **Date & Time Picker** – past dates disabled  
4. **Professional Selection** – show available slots, bio, rating  
5. **Slot Booking Logic** – availability dynamically split by service duration

![Booking Flow](https://yourdomain.com/images/booking-flow.png)

---

### 📅 5. Booking Management

- View past & upcoming bookings
- Leave reviews for completed services
- Cancel or reschedule bookings
- Rescheduling shows available time slots dynamically

---

### ⭐ 6. Reviews & Ratings

- Submit reviews and star ratings
- Stored in `professional_reviews`
- Aggregated into professional profiles
- Top professionals shown on dashboard

---

### ⚙️ 7. Admin Controls

- Admins access exclusive dashboards & features
- Routes and controls are protected and dynamically rendered

---

## 🗄️ Database & Backend Architecture

### 📚 Schema Highlights

| Table | Description |
|-------|-------------|
| `users` | Stores user profile & role |
| `professional_details` | Stores ratings, bios |
| `professional_availability` | Tracks daily available time |
| `bookings` | Holds all service bookings |
| `services` | Service catalog |
| `professional_services` | Mapping of professionals to services |
| `professional_reviews` | Review data per booking |

---

## 🔐 Security & Access Control

- **Protected Routes**: Booking, dashboard, admin
- **Role-based UI**: Rendered based on role
- **Auditability**: Track booking status changes & role updates

---

## 🧠 SQL Queries

### 1️⃣ List Upcoming Bookings for a User
```sql
SELECT b.booking_id, b.user_id, b.professional_id, b.service_id,
       b.scheduled_start, b.scheduled_end, b.status,
       s.name AS service_name, p.name AS professional_name
FROM bookings b
JOIN services s ON b.service_id = s.service_id
JOIN users p ON b.professional_id = p.user_id
WHERE b.user_id = <user_id>
  AND b.scheduled_start > UTC_TIMESTAMP()
  AND b.status IN ('BOOKED', 'RESCHEDULED')
ORDER BY b.scheduled_start ASC;
