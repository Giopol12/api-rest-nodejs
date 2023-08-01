export function transactions(app) {
  app.get('/hello', async () => {
    const transactions = await knex('transactions').select('*')
    return transactions
  })
}
