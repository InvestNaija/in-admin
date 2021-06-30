import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CscsCreateComponent } from './cscs-create.component';

describe('CscsCreateComponent', () => {
  let component: CscsCreateComponent;
  let fixture: ComponentFixture<CscsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CscsCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CscsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
