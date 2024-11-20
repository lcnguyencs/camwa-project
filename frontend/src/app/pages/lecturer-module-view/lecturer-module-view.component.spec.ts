import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerModuleViewComponent } from './lecturer-module-view.component';

describe('LecturerModuleViewComponent', () => {
  let component: LecturerModuleViewComponent;
  let fixture: ComponentFixture<LecturerModuleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LecturerModuleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LecturerModuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
