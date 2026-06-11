import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAppDialogComponent } from './create-app-dialog.component';

describe('CreateAppDialogComponent', () => {
  let component: CreateAppDialogComponent;
  let fixture: ComponentFixture<CreateAppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateAppDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateAppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
