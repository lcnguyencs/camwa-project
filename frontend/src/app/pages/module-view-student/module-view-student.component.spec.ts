import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewStudentComponent } from './module-view-student.component';

describe('ModuleViewStudentComponent', () => {
  let component: ModuleViewStudentComponent;
  let fixture: ComponentFixture<ModuleViewStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleViewStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleViewStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
