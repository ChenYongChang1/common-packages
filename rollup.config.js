const babel = require("@rollup/plugin-babel");
const fs = require("fs-extra");
// const copy = require("rollup-plugin-copy");
const resolve = require("rollup-plugin-node-resolve");
const commonjs = require("rollup-plugin-commonjs");

const typescript = require("@rollup/plugin-typescript"); // 让 rollup 认识 ts 的代码
const pkg = require("./package.json");
const serve = require("rollup-plugin-serve");
const livereload = require("rollup-plugin-livereload");
const { terser } = require("rollup-plugin-terser");
const isDev = process.env.npm_lifecycle_event === "dev";
const httpServer = isDev
  ? [
      serve({
        contentBase: "", //服务器启动的文件夹，默认是项目根目录，需要在该文件下创建index.html
        port: 8080, //端口号，默认10001
      }),
      livereload("lib"),
    ]
  : [];
module.exports = {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
    {
      file: pkg.module,
      format: "esm",
    },
    {
      file: pkg.browser,
      name: "DdCommonPackages",
      globals: {
        vue: "vue",
      },
      format: "umd",
    },
  ],
  watch: {
    // 配置监听处理
    exclude: "node_modules/**",
  },
  plugins: [
    ...httpServer,
    terser(),
    resolve(),
    commonjs(),
    typescript(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    {
      name: "afterBuild",
      async buildEnd() {
        // 清空 dist 目录
        try {
          await fs.emptyDir("lib");
          console.log("目标目录已清空");
        } catch (err) {
          console.error("清空目标目录时出错：", err);
        }
      },
    },
    // copy({
    //   targets: [
    //     { src: "src/bin", dest: "lib" }, // 将 assets 目录下的文件复制到 dist/assets 目录
    //   ],
    // }),
  ],
  external: ["vue"],
};
