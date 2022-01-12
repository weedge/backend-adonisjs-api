import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserOrder from 'App/Models/UserOrder'
import Event from '@ioc:Adonis/Core/Event'
import ShopItem from 'App/Models/ShopItem'
import User from 'App/Models/User'

export default class UserOrdersController {
    public async order(ctx: HttpContextContract) {
        const user = await ctx.auth.authenticate()
        const order = new UserOrder()
        order.itemId = parseInt(ctx.request.input('itemId'))
        order.ext = "new shop item_id:" + order.itemId
        //order.userId = ctx.request.input('userId')
        order.userId = user.id
        await order.save()

        Event.emit('new:order', order)

        return order
    }

    public async info(ctx: HttpContextContract) {
        //@TODO cache detail info
        //const user = await ctx.auth.authenticate()
        const order = await UserOrder.find(ctx.params.orderId)
        let item: any
        if (order) {
            item = await ShopItem.find(order.itemId)
        }

        return { order, item }
    }

    public async list(ctx: HttpContextContract) {
        const user = await ctx.auth.authenticate()
        // if (ctx.params.uid != user.id) {
        // return ctx.response.status(520).json({ "error":"not self"})
        // }
        //@TODO page
        const orders = await UserOrder.query()
            .select('*')
            .where((query) => {
                //query.where("user_id", ctx.params.uid)
                query.where("user_id", user.id)
            }).orderBy('order_id', 'desc')

        let itemIds = Array()
        orders.forEach(element => {
            itemIds.push(element.itemId)
        });
        const items = await ShopItem.findMany(itemIds)
        let itemMap = new Map()
        items.forEach(element => {
            itemMap[element.id] = element
        });

        return { orders, itemMap }
    }
}
