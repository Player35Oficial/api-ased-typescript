import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IDepartamento } from "../../server/database/models";
import { DepartamentosProvider } from "../../server/database/provider/departamento";

export const createValidation = validation((getSchema) => ({
  body: getSchema<IDepartamento>(
    yup.object().shape({
      nome: yup.string().required(),
      descricao: yup.string().required(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, IDepartamento>,
  res: Response
) => {
  const result = await DepartamentosProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).send(result);
};
