import $config from "@/config/index";
/**
 *  元素点击事件相关方法
 * */
export default {
  methods: {
    /**
     * 链接跳转
     */
    _event_link(eventData) {
      return new Promise((resolve) => {
        if (eventData.url) {
          window.location.href = eventData.url;
        }
        resolve();
      });
    },
    /**
     * 分享
     * @private
     */
    _event_share() {
      return new Promise((resolve) => {
        window.alert("分享");
        resolve();
      });
    },
    /**
     * 表单提交
     * @private
     */
    _event_submitForm() {
      return new Promise((resolve) => {
        window.alert("表单提交，待完善...");
        resolve();
      });
    },
    /**
     * 跳转WhatsApp
     * @private
     */
    _event_whatsApp() {
      console.log("************************");
      return new Promise((resolve) => {
        console.log(this.pageData);
        // 检查key是否存在
        if (sessionStorage.getItem(this.pageData.id)) {
          alert(this.pageData.tip);
        } else {
          const url = "https://wa.me/" + this.pageData.whatsApp.username; // 请替换为你的WhatsApp号码
          window.open(url, "_blank");

          // 写入sessionStorage
          sessionStorage.setItem(this.pageData.id, "true");
        }
        fetch($config.baseURL + "/joinUs/" + this.pageData.id, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: this.pageData.whatsApp.username }),
        })
          .then((response) => response.text())
          .then((data) => console.log(data))
          .catch((error) => console.log("Error:", error));
        resolve();
      });
    },
  },
};
