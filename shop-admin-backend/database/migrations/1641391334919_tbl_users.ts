import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'tbl_users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary()
      table.string("name").unique().notNullable()
      table.string("email").unique().notNullable()
      table.string("password").notNullable()
      table.string('remember_me_token').nullable()
      table.boolean('is_admin').defaultTo(false).notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
