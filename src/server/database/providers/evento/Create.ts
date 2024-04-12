import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const create = async (evento: IEvento): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.evento)
      .insert(evento)
      .returning("id_evento");
    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "number") {
      return result;
    }

    return new Error("Erro ao criar registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar registro");
  }
};
