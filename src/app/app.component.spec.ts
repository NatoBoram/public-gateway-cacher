import { TestBed, waitForAsync } from "@angular/core/testing"
import { RouterTestingModule } from "@angular/router/testing"
import { AppComponent } from "./app.component"

describe("AppComponent", (): void => {
  beforeEach(
    waitForAsync((): void => {
      void TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [AppComponent],
      }).compileComponents()
    })
  )

  it("should create the app", (): void => {
    const fixture = TestBed.createComponent(AppComponent)
    if (!(fixture.debugElement.componentInstance instanceof AppComponent)) throw new Error("Expected AppComponent")

    const app: AppComponent = fixture.debugElement.componentInstance
    void expect(app).toBeTruthy()
  })

  it(`should have a themeService`, (): void => {
    const fixture = TestBed.createComponent(AppComponent)
    if (!(fixture.debugElement.componentInstance instanceof AppComponent)) throw new Error("Expected AppComponent")

    const app: AppComponent = fixture.debugElement.componentInstance
    void expect(app.themeService).toBeTruthy()
  })

  it("should render title", (): void => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    if (!isHTMLElement(fixture.debugElement.nativeElement)) throw new Error("Expected HTMLElement")

    const compiled: HTMLElement = fixture.debugElement.nativeElement
    void expect(compiled.querySelector("h1")?.textContent).toContain("Public Gateway Cacher")
  })
})

function isHTMLElement(element: unknown): element is HTMLElement {
  return Object.getPrototypeOf(element) instanceof HTMLElement
}
