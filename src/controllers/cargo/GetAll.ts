import { Request, Response } from "express";
import { CargoProvider } from "../../server/database/providers/cargo";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
  const result = await CargoProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
