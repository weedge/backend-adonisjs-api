import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from "./User"
import UserOrder from './UserOrder'

export default class ShopItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public desc: string

  @column()
  public price: number

  @column()
  public stock: number

  @column()
  public sell_cn: number

  @column()
  public is_released: boolean

  @column()
  public is_soldout: boolean

  @column()
  public is_del: boolean

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => UserOrder)
  public userOrders: HasMany<typeof UserOrder>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
