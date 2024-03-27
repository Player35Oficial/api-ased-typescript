import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.evento, (table) => {
      table
        .bigIncrements("id_evento")
        .primary({ constraintName: "PK_EVENTO" })
        .index();
      table.string("titulo", 60).notNullable().index();
      table.string("descricao", 255).notNullable();
      table.timestamp("data_inicio", { useTz: true }).notNullable();
      table.timestamp("data_fim", { useTz: true }).notNullable();
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.evento}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.evento);
}
