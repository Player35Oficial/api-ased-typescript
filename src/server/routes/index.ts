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
router.delete(
  "/departamento/:id_departamento",
  DepartamentosController.deleteByIdValidation,
  DepartamentosController.deleteById
);
router.get(
  "/departamento/:id_departamento",
  DepartamentosController.getByIdValidation,
  DepartamentosController.getById
);
router.put(
  "/departamento/:id_departamento",
  DepartamentosController.updateByIdValidation,
  DepartamentosController.updateById
);

export { router };
