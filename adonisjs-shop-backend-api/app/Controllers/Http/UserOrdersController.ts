import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserOrdersController {
    public async order(ctx: HttpContextContract) {

        return "user order shopItem"
    }

    public async info(ctx: HttpContextContract) {

        return "get order info"
    }

    public async list(ctx: HttpContextContract) {

        return "get order list"
    }
}
