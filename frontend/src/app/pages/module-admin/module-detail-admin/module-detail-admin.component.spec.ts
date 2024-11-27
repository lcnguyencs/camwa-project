import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailAdminComponent } from './module-detail-admin.component';

describe('ModuleDetailAdminComponent', () => {
  let component: ModuleDetailAdminComponent;
  let fixture: ComponentFixture<ModuleDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
