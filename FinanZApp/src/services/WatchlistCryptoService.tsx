import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'watchlistCrypto';

export default class WatchlistCryptoService {
  static getList = async () => {
    let listRaw = await AsyncStorage.getItem(KEY);
    let parsedList = listRaw ? JSON.parse(listRaw) : [];
    return parsedList;
  };

  static addToList = async (id: string) => {
    let list = await this.getList();
    list.push(id);

    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  };

  static removeFromList = async (id: string) => {
    let list = await this.getList();
    list = list.filter((item: string) => item !== id);
    AsyncStorage.setItem(KEY, JSON.stringify(list));
  };

  static isInList = async (id: string): Promise<boolean> => {
    let list = await this.getList();
    return list.includes(id);
  };

  static print = async () => {
    let list = await this.getList();
    console.log(list);
  };
  static clear = async () => {
    await AsyncStorage.removeItem(KEY);
  };
}
