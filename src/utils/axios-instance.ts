import axios from "axios";
import { LoginType } from "../types/LoginType";

export const axiosInstance = axios.create({
  baseURL: "https://fullstack.exercise.applifting.cz",
  headers: {
    "X-API-KEY": "5c946f9a-b317-4dd2-a3f3-e188fe5ddb30",
    Authorization: "e6c7b2c3-30c3-47b3-a831-ce277841cda7",
  },
});
