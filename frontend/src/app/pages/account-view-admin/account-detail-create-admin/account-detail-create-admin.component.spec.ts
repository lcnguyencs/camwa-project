import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailCreateAdminComponent } from './account-detail-create-admin.component';

describe('AccountDetailCreateAdminComponent', () => {
  let component: AccountDetailCreateAdminComponent;
  let fixture: ComponentFixture<AccountDetailCreateAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDetailCreateAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDetailCreateAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
