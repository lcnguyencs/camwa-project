import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewAdminComponent } from './module-view-admin.component';

describe('ModuleViewAdminComponent', () => {
  let component: ModuleViewAdminComponent;
  let fixture: ComponentFixture<ModuleViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleViewAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
