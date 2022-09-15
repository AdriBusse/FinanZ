export const showShortNumber = (number: number): string => {
  if (number > 1000000000) {
    return (number / 1000000000).toFixed(0) + ' B';
  } else if (number > 1000000) {
    return (number / 1000000).toFixed(0) + ' M';
  } else {
    return (number / 1000).toFixed(0) + ' K';
  }
};
