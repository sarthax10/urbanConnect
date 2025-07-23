import React from 'react';
import { Row, Col, Card, Button } from 'antd';

const services = [
  { name: 'AC Repair', description: 'Expert cooling solutions' },
  { name: 'Plumbing', description: 'Leak & pipe fixes' },
  { name: 'Cleaning', description: 'Full-home cleaning' },
];

const ServicesPanel = () => {
  return (
    <Row gutter={[16, 16]}>
      {services.map((service, index) => (
        <Col xs={24} sm={12} md={8} key={index}>
          <Card
            title={service.name}
            hoverable
            style={{ minHeight: 150 }}
            actions={[<Button type="link">Book Now</Button>]}
          >
            <div className="text-gray-600">{service.description}</div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ServicesPanel;
