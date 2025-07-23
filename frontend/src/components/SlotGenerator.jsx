import React from 'react';

const formatTimeIST = (utcDate) => {
  return new Date(utcDate).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
};

export default function SlotGenerator({
  slots = [],
  professionals = [],
  services = [],
  selectedServiceId,
  handleSlotClick,
}) {
  if (!selectedServiceId || slots.length === 0) return null;

  const selectedService = services.find(s => s.serviceId === selectedServiceId);
  if (!selectedService) return null;

  const durationMs = selectedService.durationMinutes * 60 * 1000;

  return professionals.map((pro) => {
    const proSlots = slots.filter((s) => s.professionalId === pro.professionalId);
    if (proSlots.length === 0) return null;

    return (
      <div key={pro.professionalId} className="mb-10 border rounded p-4 shadow-sm bg-gray-50">
        <h3 className="text-lg font-bold mb-1">{pro.name}</h3>
        <p className="text-sm text-gray-600 italic mb-2">{pro.profileBio || 'No bio available.'}</p>
        <p className="text-sm text-yellow-600 mb-3">⭐ {pro.rating || 'No rating'}</p>

        <div className="flex flex-wrap gap-3">
          {proSlots.map((slot, idx) => {
            const endTime = new Date(new Date(slot.startTime).getTime() + durationMs);

            return (
              <button
                key={`${slot.professionalId}-${idx}`}
                onClick={() => handleSlotClick(slot, pro)}
                className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
              >
                {formatTimeIST(slot.startTime)} - {formatTimeIST(endTime)}
              </button>
            );
          })}
        </div>
      </div>
    );
  });
}
