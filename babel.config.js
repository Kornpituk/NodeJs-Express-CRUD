// babel.config.js
export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: { node: "current" } // ให้รองรับ Node เวอร์ชันปัจจุบัน
      }
    ]
  ]
};
