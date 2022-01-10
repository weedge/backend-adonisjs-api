import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ShopItem from './ShopItem'

export default class UserOrder extends BaseModel {
  public static table = 'tbl_user_orders'

  @column({ isPrimary: true, columnName: "order_id" })
  public orderId: number

  @column({ columnName: "user_id" })
  public userId: number

  @column({ columnName: "item_id" })
  public itemId: number

  @column()
  public ext: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => ShopItem)
  public shopItem: BelongsTo<typeof ShopItem>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
