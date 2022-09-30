import NuxtGraphqlCodegen from "..";

export default defineNuxtConfig({
  modules: [NuxtGraphqlCodegen],
  graphqlCodegen: {
    configPath: "./config/codegen.yml",
  },
});
