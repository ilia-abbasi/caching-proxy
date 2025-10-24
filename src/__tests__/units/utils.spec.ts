import { fixHost } from "../../helpers/utils.js";

describe("Testing fixHost", () => {
  it("should lowercase the host", () => {
    expect(
      fixHost("OHimNOTlower.coM").includes("ohimnotlower.com")
    ).toBeTruthy();

    expect(
      fixHost("WWW.FULLY_UPPER.NET").includes("www.fully_upper.net")
    ).toBeTruthy();

    expect(
      fixHost("api.sneAkyyy.org").includes("api.sneakyyy.org")
    ).toBeTruthy();
  });

  it("should append protocol if not provided", () => {
    expect(fixHost("example.com")).toStrictEqual("http://example.com");
    expect(fixHost("www.google.com")).toStrictEqual("http://www.google.com");

    expect(fixHost("http://api.example.org")).toStrictEqual(
      "http://api.example.org"
    );
    expect(fixHost("https://google.com")).toStrictEqual("https://google.com");
  });
});
