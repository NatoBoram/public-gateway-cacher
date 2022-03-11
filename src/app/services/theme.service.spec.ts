import { TestBed } from "@angular/core/testing"
import { ThemeService } from "./theme.service"

describe("ThemeService", (): void => {
  let service: ThemeService

  beforeEach((): void => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ThemeService)
  })

  it("should be created", (): void => {
    void expect(service).toBeTruthy()
  })
})
