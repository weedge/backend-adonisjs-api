import User from "App/Models/User";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Event from '@ioc:Adonis/Core/Event'
import Logger from '@ioc:Adonis/Core/Logger'

export default class AuthController {
    public async register({ request, auth, response }: HttpContextContract) {
        /**
         * Validate user details
         */
        const validationSchema = schema.create({
            email: schema.string({ trim: true }, [
                rules.email(),
                rules.unique({ table: "tbl_users", column: "email" }),
            ]),
            password: schema.string({ trim: true }, [rules.confirmed()]),
        });

        const userDetails = await request.validate({
            schema: validationSchema,
        });

        /**
         * Create a new user
         */
        const user = new User();
        user.email = userDetails.email;
        user.name = request.input('name');
        user.password = userDetails.password;
        await user.save();

        // event on new user in start events.js to register
        Event.emit('new:user', user)

        await auth.login(user);
        response.redirect("/shopadmin/v1/home");
    }

    public async login({ auth, request, response }: HttpContextContract) {
        const email = request.input("email");
        const password = request.input("password");
        await auth.attempt(email, password);

        response.redirect("/shopadmin/v1/home");
    }

    public async logout({ auth, response }: HttpContextContract) {
        await auth.use('web').logout()
        response.redirect("/login");
    }
}
