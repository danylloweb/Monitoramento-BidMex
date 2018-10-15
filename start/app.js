'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  'adonis-lucid-mongodb/providers/DatabaseProvider',
  'adonis-lucid-mongodb/providers/LucidMongoProvider',
  'adonis-lucid-mongodb/providers/FactoryProvider'
]

/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  'adonis-lucid-mongodb/providers/CommandsProvider',
  'adonis-lucid-mongodb/providers/MigrationsProvider',
  'adonis-lucid-mongodb/providers/SchemaProvider',
  'adonis-lucid-mongodb/providers/SeederProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  Database: 'Adonis/Src/Database',
  Lucid: 'Adonis/Src/LucidMongo',
  Schema: 'Adonis/Src/Schema',
  Migrations: 'Adonis/Src/Migrations',
  Factory: 'Adonis/Src/Factory'
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
