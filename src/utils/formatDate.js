export function formatDate(date, format = "DD/MM/YYYY") {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  const replacements = {
    DD: day,
    MM: month,
    YYYY: year,
    HH: hours,
    mm: minutes,
  };

  let result = format;
  Object.forEach(replacements, (value, key) => {
    result = result.replace(key, value);
  });
  return result;
}

export function formatDateToDMY(date) {
  return formatDate(date, "DD/MM/YYYY");
}

export function formatDateTime(date) {
  return formatDate(date, "DD/MM/YYYY HH:mm");
}

export function getRelativeTime(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return formatDate(date, "DD/MM/YYYY");
}
