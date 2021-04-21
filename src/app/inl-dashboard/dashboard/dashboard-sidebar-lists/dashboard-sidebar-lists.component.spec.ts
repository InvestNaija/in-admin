import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSidebarListsComponent } from './dashboard-sidebar-lists.component';

describe('DashboardSidebarListsComponent', () => {
  let component: DashboardSidebarListsComponent;
  let fixture: ComponentFixture<DashboardSidebarListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSidebarListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSidebarListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
