import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountViewAdminComponent } from './account-view-admin.component';

describe('AccountViewAdminComponent', () => {
  let component: AccountViewAdminComponent;
  let fixture: ComponentFixture<AccountViewAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountViewAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountViewAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
