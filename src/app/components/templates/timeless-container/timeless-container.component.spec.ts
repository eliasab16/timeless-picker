import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelessContainerComponent } from './timeless-container.component';

describe('TimelessContainerComponent', () => {
  let component: TimelessContainerComponent;
  let fixture: ComponentFixture<TimelessContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TimelessContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimelessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
