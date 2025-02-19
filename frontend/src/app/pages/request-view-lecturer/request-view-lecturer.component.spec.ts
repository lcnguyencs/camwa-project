import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestViewLecturerComponent } from './request-view-lecturer.component';

describe('RequestViewLecturerComponent', () => {
  let component: RequestViewLecturerComponent;
  let fixture: ComponentFixture<RequestViewLecturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestViewLecturerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestViewLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});