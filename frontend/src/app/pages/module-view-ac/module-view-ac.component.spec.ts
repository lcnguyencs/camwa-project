import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleViewACComponent } from './module-view-ac.component';

describe('ModuleViewACComponent', () => {
  let component: ModuleViewACComponent;
  let fixture: ComponentFixture<ModuleViewACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleViewACComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleViewACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
