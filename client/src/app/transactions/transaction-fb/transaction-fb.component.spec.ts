import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFbComponent } from './transaction-fb.component';

describe('TransactionFbComponent', () => {
  let component: TransactionFbComponent;
  let fixture: ComponentFixture<TransactionFbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
