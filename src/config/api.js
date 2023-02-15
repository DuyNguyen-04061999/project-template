import { interceptorsRequest, interceptorsResponse } from "@/utils";
import axios from "axios";

export const AUTH_API = import.meta.env.VITE_AUTH_API;
export const api = axios.create();
interceptorsRequest(api);
interceptorsResponse(api);
