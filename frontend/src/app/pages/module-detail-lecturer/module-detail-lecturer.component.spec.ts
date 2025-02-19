import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailLecturerComponent } from './module-detail-lecturer.component';

describe('ModuleDetailLecturerComponent', () => {
  let component: ModuleDetailLecturerComponent;
  let fixture: ComponentFixture<ModuleDetailLecturerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailLecturerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailLecturerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});