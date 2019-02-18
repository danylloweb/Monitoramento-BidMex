'use strict'

const Schema = use('Schema')

class AirportSchema extends Schema {
  up () {
    this.create('airports', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('airports')
  }
}

module.exports = AirportSchema
