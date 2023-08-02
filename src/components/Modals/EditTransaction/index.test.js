import EditTransaction from ".";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Context from "../../../context";

const setIsEditModalOpen = jest.fn();
const handleEditTransaction = jest.fn();

const contextValue = {
  title: "Um título qualquer",
  value: "10",
  type: "Entrada",
  category: "Alimentação",
  setIsEditModalOpen,
  handleEditTransaction,
};

const EditTransactionWrapper = () => (
  <Context.Provider value={contextValue}>
    <EditTransaction />
  </Context.Provider>
);

it("should render title and text correctly", () => {
  render(EditTransactionWrapper());
  const title = screen.getByRole("heading", {
    level: 2,
    name: "Editar transação",
  });

  const text = screen.getByText(
    "Edite facilmente sua transação preenchendo os campos abaixo."
  );

  expect(title).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

it("should render inputs filled correctly", () => {
  render(EditTransactionWrapper());
  const titleInput = screen.getByRole("textbox", {
    name: "Título",
  });
  const valueInput = screen.getByRole("textbox", {
    name: "Valor",
  });
  const typeInput = screen.getByRole("button", {
    name: "Tipo Entrada",
  });
  const categoryInput = screen.getByRole("button", {
    name: "Categoria Alimentação",
  });

  expect(titleInput).toHaveValue("Um título qualquer");
  expect(valueInput).toHaveValue("10");

  expect(typeInput).toBeInTheDocument();
  expect(categoryInput).toBeInTheDocument();
});

it("should call function from context on cancel button click", () => {
  render(EditTransactionWrapper());
  const cancelButton = screen.getByRole("button", {
    name: "Cancelar",
  });

  fireEvent.click(cancelButton);
  expect(setIsEditModalOpen).toHaveBeenCalledTimes(1);
});

it("should call function from context on ok button click", async () => {
  render(EditTransactionWrapper());

  const okButton = screen.getByRole("button", {
    name: "Ok",
  });

  fireEvent.click(okButton);
  await waitFor(() => {
    expect(handleEditTransaction).toHaveBeenCalled();
  });
});
