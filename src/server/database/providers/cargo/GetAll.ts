import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICargo } from "../../models/Cargo";

export const getAll = async (): Promise<ICargo[] | Error> => {
  try {
    const [result]: ICargo[] = await Knex(ETableNames.cargo).select("*");

    if (result instanceof Error) {
      return new Error("Erro ao recuperar registros");
    } else {
      return [result];
    }
  } catch (error) {
    console.log(error);
    return new Error("Erro ao recuperar registro");
  }
};
