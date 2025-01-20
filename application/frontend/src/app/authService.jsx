
import customAxios from './customAxios';

const API_URL = process.env.SIGNUP_API;
const HOST = process.env.NEXT_PUBLIC_HOST_NAME;
const authService = {
  login: (email, password) => {
    return customAxios.post(`https://${HOST}/api/api/login/`, { email, password });
  },
  signup: (username, email, password) => {
    return customAxios.post(`https://${HOST}/api/api/register/`, { username, email, password });
  },
  logout: () => {
    localStorage.removeItem('codeSent');
    return customAxios.post(`https://${HOST}/api/api/logout/`);
  },
  _42API: () => {
    return customAxios.get(`https://${HOST}/api/oauth/login/`);
  },
  _42CALLBACK: () => {
    return customAxios.get(`https://${HOST}/api/oauth/user_data/`);
  },
  user_data: () => {
    return customAxios.get(`https://${HOST}/api/oauth/user_data/`);
  }
};

export default authService;
