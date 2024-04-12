import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const createEventoWithFuncionario = async (
  id_evento: number
): Promise<void | Error> => {
  try {
    const res = await Knex.transaction(async (trx) => {
      await trx(ETableNames.evento_funcionario)
        .where("id_evento", id_evento)
        .del();
      await trx(ETableNames.evento).where("id_evento").del();
    });
    return res;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao excluir registro");
  }
};
