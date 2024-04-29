import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICargo } from "../../models/Cargo";

export const create = async (
  cargo: Omit<ICargo, "id_cargo">
): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.cargo)
      .insert(cargo)
      .returning("id_cargo");
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
