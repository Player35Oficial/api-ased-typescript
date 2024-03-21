import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("cargo", (table) => {
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
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists("cargo");
}
