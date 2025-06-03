export const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour12: false, // 24-hour format
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh", // Múi giờ +7, điều chỉnh theo nhu cầu
  });
  return formattedTime;
};
