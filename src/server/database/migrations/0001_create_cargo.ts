import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.cargo, (table) => {
      table
        .bigIncrements("id_cargo")
        .primary({ constraintName: "PK_CARGO" })
        .index()
        .notNullable();
      table
        .string("nome", 120)
        .unique({
          indexName: "UN_CARGO_CONSTRAINT",
        })
        .notNullable();
      table.string("descricao", 255).notNullable();
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.cargo}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.cargo);
}
