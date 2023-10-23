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

const dateTimeString = "2023-10-14T23:01:11.410Z";
const formattedDateTime = formatDateTime(dateTimeString);
// console.log(formattedDateTime);

export { formatDateTime };
