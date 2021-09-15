import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientFieldsComponent } from './ingredient-fields.component';

describe('IngredientFieldsComponent', () => {
  let component: IngredientFieldsComponent;
  let fixture: ComponentFixture<IngredientFieldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientFieldsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
