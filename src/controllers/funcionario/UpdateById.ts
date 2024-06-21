import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { IFuncionario } from "../../server/database/models/Funcionario";
import { FuncionarioProvider } from "../../server/database/providers/funcionario";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id_funcionario?: number;
}

export const updateByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_funcionario: yup.number().required().integer().positive(),
    })
  ),
  body: getSchema<Omit<IFuncionario, "id_funcionario">>(
    yup.object().shape({
      nome: yup.string().required().min(3),
      bio: yup.string().required().min(10),
      id_cargo: yup.number().required().integer().positive(),
      id_departamento: yup.number().required().integer().positive(),
    })
  ),
}));

export const updateById = async (
  req: Request<IParamProps, {}, Omit<IFuncionario, "id_funcionario">>,
  res: Response
) => {
  if (!req.params.id_funcionario) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: { default: "O parâmetro 'id_funcionario' é obrigatório" },
    });
  }

  const result = await FuncionarioProvider.updateById(
    req.params.id_funcionario,
    req.body
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
