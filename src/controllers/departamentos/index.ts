import * as create from "./Create";
import * as deleteById from "./deleteById";
import * as getAll from "./GetAll";
import * as updateById from "./updateById";
import * as getById from "./GetById";
import * as updateStatusById from "./updateStatusById";

export const DepartamentosController = {
  ...create,
  ...deleteById,
  ...getAll,
  ...updateById,
  ...getById,
  ...updateStatusById,
};
