import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IDepartamento, IGetDepartamento } from "../../server/database/models";
import { validation } from "../../shared/middlewares";
import * as yup from "yup";
import { DepartamentosProvider } from "../../server/database/providers/departamento";
import { EStatus } from "../../server/database/EStatus";

interface IParamProps {
  id_departamento?: number;
}

interface IBodyProps extends Omit<IDepartamento, "nome" | "descricao"> {}

export const updateStatusByIdValidation = validation((getSchema) => ({
  params: getSchema<IParamProps>(
    yup.object().shape({
      id_departamento: yup.number().integer().moreThan(0).required(),
    })
  ),
  body: getSchema<IBodyProps>(
    yup.object().shape({
      status: yup.mixed<EStatus>().oneOf(Object.values(EStatus)).required(),
    })
  ),
}));

export const updateStatusById = async (
  req: Request<IParamProps, {}, IGetDepartamento>,
  res: Response
) => {
  if (!req.params.id_departamento) {
    return res.sendStatus(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "O parâmetro 'id_departamento' precisa ser informado",
      },
    });
  }

  const result = await DepartamentosProvider.updateById(
    req.params.id_departamento,
    req.body
  );

  if (result instanceof Error) {
    return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else {
    return res.sendStatus(StatusCodes.OK).send(result);
  }
};
