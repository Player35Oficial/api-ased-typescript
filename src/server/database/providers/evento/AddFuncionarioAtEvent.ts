import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

export const addFuncionario = async (
  id_evento: number,
  funcionarioIds: number[]
) => {
  funcionarioIds.forEach(async (funcionarioId) => {
    await Knex(ETableNames.evento_funcionario).insert({
      id_evento,
      id_funcionario: funcionarioId,
    });
  });
};
