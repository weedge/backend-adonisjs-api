import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ShopItem from 'App/Models/ShopItem';

export default class ShopItemsController {
    public async list(ctx: HttpContextContract) {

        return "get shopItem list"
    }

    public async info(ctx: HttpContextContract) {

        return "get shopItem info"
    }

    public async search(ctx: HttpContextContract) {

        return "search keyword"
    }
}
