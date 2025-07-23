import React from 'react';
import { Row, Col, Card, Rate } from 'antd';

const pastAppointments = [
  { id: 1, service: 'Cleaning', date: '22 July', rated: false },
  { id: 2, service: 'Plumbing', date: '20 July', rated: true },
];

const BookingHistory = () => {
  return (
    <Row gutter={[16, 16]}>
      {pastAppointments.map((past) => (
        <Col sm={24} md={12} lg={8} key={past.id}>
          <Card
            title={past.service}
            extra={<span className="text-gray-400">{past.date}</span>}
          >
            {past.rated ? (
              <div>
                <p>You've rated this service:</p>
                <Rate disabled defaultValue={4} />
              </div>
            ) : (
              <div>
                <p>Rate your experience:</p>
                <Rate />
              </div>
            )}
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default BookingHistory;
