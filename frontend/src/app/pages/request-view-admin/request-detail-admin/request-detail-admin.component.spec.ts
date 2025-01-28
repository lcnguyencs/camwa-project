import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDetailAdminComponent } from './request-detail-admin.component';

describe('RequestDetailAdminComponent', () => {
  let component: RequestDetailAdminComponent;
  let fixture: ComponentFixture<RequestDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDetailAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});