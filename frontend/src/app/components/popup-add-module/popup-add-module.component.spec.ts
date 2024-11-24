import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupAddModuleComponent } from './popup-add-module.component';

describe('PopupAddModuleComponent', () => {
  let component: PopupAddModuleComponent;
  let fixture: ComponentFixture<PopupAddModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAddModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopupAddModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
