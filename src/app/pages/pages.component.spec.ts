import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PagesComponent } from './pages.component';

describe('PagesComponent', (): void => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;

  beforeEach(async((): void => {
    TestBed.configureTestingModule({
      declarations: [PagesComponent]
    })
      .compileComponents();
  }));

  beforeEach((): void => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
