import { render, screen } from "@testing-library/react";
import DashboardView from ".";

jest.mock("../../data/getDataStorage", () => ({
  getDataStorage: jest.fn(() => [
    [{ type: "Entrada", value: "100" }],
    [{ type: "Saída", value: "50" }],
    100,
    50,
    50,
  ]),
}));

it("should render title and subtitle correctly", () => {
  render(<DashboardView />);

  const title = screen.getByRole("heading", { level: 5, name: "Dashboard" });
  const subtitle = screen.getByText(
    "Aqui você encontrará informações sobre suas transações."
  );

  expect(title).toBeInTheDocument();
  expect(subtitle).toBeInTheDocument();
});

it("should render five cards", () => {
  render(<DashboardView />);

  const cards = screen.getAllByTestId("card");
  expect(cards).toHaveLength(5);
});

it("should render cards with correct data from localStorage", () => {
  render(<DashboardView />);

  const cardsValues = screen.getAllByTestId("cardValue");
  expect(cardsValues[0]).toHaveTextContent(1);
  expect(cardsValues[1]).toHaveTextContent(1);
  expect(cardsValues[2]).toHaveTextContent("R$ 100,00");
  expect(cardsValues[3]).toHaveTextContent("R$ 50,00");
  expect(cardsValues[4]).toHaveTextContent("R$ 50,00");
});
