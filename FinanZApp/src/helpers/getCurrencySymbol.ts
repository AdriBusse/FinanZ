export const getCurrencySymbol = (currency: string) => {
  switch (currency) {
    case 'usd':
      return '$';
    case 'eur':
      return '€';
    case 'gbp':
      return '£';
    case 'jpy':
      return '¥';
    case 'cad':
      return 'C$';
    case 'aud':
      return 'A$';
    case 'chf':
      return 'Fr';
    case 'cny':
      return '¥';
    case 'rub':
      return '₽';
    case 'inr':
      return '₹';
    case 'krw':
      return '₩';
    case 'btc':
      return '₿';
    case 'eth':
      return 'Ξ';
    default:
      return '';
  }
};
