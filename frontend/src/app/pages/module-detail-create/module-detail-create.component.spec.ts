import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailCreateComponent } from './module-detail-create.component';

describe('ModuleDetailCreateComponent', () => {
  let component: ModuleDetailCreateComponent;
  let fixture: ComponentFixture<ModuleDetailCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
