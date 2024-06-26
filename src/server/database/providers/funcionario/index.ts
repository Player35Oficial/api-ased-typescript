import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";
import * as getById from "./GetById";

export const FuncionarioProvider = {
  ...create,
  ...deleteById,
  ...getAll,
  ...updateById,
  ...getById,
};
