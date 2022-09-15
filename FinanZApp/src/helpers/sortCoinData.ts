import {
  TOP1H,
  FLOP1H,
  FLOP24H,
  TOP24H,
  DEFAULT,
} from './../config/CryptoSorterConstants';
import { CurrencyData } from '../queries/types/IGetCryptoCurrencyData';

export const sortCoinData = (
  data: CurrencyData[],
  sort: string,
): CurrencyData[] => {
  try {
    let sorted = data.slice();
    if (sort === FLOP1H) {
      return sorted.sort((a, b) => {
        return (
          a.price_change_percentage_1h_in_currency -
          b.price_change_percentage_1h_in_currency
        );
      });
    }
    if (sort === FLOP24H) {
      return sorted.sort((a, b) => {
        return a.price_change_percentage_24h - b.price_change_percentage_24h;
      });
    }
    if (sort === TOP1H) {
      return sorted.sort((a, b) => {
        return (
          b.price_change_percentage_1h_in_currency -
          a.price_change_percentage_1h_in_currency
        );
      });
    }
    if (sort === TOP24H) {
      return sorted.sort((a, b) => {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      });
    }
    if (sort === DEFAULT) {
      return sorted.sort((a, b) => {
        return a.market_cap_rank - b.market_cap_rank;
      });
    }
    return sorted;
  } catch (error) {
    console.log('____ERROR');
    console.log(error);
    return [];
  }
};
