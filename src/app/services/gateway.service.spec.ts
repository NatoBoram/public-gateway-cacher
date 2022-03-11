import { HttpClientTestingModule } from "@angular/common/http/testing"
import type { TestBedStatic } from "@angular/core/testing"
import { TestBed } from "@angular/core/testing"
import { GatewayService } from "./gateway.service"

describe("GatewayService", (): void => {
  beforeEach(
    (): TestBedStatic =>
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      })
  )

  it("should be created", (): void => {
    const service: GatewayService = TestBed.inject(GatewayService)
    void expect(service).toBeTruthy()
  })
})
