# UrbanConnect

## 1. Overview
UrbanConnect is engineered as a scalable, secure, and efficient platform for booking home and lifestyle services. The application emphasizes technical robustness—through conflict-free scheduling, real-time updates, strong access control, and a responsive interface—to deliver seamless user and administrative experiences.

---

## 2. Application Features

### 2.1 Landing & Navigation
- **Navbar Includes:** Home, About Us, Contact Us, Login  
- **Navigation Logic:** Simple, top-level menu structure for intuitive user journeys.  
- **Landing Experience:** Users are greeted with branding, mission statement, and high-clarity call-to-action.

### 2.2 Authentication & Roles
- **Auth Provider:** Clerk  
- **Login Mechanics:** All dashboard and booking routes are protected; access requires successful authentication.  
- **First-Time User:** New users on first sign-in are assigned a default 'customer' role.  
- **Role-Based Access:** Admin-specific routes and controls appear dynamically for admin users.

### 2.3 Dashboard Experience
Upon login, users access a structured dashboard including:
- **Welcome Banner:** Personalized greeting.  
- **Action Buttons:** For booking services, viewing past orders, and accessing admin dashboard (if applicable).  
- **Summary Cards:**
  - Upcoming Appointments: Next scheduled service.
  - Completed Bookings: History of fulfilled bookings with options to give feedback.
  - Statistics: Count of past and upcoming bookings.
  - Admin Panel: Exclusive button visible to admins for advanced controls.

### 2.4 Service Booking Workflow
1. **Category Selection:** User chooses a service category (e.g., appliances, cleaning, grooming).  
2. **Service Discovery:** Available services within the chosen category are displayed with descriptions and durations.  
3. **Date & Time Picking:** Past dates are disabled to prevent invalid bookings.  
4. **Professional Selection:** Upon service and date selection, the system shows all qualified professionals along with:
   - Available time slots (dynamically generated based on service duration and daily availability from 10:00 to 17:00)
   - Ratings
   - Bio/Description  
5. **Slot Booking Logic:**
   - Time slots are computed by splitting daily availability per service duration.
   - When a slot is booked, the system updates the professional’s availability, splits the record, and prevents overlapping reservations.

### 2.5 Booking Management (View, Cancel, Reschedule)
- **View Past Bookings:** Users access a list with booking ID, service details, date/time, and professional.
- **Leave a Review:** Option to rate and comment post-completion.
- **Upcoming Bookings:** View, cancel, or reschedule.
  - **Cancellation:** Sets appointment status to "CANCELED", excludes from active views.
  - **Rescheduling:** Presents available slots for the assigned professional, using the same slot logic as initial booking.

### 2.6 Reviews & Ratings
- **Submission:** Users rate professionals and leave comments for completed bookings.
- **Storage:** Ratings stored in `professional_reviews`.
- **Aggregation:** Average ratings for each professional are calculated and updated in `professional_details`.
- **Display:** Top professionals ranked by total bookings and ratings; shown on dashboard.

### 2.7 Admin Role & Controls
- **Visibility:** Admin-specific controls and dashboard appear only for users with 'admin' role.
- **Access Control:** Route protection ensures only authorized admins can access management features.

---

## 3. Database & Backend Architecture

### 3.1 Schema Overview
- `users`: User profile, authentication, and role (customer/professional/admin).  
- `professional_details`: Additional info and current rating for professionals.  
- `professional_availability`: Tracks professional daily availability and booked slots.  
- `bookings`: All booking details, including status (BOOKED, COMPLETED, CANCELED, RESCHEDULED).  
- `professional_reviews`: Stores review submissions per booking.  
- `services`: Service catalog.  
- `professional_services`: Professional-to-service mapping.

### 3.2 Stored Procedures

#### GetTopBookedProfessionals
Returns the top three professionals by total bookings, with aggregate service list and ratings.

```sql
CREATE PROCEDURE SP_GetTopBookedProfessionals()
BEGIN
    SELECT u.user_id,
           u.name AS professional_name,
           pd.rating,
           pd.profile_bio,
           GROUP_CONCAT(DISTINCT s.name ORDER BY s.name SEPARATOR ', ') AS services_offered,
           COUNT(b.booking_id) AS total_bookings
    FROM users u
    JOIN bookings b ON u.user_id = b.professional_id
    LEFT JOIN professional_reviews r ON b.booking_id = r.booking_id
    LEFT JOIN professional_details pd ON u.user_id = pd.professional_id
    LEFT JOIN professional_services ps ON u.user_id = ps.professional_id
    LEFT JOIN services s ON ps.service_id = s.service_id
    WHERE u.role = 'professional'
    GROUP BY u.user_id, u.name, pd.rating, pd.profile_bio
    ORDER BY total_bookings DESC
    LIMIT 3;
END;

