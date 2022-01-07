## Getting started

```bash
npm install
```

Duplicate `.env.dev`:

```bash
cp env.dev .env
```

Generate `APP_KEY`:

```bash
node ace generate:key
```

> This will output a random string, which you will need to add inside `.env`.

Update environment variables:

```txt
// .env

APP_KEY=YOUR_GENERATED_KEY_COPIED_FROM_ABOVE
DB_CONNECTION=mysql
MYSQL_HOST=127.0.0.1
MYSQL_USER=YOUR_DATABASE_USERNAME
MYSQL_PASSWORD=YOUR_DATABASE_PASSWORD
MYSQL_DB_NAME=USE_DATABASE
```

> Remember to update `YOUR_DATABASE_USERNAME` and `YOUR_DATABASE_PASSWORD` with your database details.

Run the migrations:

```bash
node ace migration:run
```

Finally, start the application:

```bash
node ace serve --watch
```

and visit [http://0.0.0.0:2022](http://0.0.0.0:2022) to see the application in action.

