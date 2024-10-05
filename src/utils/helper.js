export const formattedDate = (dateString) => {
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
