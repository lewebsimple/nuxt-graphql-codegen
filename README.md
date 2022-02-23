# nuxt-graphql-codegen

> Nuxt module for GraphQL Code Generator

This module loads your `@graphql-codegen/cli` configuration and runs the code generation before each build. It will also watch for changes in your schema and/or documents in development mode.

## Installation

```sh
yarn add -D nuxt-graphql-codegen graphql
yarn add -D @graphql-codegen/typescript
```

_Note: you don't need `@graphql-codegen/cli` itself, but only `graphql` and the [plugins](https://www.graphql-code-generator.com/plugins) you wish to use._

## Usage

Add to `buildModules` in `nuxt.config.ts`:

```js
import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  buildModules: ['nuxt-graphql-codegen']
})
```

Follow the [setup instructions](https://www.graphql-code-generator.com/docs/getting-started/installation#setup) for GraphQL Code Generator.

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.

## License

[MIT](http://opensource.org/licenses/MIT)
