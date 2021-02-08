import Storage from "./storage";

export default class Auth {
  logout(data) {
    return Storage.eraseStorage('session');
  }

  async loginUser(params) {
    return Storage.setStorage('session', JSON.stringify(params.data.signIn.credential))
  }

  signUpUser(params) {
    return Storage.setStorage('session', JSON.stringify(params.data.register.credential))
  }
}