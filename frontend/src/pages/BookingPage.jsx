// src/pages/BookingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { assets } from '../assets/assets';
import "../style/BookingPage.css"

const { Title } = Typography;

const categories = [
  {
    name: 'Appliances',
    description: 'Installation, repair, and servicing of home appliances.',
    image: assets.AppliancesIMG,
  },
  {
    name: 'Cleaning',
    description: 'Home and office deep cleaning services.',
    image: assets.CleaningIMG,
  },
  {
    name: 'Grooming',
    description: 'At-home beauty and grooming services.',
    image: assets.GroomingIMG,
  },
  {
    name: 'Maintenance',
    description: 'Plumbing, electrical, and repair services.',
    image: assets.MaintenanceIMG,
  },
  {
    name: 'Health & Safety',
    description: 'Pest control, fire safety & wellness checkups.',
    image: assets.HealthIMG,
  },
];

export default function BookingPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/booking/category/${encodeURIComponent(category)}`);
  };

  return (
    <div className="booking-page bg-gray-100 min-h-screen py-16 px-4 md:px-10">
      <Title level={2} className="text-center mb-12 !text-3xl md:!text-4xl font-bold text-gray-800">
        Choose a Service Category
      </Title>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
  key={cat.name}
  onClick={() => handleCategoryClick(cat.name)}
  className="category-card"
>
  {/* IMAGE */}
  <img src={cat.image} alt={cat.name} className="category-image" />
  
  {/* DARK GRADIENT OVERLAY */}
  <div className="category-gradient"></div>
  
  {/* TEXT CONTENT */}
  <div className="category-overlay">
    <h2 className="category-title">{cat.name}</h2>
    <div className="category-divider"></div>
    <p className="category-desc">{cat.description}</p>
  </div>
</div>
        ))}
      </div>
    </div>
  );
}