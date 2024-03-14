import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { DepartamentosController } from "../../controllers";

const router = Router();

router.post("/departamento", DepartamentosController.create);

router.get("/teste", (req, res) => {
  console.log(req.body);

  return res.send("olá, Dev!").status(StatusCodes.OK);
});

export { router };
