import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFieldComponent } from './ingredient-field.component';

describe('IngredientFieldsComponent', () => {
  let component: IngredientFieldComponent;
  let fixture: ComponentFixture<IngredientFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
