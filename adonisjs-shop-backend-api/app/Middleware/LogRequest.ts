import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    Logger.info("request_id:%s uri:%s params:%o query:%o body:%o",
      ctx.request.id(), ctx.request.url(), ctx.request.params(), ctx.request.qs(), ctx.request.body())
    //ctx.logger.info("log middleware uri:%s params:%o query:%o body:%o", ctx.request.url(), ctx.request.params(), ctx.request.qs(), ctx.request.body())
    await next()
  }
}
