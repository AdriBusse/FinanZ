export const formatNumber = (num: number, seperator = ' '): string => {
  const res = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, seperator);
  return res;
};
