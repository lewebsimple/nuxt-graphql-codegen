# `nuxt-graphql-codegen`

> [GraphQL Code Generator](https://www.graphql-code-generator.com/) module for Nuxt3 / Nuxt Bridge.

## Quick setup

1. Add `nuxt-graphql-codegen` dependency to your project

```shell
# Using yarn
yarn add -D nuxt-graphql-codegen

# Using npm
npm install --save-dev nuxt-graphql-codegen
```

Note you also need `graphql`, `@graphql-codegen/cli` and the [plugins](https://www.graphql-code-generator.com/plugins) you want to use.

2. Add `nuxt-graphql-codegen` to the `modules` section of your `nuxt.config.ts`

```ts
import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  modules: ["nuxt-graphql-codegen"],
});
```

3. Create your `codegen.yml` or `codegen.json` configuration file in the project's `rootDir` with the [Initialization Wizard](https://www.graphql-code-generator.com/docs/getting-started/installation#initialization-wizard) or [manually](https://www.graphql-code-generator.com/docs/config-reference/codegen-config)

```shell
yarn graphql-codegen init
```

That's it! The code generator will now be executed before each build, it will also watch for changes in `.graphql` and `.gql` files in development mode.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
