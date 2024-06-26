import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const updateById = async (
  id_evento: number,
  evento: Omit<IEvento, "id_evento">
) => {
  try {
    const result = Knex(ETableNames.evento)
      .update(evento)
      .where("id_evento", "=", id_evento);

    if (!result) return new Error("Registro não encontrado!");

    return result;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar registro");
  }
};
