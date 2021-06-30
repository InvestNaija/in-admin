import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCscsComponent } from './verify-cscs.component';

describe('VerifyCscsComponent', () => {
  let component: VerifyCscsComponent;
  let fixture: ComponentFixture<VerifyCscsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyCscsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCscsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
