export default (givenDate) => {
  const givenTime = new Date(givenDate).getTime();
  const currentTime = Date.now();
  const timeDifference = currentTime - givenTime;

  const seconds = Math.floor(timeDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  let timeSinceString = "";

  if (years > 0) {
    timeSinceString += `${years} ${years === 1 ? "year" : "years"} `;
    days %= 365;
  }
  if (weeks > 0) {
    timeSinceString += `${weeks} ${weeks === 1 ? "week" : "weeks"} `;
    days %= 7;
  }
  if (days > 0) {
    timeSinceString += `${days} ${days === 1 ? "day" : "days"} `;
  }

  minutes %= 60;
  hours %= 24;

  if (hours > 0) {
    timeSinceString += `${hours} ${hours === 1 ? "hour" : "hours"} `;
  }
  if (minutes > 0) {
    timeSinceString += `${minutes} ${minutes === 1 ? "minute" : "minutes"} `;
  }

  return timeSinceString.trim();
};
