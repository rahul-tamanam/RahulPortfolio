import { consola } from 'consola'

async function main() {
  try {
    // No data to seed after removing blog
    consola.success('Seed complete.')
  } catch (error) {
    consola.error('Error:\n', error)
  }
}

await main()
