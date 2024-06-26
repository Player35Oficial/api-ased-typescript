import { testServer } from "../jest.setup";

describe("Departamento - Create", () => {
  it("Cria registro", async () => {
    const res = await testServer.post("/departamento").send({
      nome: "Biblioteca",
      descricao: "Setor responsável por lidar com os livros",
      status: "Disponível",
    });

    expect(res.status).toBe(201);
  });
});
