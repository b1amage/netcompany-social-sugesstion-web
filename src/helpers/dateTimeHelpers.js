import { DateTime } from "luxon";

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

export function convertDateTime(dateTimeStr) {
  const dateTime = DateTime.fromISO(dateTimeStr);
  const datePart = dateTime.toFormat("yyyy-MM-dd");
  const timePart = { hours: dateTime.hour, minutes: dateTime.minute };
  return [datePart, timePart];
}

export function calculateEndTime(startTime, duration) {
  const totalStartMinutes = startTime.hours * 60 + startTime.minutes;
  const totalDurationMinutes = duration.hours * 60 + duration.minutes;
  const totalEndMinutes = totalStartMinutes + totalDurationMinutes;

  const endHours = Math.floor(totalEndMinutes / 60) % 24;
  const endMinutes = totalEndMinutes % 60;

  let endTime = { hours: endHours, minutes: endMinutes };

  return endTime;
}

export function isTimeInPast(timeString) {
  // Parse the time string into a Date object.
  let time = new Date(timeString);

  // Get the current time.
  let currentTime = new Date();

  // Compare the two times. If the time is less than the current time, it's in the past.
  if (time < currentTime) {
    return true;
  } else {
    return false;
  }
}
