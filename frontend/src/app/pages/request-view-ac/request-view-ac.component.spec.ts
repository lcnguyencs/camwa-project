import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestViewACComponent } from './request-view-ac.component';

describe('RequestViewACComponent', () => {
  let component: RequestViewACComponent;
  let fixture: ComponentFixture<RequestViewACComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestViewACComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestViewACComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});