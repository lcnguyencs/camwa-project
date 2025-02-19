import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailStudentComponent } from './module-detail-student.component';

describe('ModuleDetailStudentComponent', () => {
  let component: ModuleDetailStudentComponent;
  let fixture: ComponentFixture<ModuleDetailStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailStudentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});