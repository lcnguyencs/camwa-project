import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAssistantClassViewComponent } from './faculty-assistant-class-view.component';

describe('FacultyAssistantClassViewComponent', () => {
  let component: FacultyAssistantClassViewComponent;
  let fixture: ComponentFixture<FacultyAssistantClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyAssistantClassViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyAssistantClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
