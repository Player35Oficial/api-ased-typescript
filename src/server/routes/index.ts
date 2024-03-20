import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { DepartamentosController } from "../../controllers";

const router = Router();

router.get("/", (req, res) => {
  console.log(req.body);

  return res.send("olá, Dev!").status(StatusCodes.OK);
});

router.post(
  "/departamento",
  DepartamentosController.createValidation,
  DepartamentosController.create
);

router.get("/departamento", DepartamentosController.getAll);

export { router };
