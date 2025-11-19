import axios from "axios";
import type { NewDiary } from "./types";

const baseUrl = "http://localhost:3000/api/diaries";

const getDiaries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addDiary = async (newDiary: NewDiary) => {
  try {
    const response = await axios.post(baseUrl, newDiary);
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data || err.message);
    }
    throw err;
  }
};

export default { getDiaries, addDiary };
