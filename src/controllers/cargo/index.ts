import * as create from "./Create";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as updateById from "./updateById";
import * as getById from "./GetById";

export const CargoController = {
  ...create,
  ...deleteById,
  ...getAll,
  ...updateById,
  ...getById,
};
