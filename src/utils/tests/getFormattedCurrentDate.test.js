import { getFormattedCurrentDate } from "../getFormattedCurrentDate";

it("should format the current date correctly", () => {
  const mockDate = new Date("2023-08-01T12:34:56");
  const originalDate = global.Date;
  global.Date = jest.fn(() => mockDate);

  const formattedDate = getFormattedCurrentDate();

  global.Date = originalDate;

  expect(formattedDate).toBe("01/08/2023 às 12:34:56");
});
