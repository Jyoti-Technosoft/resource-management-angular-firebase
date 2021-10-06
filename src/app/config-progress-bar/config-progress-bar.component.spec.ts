import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigProgressBarComponent } from './config-progress-bar.component';

describe('ConfigProgressBarComponent', () => {
  let component: ConfigProgressBarComponent;
  let fixture: ComponentFixture<ConfigProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
