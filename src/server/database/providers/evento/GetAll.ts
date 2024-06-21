import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IEvento } from "../../models/Evento";

export const getAll = async (): Promise<IEvento[] | Error> => {
  try {
    const result = await Knex(ETableNames.evento).select("*");

    if (result instanceof Error) {
      return new Error("Erro ao recuperar registros");
    } else {
      return result;
    }
  } catch (error) {
    console.log(error);
    return new Error("Não foi possível resgatar os registros!");
  }
};
