import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreFilmComponent } from './genre-film.component';

describe('GenreFilmPage', () => {
  let component: GenreFilmComponent;
  let fixture: ComponentFixture<GenreFilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenreFilmComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenreFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
