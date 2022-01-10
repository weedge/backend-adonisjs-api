import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, } from '@ioc:Adonis/Lucid/Orm'
import UserOrder from './UserOrder'

//https://docs.adonisjs.com/reference/orm/base-model
export default class ShopItem extends BaseModel {
  public static table = 'tbl_shop_items'

  //https://docs.adonisjs.com/reference/orm/decorators#column
  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "owner_id" })
  public ownerId: number

  @column()
  public name: string

  @column()
  public desc: string

  @column()
  public price: number

  @column()
  public stock: number

  @column({ columnName: "sell_cn" })
  public sellCn: number

  @column({ columnName: "is_soldout" })
  public isSoldout: boolean

  @column({ columnName: "is_released" })
  public isReleased: boolean

  @column({ columnName: "is_del" })
  public isDel: boolean

  @column()
  public ext: string

  @hasMany(() => UserOrder)
  public userOrders: HasMany<typeof UserOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
