import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubContentComponent } from './sub-content.component';

describe('SubContentComponent', () => {
  let component: SubContentComponent;
  let fixture: ComponentFixture<SubContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
