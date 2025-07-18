import { toast } from "react-toastify";
import api from "./api";

export const getJob = async (id) => {
  try {
    const response = await api.get(`/jobs/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    toast.error("Güncellenicek eleman bulunamadı");
  }
};