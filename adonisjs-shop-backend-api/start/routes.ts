/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/meta', async () => {
  return {
    appName: 'shop',
    version: '0.0.1',
  }
})

// middleware
// https://docs.adonisjs.com/guides/middleware
Route.get('/users/:id', async () => {
  return { data: 'hi, middleware' }
}).middleware(async (ctx, next) => {
  console.log(`Inside middleware ${ctx.request.url()}`)
  await next()
})

//test pino logger
//https://docs.adonisjs.com/guides/logger
Route.post('/logger/:action/:id/', ({ request, logger }) => {
  console.log(request.all(), request.id())
  logger.info("uri:%s params:%o query:%o body:%o",
    request.url(), request.params(), request.qs(), request.body())
  logger.error("uri:%s params:%o query:%o body:%o",
    request.url(), request.params(), request.qs(), request.body())
  logger.debug("uri:%s params:%o query:%o body:%o",
    request.url(), request.params(), request.qs(), request.body())
  logger.trace("uri:%s params:%o query:%o body:%o",
    request.url(), request.params(), request.qs(), request.body())
  logger.fatal("uri:%s params:%o query:%o body:%o",
    request.url(), request.params(), request.qs(), request.body())

  return { data: 'hi, log' }
})

// check env, appKey, db connection
//https://docs.adonisjs.com/guides/health-check
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.post("register", "AuthController.register").as("register");
  Route.post("login", "AuthController.login").as("login");
  Route.post("logout", "AuthController.logout").as("logout");
}).prefix("/api/v1/auth")

// /shop/api/v1
Route.group(() => {
  Route.get("/items", "ShopItemsController.list").as("list")
  Route.get("/items/search", "ShopItemsController.search").as("search")
  Route.get("/items/:id", "ShopItemsController.info").as("info")

  Route.group(() => {
    Route.post("/order", "UserOrdersController.order").as("order")
    Route.get("/orders/:orderId", "UserOrdersController.info").as("orderInfo")
    Route.get("/users/:uid/orders", "UserOrdersController.list").as("userOrders")
  }).middleware("auth:api")
}).prefix("/shop/api/v1")
  .middleware("userActionLog")
