import DeleteTransaction from ".";
import { fireEvent, render, screen } from "@testing-library/react";
import Context from "../../../context";

const setIsDeleteModalOpen = jest.fn();
const handleDeleteTransaction = jest.fn();

const contextValue = {
  setIsDeleteModalOpen,
  handleDeleteTransaction,
};

it("should render title and text correctly", () => {
  render(<DeleteTransaction />);
  const title = screen.getByRole("heading", {
    level: 2,
    name: "Excluir transação",
  });

  const text = screen.getByText(
    "Tem certeza que deseja excluir esta transação?"
  );

  expect(title).toBeInTheDocument();
  expect(text).toBeInTheDocument();
});

it("should render cancel and delete buttons correctly", () => {
  render(<DeleteTransaction />);
  const cancelButton = screen.getByRole("button", {
    name: "Cancelar",
  });

  const deleteButton = screen.getByRole("button", {
    name: "Excluir",
  });

  expect(cancelButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

it("should call functions from context on button clicks", () => {
  render(
    <Context.Provider value={contextValue}>
      <DeleteTransaction />
    </Context.Provider>
  );
  const cancelButton = screen.getByRole("button", {
    name: "Cancelar",
  });

  const deleteButton = screen.getByRole("button", {
    name: "Excluir",
  });

  fireEvent.click(cancelButton);
  expect(setIsDeleteModalOpen).toHaveBeenCalledTimes(1);

  fireEvent.click(deleteButton);
  expect(handleDeleteTransaction).toHaveBeenCalledTimes(1);
});
