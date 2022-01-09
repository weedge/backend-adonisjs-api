import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class UserActionLog {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // @TODO: add pb log
    Logger.info("user_action request_id:%s request_headers:%o uri:%s params:%o query:%o body:%o",
      ctx.request.id(), ctx.request.headers(), ctx.request.url(), ctx.request.params(), ctx.request.qs(), ctx.request.body())

    await next()
  }
}
