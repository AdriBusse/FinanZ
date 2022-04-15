export const showBalance = a => {
  if (a.length === 0) {
    return 0;
  } else {
    let x = 0;
    a.map(e => {
      x += e.amount;
      //parseFloat(acc) + parseFloat(curr.amount);
    });
    return x;
  }
};
