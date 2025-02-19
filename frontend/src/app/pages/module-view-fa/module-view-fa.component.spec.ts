import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewFAComponent } from './module-view-fa.component';

describe('ModuleViewFAComponent', () => {
  let component: ModuleViewFAComponent;
  let fixture: ComponentFixture<ModuleViewFAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleViewFAComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleViewFAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
