import AsyncStorage from "@react-native-community/async-storage";

export default class Storage {
  static eraseStorage(type) {
    return AsyncStorage.removeItem(`@communikitty-graphql:${type}`);
  }

  static setStorage(type, data) {
    AsyncStorage.setItem(`@communikitty-graphql:${type}`, data);
  }
}