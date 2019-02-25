import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfavoritefilmComponent } from './myfavoritefilm.component';

describe('MyfavoritefilmPage', () => {
  let component: MyfavoritefilmComponent;
  let fixture: ComponentFixture<MyfavoritefilmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyfavoritefilmComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfavoritefilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
