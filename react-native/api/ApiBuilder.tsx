import { create } from 'apisauce';
import env from 'constants/env';
export default create({
  baseURL: env.BASE_URL,
  withCredentials: true
});