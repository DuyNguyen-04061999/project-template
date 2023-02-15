import { authService } from "@/services/auth";
import { getToken, setToken } from "./token";

export function interceptorsResponse(api) {
  api.interceptors.response.use(
    (res) => res?.data,
    async (error) => {
      try {
        if (
          error?.response?.status === 403 &&
          error?.response?.data?.error_code === "TOKEN_EXPIRED"
        ) {
          //refresh token
          const token = getToken();
          const res = await authService.refreshToken({
            refreshToken: token?.refreshToken,
          });
          setToken(res?.data);
          //thuc thi lai api bi loi
          return api(error?.config);
        }
      } catch (err) {
        console.log("err :>> ", err);
      }

      throw error;
    }
  );
}
// async (error) => {
//   console.log("error :>> ", error);
//   try {
//     if (
//       error?.response.status === 403 &&
//       error?.response?.data?.error_code === "TOKEN_EXPIRED"
//     ) {
//       //refresh token
//       const token = getToken();
//       //post
//       const res = await authService.refreshToken({
//         refreshToken: token?.refreshToken,
//       });
//       setToken(res?.data);
//       //thuc thi lai api bi loi

//       return api(error?.config);
//     }
//   } catch (err) {}
//   throw error;
// }
