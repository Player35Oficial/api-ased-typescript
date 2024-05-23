import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const createEventoWithFuncionario = async (
  evento: Omit<IEvento, "id_evento">,
  funcionarioIds: number[]
): Promise<number | Error> => {
  try {
    // const [result] = await Knex(ETableNames.evento)
    //   .insert(evento)
    //   .returning("id_evento");
    // if (typeof result === "object") {
    //   return result.id;
    // } else if (typeof result === "number") {
    //   return result;
    // }
    const res = await Knex.transaction(async (trx) => {
      const [id_evento] = await trx(ETableNames.evento).insert(evento);

      const associatedFuncionarios = funcionarioIds.map((id_funcionario) => {
        id_evento;
        id_funcionario;
      });

      const created_event_with_success: number = await trx(
        ETableNames.evento_funcionario
      )
        .insert(associatedFuncionarios)
        .returning("id_evento");

      return created_event_with_success;
    });
    return res;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar registro");
  }
};
