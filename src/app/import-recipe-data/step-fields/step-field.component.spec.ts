import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepFieldComponent } from './step-field.component';

describe('StepFieldsComponent', () => {
  let component: StepFieldComponent;
  let fixture: ComponentFixture<StepFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
