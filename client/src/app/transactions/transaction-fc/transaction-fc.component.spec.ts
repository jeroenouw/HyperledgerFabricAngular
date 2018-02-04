import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFcComponent } from './transaction-fc.component';

describe('TransactionFcComponent', () => {
  let component: TransactionFcComponent;
  let fixture: ComponentFixture<TransactionFcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
