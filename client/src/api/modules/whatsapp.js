/*
 * image 图片库
 **/
import $axios from "@/service/httpServer";
export const getMyWhatsApps = (p) => $axios.get("/whatsapp/myWhatsApps", p);
export const addWhatsApp = (p) => $axios.post("/whatsapp/addWhatsApp", p);

export const delWhatsApp = (p) => $axios.post("/whatsapp/delWhatsApp", p);
