import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TblUserItems extends BaseSchema {
  protected tableName = 'tbl_user_items'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id', 20).unsigned().notNullable()
      table.integer('item_id', 20).unsigned().notNullable()
      table.string('ext', 10240).defaultTo("").notNullable()
      table.timestamps(true)
    })
    this.schema.alterTable(this.tableName, (table) => {
      table.index(['user_id', 'item_id'], 'idx_uid_sid')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
