import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblShopItems extends BaseSchema {
  protected tableName = 'tbl_shop_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 32).notNullable()
      table.string('desc', 1024).notNullable()
      table.integer('price', 10).unsigned().notNullable()
      table.integer('stock', 10).unsigned().notNullable()
      table.integer('sell_cn', 10).unsigned().notNullable()
      table.boolean('is_released').defaultTo(0).notNullable()
      table.boolean('is_soldout').defaultTo(0).notNullable()
      table.boolean('is_del').defaultTo(0).notNullable()
      table.string('ext', 10240).notNullable()

      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
