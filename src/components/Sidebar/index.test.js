import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { resizeToMobile } from "../../utils/resizeToMobile";
import Sidebar from ".";

it("should render logo correctly", () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );
  const logo = screen.getByRole("img", { name: "Logo da SenFinança" });
  expect(logo).toBeInTheDocument();
});

it("should render menu button when is mobile", () => {
  resizeToMobile();
  render(
    <Router>
      <Sidebar />
    </Router>
  );
  const menuButton = screen.getByRole("button", { name: "Botão de menu" });
  expect(menuButton).toBeInTheDocument();
});

it("should render a list with sidebar items", () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );

  const list = screen.getByRole("list");
  const dashboardItem = screen.getByRole("button", { name: "Dashboard" });
  const createTransactionItem = screen.getByRole("button", {
    name: "Criar transação",
  });
  const transactionsItem = screen.getByRole("button", { name: "Transações" });
  expect(list).toBeInTheDocument();
  expect(dashboardItem).toBeInTheDocument();
  expect(createTransactionItem).toBeInTheDocument();
  expect(transactionsItem).toBeInTheDocument();
});

it("should navigate to correct path on link click", () => {
  render(
    <Router>
      <Sidebar />
    </Router>
  );

  const dashboardItem = screen.getByRole("button", { name: "Dashboard" });
  const createTransactionItem = screen.getByRole("button", {
    name: "Criar transação",
  });
  const transactionsItem = screen.getByRole("button", { name: "Transações" });

  fireEvent.click(dashboardItem);
  expect(window.location.pathname).toBe("/");

  fireEvent.click(createTransactionItem);
  expect(window.location.pathname).toBe("/registro");

  fireEvent.click(transactionsItem);
  expect(window.location.pathname).toBe("/transacoes");
});
