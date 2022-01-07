import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from "@ioc:Adonis/Core/Validator";
//import Database from '@ioc:Adonis/Lucid/Database';
import ShopItem from 'App/Models/ShopItem';
//import Users from 'App/Models/User';
import UserItem from 'App/Models/UserItem';
import Logger from '@ioc:Adonis/Core/Logger'

export default class ShopItemsController {
    // get /items
    public async index(ctx: HttpContextContract) {
        const items = await ShopItem.query().preload('owner');
        //console.log(items)

        return ctx.view.render('home', { items })
    }

    // get /items/create
    public async create(ctx: HttpContextContract) {
        return ctx.view.render('add')
    }

    // post /items （don't think cooperative）
    // https://docs.adonisjs.com/reference/database/insert-query-builder
    public async store(ctx: HttpContextContract) {
        const validationSchema = schema.create({
            name: schema.string({ trim: true }, [
                rules.alpha(),
                rules.maxLength(32),
            ]),
            desc: schema.string({ trim: true }, [
                rules.alpha(),
                rules.maxLength(1024),
            ]),
            price: schema.number([]),
            stock: schema.number([]),
        });

        const itemDetail = await ctx.request.validate({
            schema: validationSchema,
        });

        const user = await ctx.auth.authenticate()
        const item = new ShopItem()
        item.name = itemDetail.name
        item.desc = itemDetail.desc
        item.price = itemDetail.price
        item.stock = itemDetail.stock
        await user.related('shopItems').save(item)
        //item.userId = user.id
        //await item.save()

        const uItem = new UserItem()
        uItem.userId = user.id
        uItem.shopItemId = item.id
        uItem.ext = "insert op userId:" + user.id + " shopItemId:" + item.id
        await uItem.save()

        //console.log(item.id, uItem.id)

        ctx.response.redirect('/shopadmin/v1/items/' + item.id)
    }

    // get /items/:id
    public async show(ctx: HttpContextContract) {
        try {
            const item = await ShopItem.find(ctx.params.id)
            //console.log(item)
            return ctx.view.render('show', { item })
        } catch (error) {
            Logger.error("%o", error)
        }
    }

    // get /items/:id/edit
    public async edit(ctx: HttpContextContract) {
        const item = await ShopItem.find(ctx.params.id)
        return ctx.view.render('edit', { item })
    }

    // post /items/:id
    public async post(ctx: HttpContextContract) {
        switch (ctx.request.input('_method')) {
            case 'DELETE':
                return this.destroy(ctx)
            case 'PUT':
                return this.update(ctx)
            default:
                Logger.warn("un support method:%s", ctx.request.input('_method'))
        }
        ctx.response.redirect('/shopadmin/v1/home')
    }

    // put /items/:id
    public async update(ctx: HttpContextContract) {
        const item = await ShopItem.find(ctx.params.id)

        if (item) {
            item.name = ctx.request.input('name')
            item.desc = ctx.request.input('desc')
            item.price = ctx.request.input('price')
            item.stock = ctx.request.input('stock')
            item.isReleased = ctx.request.input('isReleased')
            if (await item.save()) {
                const user = await ctx.auth.authenticate()
                const uItem = new UserItem()
                uItem.userId = user.id
                uItem.shopItemId = item.id
                uItem.ext = "update op userId:" + user.id + " shopItemId:" + item.id
                //uItem.save()
                await uItem.save()
                return ctx.view.render('show', { item })
            }
            return // 422
        }

        return // 401
    }

    // delete /items/:id
    public async destroy(ctx: HttpContextContract) {
        const user = await ctx.auth.authenticate()
        if (user.isAdmin) {
            await ShopItem.query().where('id', ctx.params.id).delete()
            return ctx.response.redirect('/home')
        }

        ctx.response.redirect('/shopadmin/v1/home')
    }

    //==== other controller method to op resource====

    public async byUid(ctx: HttpContextContract) {
        const user = await ctx.auth.authenticate()
        const items = await ShopItem.query()
            //.select('id', 'name', 'desc')
            .select('*')
            .where('owner_id', user.id).orderBy('id', 'desc')

        /*
        const uItem = await UserItem.query().where('user_id', '=', user.id)
        console.log(uItem)
        let itemIds = Array()
        uItem.forEach(element => {
            itemIds.push(element.shopItemId)
        });
        const items = await ShopItem.findMany(itemIds)
        */

        return ctx.view.render('home', { items })
    }
}
