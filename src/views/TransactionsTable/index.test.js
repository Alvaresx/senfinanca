import { fireEvent, render, screen } from "@testing-library/react";
import TransactionsTableView from ".";
import { tableHeaderTitles } from "./definitions";

beforeEach(() => {
  localStorage.setItem(
    "transacoes",
    JSON.stringify([
      {
        title: "Transação 01",
        type: "Entrada",
        category: "Educação",
        value: "100",
        date: "02/08/2023 às 16:02:14",
      },
    ])
  );
});

afterEach(() => {
  localStorage.clear();
});

it("should render title and subtitle correctly", () => {
  render(<TransactionsTableView />);

  const title = screen.getByRole("heading", {
    level: 5,
    name: "Transações",
  });
  const subtitle = screen.getByText(
    "Aqui você poderá visualizar as informações das suas transações, bem como editar e/ou excluí-las."
  );

  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
});

it("should render table header titles correctly", () => {
  render(<TransactionsTableView />);

  for (const title of tableHeaderTitles) {
    const titleElement = screen.getByRole("columnheader", { name: title });
    expect(titleElement).toBeInTheDocument();
  }
});

it("should render table data correctly", () => {
  render(<TransactionsTableView />);

  const cells = screen.getAllByRole("cell");
  expect(cells[0]).toHaveTextContent("Transação 01");
  expect(cells[1]).toHaveTextContent("Entrada");
  expect(cells[2]).toHaveTextContent("Educação");
  expect(cells[3]).toHaveTextContent("100");
  expect(cells[4]).toHaveTextContent("02/08/2023 às 16:02:14");
});

it("should render edit button and delete button in the the row", () => {
  render(<TransactionsTableView />);

  const editButton = screen.getByRole("button", { name: "Editar" });
  const deleteButton = screen.getByRole("button", { name: "Excluir" });

  expect(editButton).toBeInTheDocument();
  expect(deleteButton).toBeInTheDocument();
});

it("should open the respective modal when clicking the button", () => {
  render(<TransactionsTableView />);

  const editButton = screen.getByRole("button", { name: "Editar" });
  const deleteButton = screen.getByRole("button", { name: "Excluir" });

  fireEvent.click(editButton);
  const editModal = screen.getByRole("dialog", { name: "Editar transação" });
  expect(editModal).toBeInTheDocument();

  fireEvent.click(deleteButton);
  const deleteModal = screen.getByRole("dialog", { name: "Excluir transação" });
  expect(deleteModal).toBeInTheDocument();
});
