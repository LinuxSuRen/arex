import i18n from "i18next";
// i18next-browser-languagedetector插件
// 这是一个 i18next 语言检测插件，用于检测浏览器中的用户语言，
// 详情请访问：https://github.com/i18next/i18next-browser-languageDetector
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
// 引入需要实现国际化的简体、繁体、英文三种数据的json文件

const resources = {
  // 'zh-TW': {
  //   translation: tw
  // },
  "zh-CN": {
    layout: require("./zh-cn/layout.json"),
    components: require("./zh-cn/components.json"),
    page: require("./zh-cn/page.json"),
  },
  "en-US": {
    layout: require("./en-us/layout.json"),
    components: require("./en-us/components.json"),
    page: require("./en-us/page.json"),
  },
};

i18n
  .use(LanguageDetector) // 嗅探当前浏览器语言 zh-CN
  .use(initReactI18next) // 将 i18n 向下传递给 react-i18next
  .init({
    // 初始化
    resources, // 本地多语言数据
    lng: localStorage.getItem("i18nextLng") || "zh-CN",
    fallbackLng: "cn",
    detection: {
      caches: ["localStorage"], // 'sessionStorage', 'cookie'
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
