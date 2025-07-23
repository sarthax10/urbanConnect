import { Routes, Route } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  RedirectToSignIn,
  SignedIn,
  SignedOut
} from '@clerk/clerk-react';

import RoleRedirect from './components/RoleRedirect';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import Landing from './pages/Landing';
import BookingPage from './pages/BookingPage';
import RequireAuth from './components/RequireAuth';
import CategoryBooking from './pages/CategoryBooking';
import UserUpcomingBookings from './pages/UserUpcomingBookings';
import UserPastBookings from './pages/UserPastBookings';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';

function App() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Landing />} />
      
      {/* Redirect to /redirect instead of /home */}
      <Route path="/login" element={<SignIn redirectUrl="/redirect" />} />
      <Route path="/signup" element={<SignUp redirectUrl="/redirect" />} />

      <Route
        path="/redirect"
        element={
          <>
            <SignedIn>
              <RoleRedirect />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        }
      />

      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admindashboard" element={<AdminDashboard />} />
      <Route
  path="/my/past-bookings"
  element={
    <RequireAuth>
      <UserPastBookings />
    </RequireAuth>
  }
/>
      <Route
  path="/bookings/upcoming"
  element={
    <RequireAuth>
      <UserUpcomingBookings />
    </RequireAuth>
  }
/>
<Route
  path="/dashboard"
  element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  }
/>
      <Route
          path="/bookingpage"
          element={
            <RequireAuth>
              <BookingPage />
            </RequireAuth>
          }
        />
        <Route
            path="/booking/category/:category"
            element={
              <RequireAuth>
                <CategoryBooking />
              </RequireAuth>
            }
        />
    </Routes>
    </>
  );
}

export default App;
