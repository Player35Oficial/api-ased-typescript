import { Request, Response } from "express";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { FuncionarioProvider } from "../../server/database/providers/funcionario";
import { StatusCodes } from "http-status-codes";

interface IParamProps {
  id_funcionario: number;
}

export const getByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_funcionario: yup.number().required().integer().moreThan(0),
    })
  ),
}));

export const getById = async (req: Request<IParamProps>, res: Response) => {
  const result = await FuncionarioProvider.getById(req.params.id_funcionario);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
