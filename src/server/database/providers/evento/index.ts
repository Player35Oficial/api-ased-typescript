// import * as create from "./Create";
import * as createEventoAndAddFuncionario from "./CreateEventoWithFuncionario";
// import * as deleteEventoWithFuncionario from "./DeleteEventoWithFuncionario";
import * as deleteById from "./DeleteById";
import * as getAll from "./GetAll";
import * as updateById from "./UpdateById";
import * as getById from "./GetById";

export const EventosProvider = {
  // ...create,
  ...deleteById,
  ...getAll,
  ...updateById,
  ...getById,
  ...createEventoAndAddFuncionario,
  // ...deleteEventoWithFuncionario,
};
