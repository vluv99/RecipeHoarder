import { TestBed } from '@angular/core/testing';

import { RecipeImporterService } from './recipe-importer.service';

describe('RecipeImporterService', () => {
  let service: RecipeImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
