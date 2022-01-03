import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUser from 'App/Validators/CreateUserValidator'
//import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class AuthController {
    public async login({ request, auth }: HttpContextContract) {
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.use('api').attempt(email, password, {
            expiresIn: '10 days',
        })
        const token1 = token.toJSON().token
        const user = await User.query().where('email', email).first()
        // console.log(user)
        return {
            user,
            token: token1,
        }
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.logout()
        return response.status(200)
    }

    public async register({ request, auth }: HttpContextContract) {
        /*
        const validationSchema = schema.create({
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({ table: "users", column: "email" }),
            ]),
            password: schema.string({ trim: true }, [rules.confirmed()]),
            name: schema.string({ trim: true }, []),
        });

        const userDetails = await request.validate({
            schema: validationSchema,
        });
        */

        const userDetails = await request.validate(CreateUser)

        const email = userDetails.email
        const password = userDetails.password
        const name = userDetails.name
        const user = new User()
        user.email = email
        user.password = password
        user.name = name
        await user.save()
        const token = await auth.use('api').login(user, {
            expiresIn: '10 days',
        })
        return token.toJSON()
    }
}
