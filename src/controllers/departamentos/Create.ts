import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IDepartamento } from "../../database/models";

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
  console.log(req.body);
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Não implementado!");
};
