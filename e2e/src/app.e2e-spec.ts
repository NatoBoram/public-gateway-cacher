import { browser, logging } from "protractor"
import { AppPage } from "./app.po"

describe("workspace-project App", (): void => {
  let page: AppPage

  beforeEach((): void => {
    page = new AppPage()
  })

  it("should display welcome message", (): void => {
    void page.navigateTo()
    void expect(page.getTitleText()).toEqual("public-gateway-cacher app is running!")
  })

  afterEach(async (): Promise<void> => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER)
    const expected: Partial<logging.Entry> = {
      level: logging.Level.SEVERE,
    }

    void expect(logs).not.toContain(jasmine.objectContaining(expected))
  })
})
