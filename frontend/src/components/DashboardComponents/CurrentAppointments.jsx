import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// src/components/CurrentAppointments.jsx

import React, { useEffect, useState } from 'react';
import { Card } from 'antd';
import Slider from 'react-slick';
import { useUser } from '@clerk/clerk-react';
import { getUpcomingBookingsForUser } from '../../api/booking';

const CurrentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        if (!user?.primaryEmailAddress?.emailAddress) return;
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/users/email/${encodeURIComponent(
            user.primaryEmailAddress.emailAddress
          )}`
        );
        const userData = await res.json();
        if (!userData?.userId) return;
        const data = await getUpcomingBookingsForUser(userData.userId);
        setAppointments(data);
      } catch (err) {
        console.error('Error loading upcoming appointments:', err);
      }
    };
    loadAppointments();
  }, [user]);

  if (!appointments.length) {
    return <p className="text-gray-500 text-sm">No upcoming appointments.</p>;
  }

  // Carousel settings: 3 visible, arrows enabled, responsive
  const settings = {
    dots: true,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: Math.min(3, appointments.length),
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // tablets
        settings: { slidesToShow: Math.min(2, appointments.length) }
      },
      {
        breakpoint: 768, // mobile
        settings: { slidesToShow: 1 }
      }
    ]
  };

  return (
    <div className="mt-6">
      <Slider {...settings}>
        {appointments.map((appt) => (
          <div className="px-3" key={appt.bookingId}>
            <Card
              title={appt.serviceName}
              className="rounded-lg border border-gray-200 shadow-md min-h-[210px] bg-white"
            >
              <p>
                <strong>When:</strong>{' '}
                {new Date(appt.scheduledStart).toLocaleString('en-IN', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                })}
              </p>
              <p>
                <strong>With:</strong> {appt.professionalName}
              </p>
              <p className="text-xs text-gray-400 mt-2">{appt.status}</p>
            </Card>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CurrentAppointments;
