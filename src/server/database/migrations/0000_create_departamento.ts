import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.departamento, (table) => {
      table
        .bigIncrements("id_departamento")
        .primary({ constraintName: "PK_DEPARTAMENTO" })
        .index();
      table.string("nome", 120).index().notNullable();
      table.string("descricao", 255).notNullable();
      table
        .enum("status", [
          "Disponível",
          "Ocupado",
          "Em reunião",
          "Ausente",
          "Em Atendimento",
        ])
        .notNullable()
        .defaultTo("Disponível");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.departamento}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.departamento);
}
