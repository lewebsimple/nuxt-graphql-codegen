import { dirname } from "pathe";
import type { Module } from "@nuxt/types";
import { defineNuxtModule, logger } from "@nuxt/kit";
import { generate, loadCodegenConfig } from "@graphql-codegen/cli";

export default <Module>(<unknown>defineNuxtModule({
  meta: {
    name: "nuxt-graphql-codegen",
    configKey: "graphqlCodegen",
  },
  defaults: {},
  async setup(_options, nuxt) {
    // Load GraphQL Code Generator configuration from rootDir
    const { config, filepath } = await loadCodegenConfig({
      configFilePath: nuxt.options.rootDir,
    });
    const cwd = dirname(filepath);

    // Execute GraphQL Code Generator
    async function codegen() {
      try {
        const start = Date.now();
        await generate({ ...config, cwd }, true);
        const time = Date.now() - start;
        logger.success(`GraphQL Code Generator generated code in ${time}ms`);
      } catch (e: unknown) {
        logger.error(`GraphQL Code Generator configuration not found.`);
      }
    }

    // Configure hooks
    nuxt.hook("build:before", codegen);
    nuxt.hook("builder:watch", async (_event, path) => {
      if (path.endsWith(".graphql") || path.endsWith(".gql")) {
        await codegen();
      }
    });
  },
}));
