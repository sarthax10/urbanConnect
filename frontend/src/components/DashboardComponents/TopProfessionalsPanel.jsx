// src/components/TopProfessionalsPanel.jsx

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Tag } from 'antd';
import { StarFilled } from '@ant-design/icons';
import { getTopBookedProfessionals } from '../../api/professional';

const { Paragraph, Text } = Typography;

const TopProfessionalsPanel = () => {
  const [topPros, setTopPros] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getTopBookedProfessionals();
        setTopPros(data);
      } catch (err) {
        console.error('Failed to fetch professionals:', err);
      }
    };

    fetch();
  }, []);

  return (
    <Row gutter={[16, 16]} className="w-full">
      {topPros.map((pro) => (
        <Col xs={24} sm={12} md={8} key={pro.userId}>
          <Card
            className="bg-white border border-gray-200 hover:shadow-lg transition-all rounded-xl min-h-[280px] flex flex-col justify-between"
            title={
              <div className="flex justify-between items-center">
                <span className="font-medium text-black">{pro.professionalName}</span>
                <Tag icon={<StarFilled />} color="gold" className="text-xs">
                  {pro.rating}
                </Tag>
              </div>
            }
            hoverable
            bordered={false}
            bodyStyle={{ display: "flex", flexDirection: "column", flex: "1 1 0%", paddingTop: '1rem' }}
          >
            <div className="text-gray-600 text-sm mb-2">
              <strong>Services:</strong>{' '}
              {pro.servicesOffered ? pro.servicesOffered : 'N/A'}
            </div>

            <Paragraph
              className="text-black text-sm leading-relaxed flex-grow"
              ellipsis={{ rows: 3, expandable: false }}
            >
              {pro.profileBio || <em className="text-gray-400">No bio available.</em>}
            </Paragraph>

            <div className="text-right text-xs text-gray-500 mt-3">
              {pro.totalBookings} total bookings
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default TopProfessionalsPanel;
