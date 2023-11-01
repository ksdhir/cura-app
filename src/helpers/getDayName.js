export default function getDayName(dateString) {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  const dayIndex = date.getUTCDay();
  return daysOfWeek[dayIndex];
}
