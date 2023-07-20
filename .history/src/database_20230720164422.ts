import { knex as knexSetup, Knex } from 'knex'

const config: Knex.Config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = knexSetup(config)
