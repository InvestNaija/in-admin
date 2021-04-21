import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlWebsiteComponent } from './inl-website.component';

describe('InlWebsiteComponent', () => {
  let component: InlWebsiteComponent;
  let fixture: ComponentFixture<InlWebsiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InlWebsiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlWebsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
