import { dirname, join } from "pathe";
import { defineNuxtModule, logger } from "@nuxt/kit";
import { generate, loadCodegenConfig } from "@graphql-codegen/cli";

interface ModuleOptions {
  devOnly: boolean;
  extensions: string[];
  configPath: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-graphql-codegen",
    configKey: "graphqlCodegen",
  },
  defaults: {
    devOnly: false,
    extensions: [".graphql", ".gql"],
    configPath: "codegen.yml",
  },
  async setup({ devOnly, extensions, configPath }, nuxt) {
    let config, cwd;

    // Run in development mode only
    if (devOnly && !nuxt.options.dev) {
      return;
    }

    // Load GraphQL Code Generator configuration
    try {
      const configFilePath = join(nuxt.options.rootDir, configPath);
      const { config: codegenConfig, filepath } = await loadCodegenConfig({
        configFilePath,
      });
      config = { ...codegenConfig };
      cwd = dirname(filepath);
    } catch {
      logger.error(`Unable to find ${configFilePath}`);
      return;
    }

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
      if (extensions.some((ext) => path.endsWith(ext))) {
        await codegen();
      }
    });
  },
});
