import { getDataStorage } from "../getDataStorage";

describe("getDataStorage", () => {
  beforeEach(() => {
    localStorage.setItem(
      "transacoes",
      JSON.stringify([
        { type: "Entrada", value: "100" },
        { type: "Saída", value: "50" },
        { type: "Entrada", value: "75" },
      ])
    );
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should return empty arrays and zeros when no data is stored", () => {
    localStorage.clear();
    const result = getDataStorage();

    expect(result).toEqual([[], [], 0, 0, 0]);
  });

  it("should calculate totals correctly", () => {
    const result = getDataStorage();

    expect(result[0]).toHaveLength(2);
    expect(result[1]).toHaveLength(1);
    expect(result[2]).toBe(175);
    expect(result[3]).toBe(50);
    expect(result[4]).toBe(125);
  });
});
