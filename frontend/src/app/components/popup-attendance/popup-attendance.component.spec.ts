import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAttendanceComponent } from './popup-attendance.component';

describe('PopupAttendanceComponent', () => {
  let component: PopupAttendanceComponent;
  let fixture: ComponentFixture<PopupAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
