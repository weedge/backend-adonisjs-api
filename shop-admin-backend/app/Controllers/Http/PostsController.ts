import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PostsController {
    // get /posts
    public async index(ctx: HttpContextContract) {
        return "index"
    }

    // get /posts/create
    public async create(ctx: HttpContextContract) {
        return "create"
    }

    // post /posts
    public async store(ctx: HttpContextContract) {
        return "store"
    }

    // get /posts/:id
    public async show(ctx: HttpContextContract) {
        return "show"
    }

    // get /posts/:id/edit
    public async edit(ctx: HttpContextContract) {
        return "edit"
    }

    // put /posts/:id
    public async update(ctx: HttpContextContract) {
        return "update"
    }

    // delete /posts/:id
    public async destroy(ctx: HttpContextContract) {
        return "destroy"
    }


}
