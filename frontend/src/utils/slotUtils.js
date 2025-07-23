import dayjs from 'dayjs';

/**
 * Generate time slots from availability based on service duration
 * @param {Array} availabilities - All availability blocks (startTime, endTime)
 * @param {number} durationInMinutes - Duration of the service in minutes
 * @returns {Array} timeSlots - Individual time slots
 */
export function generateTimeSlots(availabilities, durationInMinutes) {
  const generated = [];

  availabilities.forEach((slot) => {
    const start = dayjs(slot.startTime);
    const end = dayjs(slot.endTime);
    let current = start.clone();

    while (
      current.clone().add(durationInMinutes, 'minute').isSameOrBefore(end)
    ) {
      const slotStart = current.clone();
      const slotEnd = current.clone().add(durationInMinutes, 'minute');

      generated.push({
        availabilityId: slot.availabilityId,
        professionalId: slot.professionalId,
        startTime: slotStart.toISOString(),
        endTime: slotEnd.toISOString(),
      });

      current = slotEnd;
    }
  });

  return generated;
}
