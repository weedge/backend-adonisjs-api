import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopItem from 'App/Models/ShopItem';

export default class ShopItemsController {
    public async list(ctx: HttpContextContract) {
        //@TODO page
        const items = await ShopItem.query()
            .select('id', 'name', 'desc', 'price', 'created_at')
            .where((query) => {
                query.where("is_del", 0)
                    .where("is_soldout", 0)
                    .where("is_released", 1)
            }).orderBy('id', 'desc')

        return items
    }

    public async info(ctx: HttpContextContract) {
        //@TODO cache detail info
        const item = await ShopItem.find(ctx.params.id)
        return item
    }

    public async search(ctx: HttpContextContract) {
        //@TODO: get item id from ES, then get info from db
        const q = ctx.request.input('q')
        const items = await ShopItem.query()
            .select('id', 'name', 'desc', 'price')
            .where((query) => {
                query.where("is_del", 0)
                    .where("is_soldout", 0)
                    .where("is_released", 1)
                    .where('name', 'like', "%" + q + "%")
            }).orderBy('id', 'desc')

        return items
    }
}
