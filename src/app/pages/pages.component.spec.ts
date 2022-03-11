import { HttpClientTestingModule } from "@angular/common/http/testing"
import type { ComponentFixture } from "@angular/core/testing"
import { TestBed, waitForAsync } from "@angular/core/testing"
import { PagesComponent } from "./pages.component"

describe("PagesComponent", (): void => {
  let component: PagesComponent
  let fixture: ComponentFixture<PagesComponent>

  beforeEach(
    waitForAsync((): void => {
      void TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PagesComponent],
      }).compileComponents()
    })
  )

  beforeEach((): void => {
    fixture = TestBed.createComponent(PagesComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should create", (): void => {
    void expect(component).toBeTruthy()
  })
})
