/*
 * image 图片库
 **/
import $axios from "@/service/httpServer";
export const getMyWhatsApps = (p) =>
  $axios.get("/quark/whatsapp/myWhatsApps", p);
export const addWhatsApp = (p) => $axios.post("/quark/whatsapp/addWhatsApp", p);

export const delWhatsApp = (p) => $axios.post("/quark/whatsapp/delWhatsApp", p);
