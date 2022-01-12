import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblUserOrders extends BaseSchema {
  protected tableName = 'tbl_user_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('order_id').primary()
      table.integer('pay_amount', 20).unsigned().defaultTo("0").notNullable()
      table.integer('user_id', 20).unsigned().notNullable().index()
      table.integer('item_id', 20).unsigned().notNullable()
      table.string('ext', 10240).defaultTo("").notNullable()

      table.timestamps(true)
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['item_id', 'user_id'], 'idx_sid_uid')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
