import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IFuncionario } from "../../models/Funcionario";

export const getAll = async (): Promise<IFuncionario[] | Error> => {
  try {
    const [result]: IFuncionario[] = await Knex(ETableNames.funcionario).select(
      "*"
    );

    if (result instanceof Error) {
      return new Error("Erro ao recuperar registros");
    } else {
      return [result];
    }
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar Registros");
  }
};
