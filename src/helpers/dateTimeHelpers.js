export function isEndTimeAfterStartTime(startTime, endTime) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  if (endHours > startHours) {
    return true;
  } else if (endHours === startHours && endMinutes > startMinutes) {
    return true;
  } else {
    return false;
  }
}

export function calculateDuration(startTime, endTime) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const [endHours, endMinutes] = endTime.split(":").map(Number);

  let durationHours = endHours - startHours;
  let durationMinutes = endMinutes - startMinutes;

  // Handle negative minutes
  if (durationMinutes < 0) {
    durationHours -= 1;
    durationMinutes += 60;
  }

  const duration = {
    hours: durationHours,
    minutes: durationMinutes,
  };

  return duration;
}

export function isDateToday(dateString) {
  if (!dateString) return false;
  const currentDate = new Date(); // Current date
  const inputDate = new Date(dateString);

  // Set time to 00:00:00 to compare only dates
  currentDate.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  return currentDate.getTime() === inputDate.getTime();
}

export function isInvalidTime(timeString) {
  const currentTime = new Date(); // Current time

  const [hours, minutes] = timeString.split(":");
  const startTime = new Date();

  startTime.setHours(hours);
  startTime.setMinutes(minutes);

  return startTime < currentTime;
}
