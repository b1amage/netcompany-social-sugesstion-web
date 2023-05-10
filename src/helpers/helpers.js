export async function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      alert("Fking stupd to block location on this app");
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          alert("Fking stupd to block location on this app");
          reject(
            new Error(`Unable to retrieve your location: ${error.message}`)
          );
        }
      );
    }
  });
}
