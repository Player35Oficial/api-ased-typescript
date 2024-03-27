import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.evento_funcionario, (table) => {
      //COLUMNS
      table.bigInteger("id_funcionario").notNullable();
      table.bigInteger("id_evento").notNullable();

      // CONSTRAINTS
      table.foreign("id_funcionario").references("funcionario.id_funcionario");
      table.foreign("id_evento").references("evento.id_evento");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.evento_funcionario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.evento_funcionario);
}
