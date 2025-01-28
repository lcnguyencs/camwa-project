import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailCreateAdminComponent } from './module-detail-create-admin.component';

describe('ModuleDetailCreateAdminComponent', () => {
  let component: ModuleDetailCreateAdminComponent;
  let fixture: ComponentFixture<ModuleDetailCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailCreateAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
