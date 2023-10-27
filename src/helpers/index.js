function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Convert hours to AM/PM format
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  // Format minutes to have leading zeros if needed
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}

function timeDifference(dateTimeString) {
  const presentTime = new Date();
  const timeDifference = Math.floor(
    (presentTime.getTime() - new Date(dateTimeString).getTime()) / 60000
  );

  return timeDifference;
}

export { formatDateTime, timeDifference };
