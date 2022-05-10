import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  rollup: {
    emitCJS: false,
    cjsBridge: true,
  },
  entries: ["src/module"],
  externals: ["pathe", "@nuxt/kit", "@nuxt/types"],
});
