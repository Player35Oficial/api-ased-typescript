import { Request, Response } from "express";
import { ICargo } from "../../server/database/models/Cargo";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { CargoProvider } from "../../server/database/providers/cargo";
import { StatusCodes } from "http-status-codes";

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<ICargo, "id_cargo">>(
    yup.object().shape({
      nome: yup.string().required(),
      descricao: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, Omit<ICargo, "id_cargo">>,
  res: Response
) => {
  const result = await CargoProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).send(result);
};
