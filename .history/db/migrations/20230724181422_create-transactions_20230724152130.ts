import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('transactions',(table)=>{
        table.uuid('id').primary(),
        
    })
}

export async function down(knex: Knex): Promise<void> {}
