import { TestBed, TestBedStatic } from '@angular/core/testing';
import { GatewayService } from './gateway.service';

describe('GatewayService', (): void => {
  beforeEach((): TestBedStatic => TestBed.configureTestingModule({}));

  it('should be created', (): void => {
    const service: GatewayService = TestBed.inject(GatewayService);
    expect(service).toBeTruthy();
  });
});
