import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";
import { addFuncionario } from "./AddFuncionarioAtEvent";

interface result {
  id_evento: number;
}

export const createEventoWithFuncionario = async (
  evento: Omit<IEvento, "id_evento">,
  funcionarioIds: number[]
): Promise<number | Error> => {
  try {
    // Criar evento
    const [result]: result[] = await Knex(ETableNames.evento)
      .insert(evento)
      .returning("id_evento");

    addFuncionario(result.id_evento, funcionarioIds);

    if (typeof result === "undefined") {
      return new Error("Erro desconhecido");
    } else {
      return result.id_evento;
    }
  } catch (error) {
    console.error("Erro ao criar registro", error);
    return new Error("Erro ao criar registro");
  }
};
