import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAppsComponent } from './dashboard-apps.component';

describe('DashboardAppsComponent', () => {
  let component: DashboardAppsComponent;
  let fixture: ComponentFixture<DashboardAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAppsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
