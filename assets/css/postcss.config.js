module.exports = {
  plugins: [
    require("postcss-import")({path: ['./']}),
    require("tailwindcss")("./assets/css/tailwind.config.js"),
    require("autoprefixer")({path: ['./']}),
  ],
};
