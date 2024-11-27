import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleStudentComponent } from './module-student.component';

describe('ModuleStudentComponent', () => {
  let component: ModuleStudentComponent;
  let fixture: ComponentFixture<ModuleStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
