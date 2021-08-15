import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientSuggestionComponent } from './ingredient-suggestion.component';

describe('IngredientSuggestionComponent', () => {
  let component: IngredientSuggestionComponent;
  let fixture: ComponentFixture<IngredientSuggestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientSuggestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientSuggestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
