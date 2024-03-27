import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { DepartamentosProvider } from "../../server/database/provider/departamento";

export const getAll = async (req: Request<{}, {}, {}, {}>, res: Response) => {
  const result = await DepartamentosProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
