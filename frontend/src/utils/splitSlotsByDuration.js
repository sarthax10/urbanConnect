/**
 * Split available duration into bookable slots based on service duration.
 * @param {Array} availabilities - Array of availability blocks (startTime, endTime, professionalId, availabilityId)
 * @param {number} durationMinutes - Duration of the selected service (in minutes)
 * @returns {Array} - Generated time slots with startTime and endTime
 */
export function splitSlotsByDuration(availabilities, durationMinutes) {
  if (!Array.isArray(availabilities) || !durationMinutes) return [];

  const durationMs = durationMinutes * 60 * 1000;
  const slots = [];

  availabilities.forEach((slot) => {
    const start = new Date(slot.startTime);
    const end = new Date(slot.endTime);
    let current = new Date(start);

    while (current.getTime() + durationMs <= end.getTime()) {
      const slotEnd = new Date(current.getTime() + durationMs);

      slots.push({
        availabilityId: slot.availabilityId,
        professionalId: slot.professionalId,
        startTime: current.toISOString(),
        endTime: slotEnd.toISOString(), // <-- added endTime here
      });

      current = slotEnd;
    }
  });

  return slots;
}
