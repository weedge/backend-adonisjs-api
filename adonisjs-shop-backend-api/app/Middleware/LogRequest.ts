import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Logger from '@ioc:Adonis/Core/Logger'

export default class LogRequest {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    Logger.info("request_id:%s request_headers:%o uri:%s params:%o query:%o body:%o",
      ctx.request.id(), ctx.request.headers(), ctx.request.url(), ctx.request.params(), ctx.request.qs(), ctx.request.body())
    //ctx.logger.info("log middleware uri:%s params:%o query:%o body:%o", ctx.request.url(), ctx.request.params(), ctx.request.qs(), ctx.request.body())
    await next()
    Logger.info("request_id:%s response.headers:%o reponse.status:%s response.Body:%o",
      ctx.request.id(), ctx.response.getHeaders(), ctx.response.getStatus(), ctx.response.getBody())
  }
}
