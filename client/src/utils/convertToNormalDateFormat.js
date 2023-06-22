export const convertToNormalDateFormat = (time) => {
    const date = new Date(time);
    const normalDate = date.toLocaleDateString("en", {
      day: "numeric",
      month: "long",
      minute: "numeric",
      hour: "numeric",
    });
    return normalDate;
  };