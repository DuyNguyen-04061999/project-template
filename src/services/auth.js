import { api, AUTH_API } from "@/config";

export const authService = {
  login(form) {
    return api.post(`${AUTH_API}/login`, form);
  },
  getProfile() {
    return api.get(`${AUTH_API}`);
  },
  refreshToken(data) {
    return api.post(`${AUTH_API}`, data);
  },
};
