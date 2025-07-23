import React from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import UpcomingStatCard from './UpcomingStatCard';
import NextAppointmentCard from './NextAppointmentCard';
import CompletedStatCard from './CompletedStatCard';

const StatsOverview = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={16} className="mb-6">
      {/* Upcoming Booking - clickable */}
      <Col
        xs={24}
        md={8}
        onClick={() => navigate('/bookings/upcoming')}
        className="cursor-pointer hover:scale-[1.015] transition duration-300"
      >
        <UpcomingStatCard />
      </Col>

      {/* Next Appointment - not clickable */}
      <Col xs={24} md={8}>
        <NextAppointmentCard />
      </Col>

      {/* Completed Bookings - clickable */}
      <Col
        xs={24}
        md={8}
        onClick={() => navigate('/my/past-bookings')}
        className="cursor-pointer hover:scale-[1.015] transition duration-300"
      >
        <CompletedStatCard />
      </Col>
    </Row>
  );
};

export default StatsOverview;