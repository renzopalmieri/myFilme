import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFilmListPage } from './my-film-list.page';

describe('MyFilmListPage', () => {
  let component: MyFilmListPage;
  let fixture: ComponentFixture<MyFilmListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFilmListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFilmListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
