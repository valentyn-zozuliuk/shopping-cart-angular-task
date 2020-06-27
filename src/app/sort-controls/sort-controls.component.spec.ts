import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortControlsComponent } from './sort-controls.component';

describe('SortControlsComponent', () => {
  let component: SortControlsComponent;
  let fixture: ComponentFixture<SortControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
