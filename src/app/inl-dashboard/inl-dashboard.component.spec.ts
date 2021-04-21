import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlDashboardComponent } from './inl-dashboard.component';

describe('InlDashboardComponent', () => {
  let component: InlDashboardComponent;
  let fixture: ComponentFixture<InlDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
