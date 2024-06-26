import { Request, Response } from "express";
import { EventosProvider } from "../../server/database/providers/evento";
import { StatusCodes } from "http-status-codes";

export const getAll = async (req: Request, res: Response) => {
  const result = await EventosProvider.getAll();

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: { default: result.message },
    });
  }

  return res.status(StatusCodes.OK).send(result);
};
