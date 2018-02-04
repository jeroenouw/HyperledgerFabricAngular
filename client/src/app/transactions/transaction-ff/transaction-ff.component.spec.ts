import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionFfComponent } from './transaction-ff.component';

describe('TransactionFfComponent', () => {
  let component: TransactionFfComponent;
  let fixture: ComponentFixture<TransactionFfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionFfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionFfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
