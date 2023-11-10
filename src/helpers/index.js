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
  const targetTime = Math.floor(
    (presentTime.getTime() - new Date(dateTimeString).getTime()) / 60000
  );

  //if targetTime is less than 60 minutes
  if (targetTime < 60) {
    return `${targetTime} min${targetTime !== 1 ? "s" : ""} ago`;
  } else if (targetTime < 1440) {
    //if targetTime is less than 24 hours
    return `${Math.floor(targetTime / 60)} hr${
      Math.floor(targetTime / 60) !== 1 ? "s" : ""
    } ago`;
  } else {
    //if targetTime is more than 24 hours
    return `${Math.floor(targetTime / 1440)} day${
      Math.floor(targetTime / 1440) !== 1 ? "s" : ""
    } ago`;
  }
}

function timeDifference2(dateTimeString) {
  const presentTime = new Date();
  const targetTime = new Date(dateTimeString);
  const timeDifferenceMillis = targetTime - presentTime;

  const minutes = Math.floor(timeDifferenceMillis / (1000 * 60));
  const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
  const days = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));

  if (minutes < 60) {
    return `${minutes} min${minutes !== 1 ? "s" : ""} ago`;
  } else if (hours < 24) {
    return `${hours} hr${hours !== 1 ? "s" : ""} ago`;
  } else {
    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }
}

const dateTimeString1 = "2023-11-08T12:00:00";
const dateTimeString2 = "2023-11-07T18:30:00";
const dateTimeString3 = "2023-10-31T08:00:00";

console.log(timeDifference2(dateTimeString1)); // Output: "1 day ago"
console.log(timeDifference2(dateTimeString2)); // Output: "16 hrs ago"
console.log(timeDifference2(dateTimeString3)); // Output: "8 days ago"

export { formatDateTime, timeDifference };
