import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { getAllProfessionals, createProfessional } from '../api/professional';
import ProfessionalList from '../components/ProfessionalList';
import ProfessionalForm from '../components/ProfessionalForm';
import ServiceForm from '../components/ServiceForm';
import { createService } from '../api/service';
import CategoryServiceProfessionalPicker from '../components/CategoryServiceProfessionalPicker';
import BookingManager from '../components/BookingManager';


const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const [authorized, setAuthorized] = useState(false);
  const [professionals, setProfessionals] = useState([]);


  useEffect(() => {
    if (!isLoaded || !user) return;

    const checkAdmin = async () => {
      try {
        const email = user?.primaryEmailAddress?.emailAddress;
        const res = await axios.get(`${API_BASE_URL}/users/email/${email}`);
        if (res.data.role === 'admin') {
          setAuthorized(true);
          fetchProfessionals();
        } else {
          navigate('/home');
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
        navigate('/home');
      }
    };

    checkAdmin();
  }, [isLoaded, user]);

  const fetchProfessionals = async () => {
    try {
      const data = await getAllProfessionals();
      setProfessionals(data);
    } catch (err) {
      console.error("Failed to fetch professionals", err);
    }
  };

  const handleCreate = async (formData) => {
    try {
      await createProfessional(formData);
      fetchProfessionals();
    } catch (err) {
      console.error("Failed to create professional", err);
    }
  };

  const handleServiceCreate = async (data) => {
  try {
    await createService(data);
    alert('Service created successfully');
  } catch (err) {
    console.error('Failed to create service', err);
  }
};

  if (!isLoaded) return <div>Loading...</div>;
  if (!authorized) return <div>Checking access...</div>;

  return (
    <div className="min-h-screen bg-white text-black p-6">
  <div className="max-w-6xl mx-auto space-y-10">
    {/* Category > Service > Professionals Picker */}
    <div className="p-6 border border-black rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Browse & Select</h2>
      <CategoryServiceProfessionalPicker />
    </div>

    {/* Add New Professional Form */}
    <div className="p-6 border border-black rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Add New Professional</h2>
      <ProfessionalForm onSubmit={handleCreate} />
    </div>

    {/* Professionals List */}
    <div className="p-6 border border-black rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">All Professionals</h2>
      <ProfessionalList professionals={professionals} />
    </div>

    {/* Add New Service Form */}
    <div className="p-6 border border-black rounded-lg shadow-md bg-gray-50">
      <h2 className="text-xl font-semibold mb-4">Add New Service</h2>
      <ServiceForm onSubmit={handleServiceCreate} />
    </div>

    <BookingManager/>
  </div>
</div>

  );
}
