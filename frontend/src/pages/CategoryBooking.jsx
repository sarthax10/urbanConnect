import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServicesByCategory } from '../api/service';
import { getAvailableSlots, createBooking } from '../api/booking';
import { useUser } from '@clerk/clerk-react';
import { getUserByEmail } from '../api/user';
import { getAllProfessionals } from '../api/professional';
import SlotGenerator from '../components/SlotGenerator';
import { splitSlotsByDuration } from '../utils/splitSlotsByDuration';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

export default function CategoryBooking() {
  const { category } = useParams();
  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [professionals, setProfessionals] = useState([]);
  const { user } = useUser();

  // 📡 Fetch services and professionals
  useEffect(() => {
    const fetchData = async () => {
      const [servicesRes, prosRes] = await Promise.all([
        getServicesByCategory(category),
        getAllProfessionals(),
      ]);
      setServices(servicesRes);
      setProfessionals(prosRes);
    };
    fetchData();
  }, [category]);

  const formatAsLocalIso = (dateObj) => {
    const pad = (num) => num.toString().padStart(2, '0');
    return (
      dateObj.getFullYear() +
      '-' +
      pad(dateObj.getMonth() + 1) +
      '-' +
      pad(dateObj.getDate()) +
      'T' +
      pad(dateObj.getHours()) +
      ':' +
      pad(dateObj.getMinutes()) +
      ':' +
      pad(dateObj.getSeconds())
    );
  };

  const handleServiceSelect = (id) => {
    setSelectedServiceId(id);
    setDate('');
    setSlots([]);
  };

  // 📅 On Date Change → Fetch slots using split logic
  const handleDateChange = async (e) => {
    const pickedDate = e.target ? e.target.value : e;
    setDate(pickedDate);

    if (!selectedServiceId || !pickedDate) return;
    setLoadingSlots(true);

    try {
      const availabilities = await getAvailableSlots(selectedServiceId, pickedDate);
      const selectedService = services.find(s => s.serviceId === selectedServiceId);

      if (!selectedService) return;
      const generated = splitSlotsByDuration(availabilities, selectedService.durationMinutes);
      setSlots(generated);
    } catch (err) {
      console.error('❌ Failed to fetch slots:', err);
    } finally {
      setLoadingSlots(false);
    }
  };

  // ✅ When slot is clicked (Book it)
  const handleSlotClick = async (slot, professional) => {
    try {
      const email = user?.primaryEmailAddress?.emailAddress;
      const userData = await getUserByEmail(email);
      if (!userData?.userId) return alert('⚠️ User not found in system');

      const service = services.find(s => s.serviceId === selectedServiceId);
      const durationMs = service.durationMinutes * 60 * 1000;

      const scheduledStart = new Date(slot.startTime);
      const scheduledEnd = new Date(scheduledStart.getTime() + durationMs);

      const bookingData = {
        userId: userData.userId,
        professionalId: slot.professionalId,
        serviceId: selectedServiceId,
        availabilityId: slot.availabilityId,
        scheduledStart: formatAsLocalIso(scheduledStart),
        scheduledEnd: formatAsLocalIso(scheduledEnd),
      };

      console.log('📦 Booking Payload:', bookingData);

      await createBooking(bookingData);
      alert('🎉 Booking successful!');
      setDate('');
      setSlots([]);
      setSelectedServiceId(null);
    } catch (err) {
      console.error('❌ Booking failed:', err);
      alert('❌ Booking failed. Try again.');
    }
  };

  return (
    <div className="bg-white text-black min-h-screen px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold mb-8 border-b pb-4">
          Book a <span className="italic text-gray-600">{category}</span> Service
        </h1>

        {/* Service Selector */}
        <div className="mb-10">
          <h2 className="text-xl font-medium mb-4">Choose a Service:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <button
                key={s.serviceId}
                onClick={() => handleServiceSelect(s.serviceId)}
                className={`text-left p-4 border rounded-lg transition shadow-sm hover:shadow-md ${
                  selectedServiceId === s.serviceId
                    ? 'border-black bg-gray-100'
                    : 'border-gray-300'
                }`}
              >
                <div className="font-semibold text-lg">{s.name}</div>
                <div className="text-sm text-gray-600">{s.durationMinutes} mins</div>
                <div className="text-sm italic text-gray-500">{s.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        {selectedServiceId && (
          <div className="mb-8">
            <label className="block text-lg font-medium mb-2">
              Pick a Date:
            </label>
            <DatePicker
              style={{ width: '100%', maxWidth: 300 }}
              disabledDate={(current) => current && current < dayjs().startOf('day')}
              value={date ? dayjs(date) : null}
              onChange={(newDate) => {
                const picked = newDate ? newDate.format('YYYY-MM-DD') : '';
                setDate(picked);
                handleDateChange(picked);
              }}
              allowClear={false}
            />
          </div>
        )}

        {loadingSlots && <p className="text-gray-500">Checking availability…</p>}

        {/* Time Slot Rendering */}
        <SlotGenerator
          slots={slots}
          professionals={professionals}
          services={services}
          selectedServiceId={selectedServiceId}
          handleSlotClick={handleSlotClick}
        />

        {/* No Slots Message */}
        {!loadingSlots && selectedServiceId && date && slots.length === 0 && (
          <p className="text-gray-500 italic">No professionals available for this date.</p>
        )}
      </div>
    </div>
  );
}