import Storage from "./storage";

export default class Auth {
  logout(data) {
    return Storage.eraseStorage('session');
  }

  loginUser(params) {
    Storage.setStorage('session', JSON.stringify(params.data.signIn.credential))
  }

  signUpUser(params) {
    Storage.setStorage('session', JSON.stringify(params.data.register.credential))
  }
}