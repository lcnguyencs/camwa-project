import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerClassViewComponent } from './lecturer-class-view.component';

describe('LecturerClassViewComponent', () => {
  let component: LecturerClassViewComponent;
  let fixture: ComponentFixture<LecturerClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerClassViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
