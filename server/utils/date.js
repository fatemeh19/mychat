export default  (date, number) => {
  let day;
  switch (date) {
    case "forever":
        return  new Date(8640000000000000)
      break;
    case "day":
      day = 1 * number;
      break;
    case "week":
      day = 7 * number;
      break;
    case "month":
      day = 30 * number;
      break;
    default:
      break;
  }
  let now = new Date(Date.now());
  let result = now.setDate(now.getDate() + day);
  console.log()
  return result;
};
