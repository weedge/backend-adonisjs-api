import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import ShopItem from './ShopItem'

export default class UserItem extends BaseModel {
  public static table = 'tbl_user_items'

  @column({ isPrimary: true })
  public id: number

  @column({ columnName: "user_id" })
  //public user_id: number
  public userId: number

  @column({ columnName: "item_id" })
  //public item_id: number
  public shopItemId: number
  //public tblShopItemId: number

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
