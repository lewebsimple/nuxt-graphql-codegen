import { defineNuxtModule } from '@nuxt/kit'
import { watch, FSWatcher } from 'chokidar'
import consola from 'consola'
import { generate, loadContext } from '@graphql-codegen/cli'

const logger = consola.withScope('nuxt-graphql-codegen')

export default defineNuxtModule({
  meta: {
    name: 'nuxt-graphql-codegen',
    configKey: 'graphqlCodegen'
  },
  async setup (_options, nuxt) {
    process.chdir(nuxt.options.rootDir)
    const context = await loadContext()

    async function generateGraphQLCodegen () {
      const start = Date.now()
      await generate(context, true)
      const time = Date.now() - start
      logger.success(`GraphQL Codegen generated code in ${time}ms`)
    }

    if (nuxt.options.dev) {
      let watcher: FSWatcher
      nuxt.hook('build:before', async () => {
        const { schema, documents } = context.getConfig()
        const paths = [schema, documents].filter(path => !!path)
        logger.info('GraphQL Codegen watching for changes...')
        watcher = watch(paths)
        watcher.on('change', generateGraphQLCodegen)
        await generateGraphQLCodegen()
      })
      nuxt.hook('close', () => watcher.close())
    } else {
      nuxt.hook('build:before', async () => {
        await generateGraphQLCodegen()
      })
    }
  }
})
