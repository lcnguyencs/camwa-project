import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailModifyAdminComponent } from './account-detail-modify-admin.component';

describe('AdminModuleDetailMofifyComponent', () => {
  let component: ModuleDetailModifyAdminComponent;
  let fixture: ComponentFixture<ModuleDetailModifyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailModifyAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailModifyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
