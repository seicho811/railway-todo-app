const formatUtcStringToJst = (utcDateString) => {
  return new Date(utcDateString).toLocaleString('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
};

const getJSTDate = (date = new Date()) => {
  return new Date(date.toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }));
};

export { formatUtcStringToJst, getJSTDate };
