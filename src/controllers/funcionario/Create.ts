import { Request, Response } from "express";
import { IFuncionario } from "../../server/database/models/Funcionario";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { FuncionarioProvider } from "../../server/database/providers/funcionario";
import { StatusCodes } from "http-status-codes";

export const createValidation = validation((getSchema) => ({
  body: getSchema<Omit<IFuncionario, "id_funcionario">>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      bio: yup.string().required().min(10),
      id_cargo: yup.number().required().integer().positive(),
      id_departamento: yup.number().required().integer().positive(),
    })
  ),
}));

export const create = async (
  req: Request<{}, {}, Omit<IFuncionario, "id_funcionario">>,
  res: Response
) => {
  const result = await FuncionarioProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).send(result);
};
