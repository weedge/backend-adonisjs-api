/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import { string } from '@ioc:Adonis/Core/Helpers'
import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('camelCase', (value, _, options) => {
    if (typeof value !== 'string') {
        return
    }

    if (value !== string.camelCase(value)) {
        options.errorReporter.report(
            options.pointer,
            'camelCase',
            'camelCase validation failed',
            options.arrayExpressionPointer
        )
    }
})

validator.rule('priceCase', (
    value,
    [maxPrice],
    options
) => {
    if (typeof value !== 'number') {
        return
    }
    // Rest of the validation
    if (maxPrice && value > maxPrice) {
        options.errorReporter.report(
            options.pointer,
            'priceCase.maxPrice', // 👈 Keep an eye on this
            'priceCase.maxPrice validation failed',
            options.arrayExpressionPointer,
            { maxPrice }
        )
    }
})

