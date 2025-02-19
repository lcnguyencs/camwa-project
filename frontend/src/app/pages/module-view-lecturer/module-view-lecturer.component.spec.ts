import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewLecturerComponent } from './module-view-lecturer.component';

describe('ModuleViewLecturerComponent', () => {
  let component: ModuleViewLecturerComponent;
  let fixture: ComponentFixture<ModuleViewLecturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleViewLecturerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleViewLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
