/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Event from '@ioc:Adonis/Core/Event'
import Database from '@ioc:Adonis/Lucid/Database'
import Logger from '@ioc:Adonis/Core/Logger'
import Application from '@ioc:Adonis/Core/Application'



Event.on('new:user', (user) => {
    console.log(user)
    //@TODO: send email
})

//Event.on('db:query', Database.prettyPrint)

//Event.on('db:query', function ({ sql, bindings }) { console.log(sql, bindings) })

Event.on('db:query', (query) => {
    if (Application.inProduction) {
        Logger.info("%s", query.sql)
    } else {
        Database.prettyPrint(query)
    }
})

