import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractiveBackgroundComponent } from './interactive-background.component';

describe('InteractiveBackgroundComponent', () => {
  let component: InteractiveBackgroundComponent;
  let fixture: ComponentFixture<InteractiveBackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteractiveBackgroundComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InteractiveBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
