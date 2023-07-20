import { knex as knexSetup, Knex } from 'knex'

const config = {
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}

export const knex = knexSetup()
