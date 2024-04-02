import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const getById = async (id_evento: number): Promise<IEvento | Error> => {
  try {
    const result = await Knex(ETableNames.evento)
      .select("*")
      .where("id_evento", "=", id_evento)
      .first();

    if (result) return result;

    return new Error("Registro não encontrado!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};
