export const defaultCreateEventForm = {
  name: "",
  locationId: [],
  description: "",
  startDate: null,
  startTime: {
    hours: null,
    minutes: null,
  },
  endTime: {
    hours: null,
    minutes: null,
  },
  duration: {
    hours: null,
    minutes: null,
  },
  imageUrls: [],
  allDay: false,
  guests: [],
};

export const defaultCreateEventError = {
  name: null,
  locationId: "",
  description: "",
  startDate: null,
  startTime: null,
  endTime: null,
  duration: null,
  imageUrls: "",
  guests: "",
};
