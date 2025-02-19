import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleDetailModifyComponent } from './module-detail-modify.component';

describe('ModuleDetailMofifyComponent', () => {
  let component: ModuleDetailModifyComponent;
  let fixture: ComponentFixture<ModuleDetailModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleDetailModifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleDetailModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
