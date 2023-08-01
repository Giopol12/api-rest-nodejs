// eslint-disable-next-line
import { Knex } from "knex";

declare module 'knex/types/tables' {
  export interface Tables {
    transactions: {
      title: string
      id: string
      session_id: string
      created_at: string
      amount: number
    }
  }
}
