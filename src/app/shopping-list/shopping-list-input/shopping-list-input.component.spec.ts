import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListInputComponent } from './shopping-list-input.component';

describe('ShoppingListInputComponent', () => {
  let component: ShoppingListInputComponent;
  let fixture: ComponentFixture<ShoppingListInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShoppingListInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
