import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyAssistantModuleViewComponent } from './faculty-assistant-module-view.component';

describe('FacultyAssistantModuleViewComponent', () => {
  let component: FacultyAssistantModuleViewComponent;
  let fixture: ComponentFixture<FacultyAssistantModuleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyAssistantModuleViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyAssistantModuleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
