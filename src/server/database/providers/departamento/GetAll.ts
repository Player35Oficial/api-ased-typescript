import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IGetDepartamento } from "../../models";

export const getAll = async (): Promise<IGetDepartamento[] | Error> => {
  try {
    const result: IGetDepartamento[] = await Knex(
      ETableNames.departamento
    ).select("*");

    if (result instanceof Error) {
      return new Error("Erro ao recuperar registro");
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};
