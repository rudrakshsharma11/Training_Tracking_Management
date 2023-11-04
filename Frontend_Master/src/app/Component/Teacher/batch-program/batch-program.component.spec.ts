import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BatchProgramComponent } from './batch-program.component';

describe('BatchProgramComponent', () => {
  let component: BatchProgramComponent;
  let fixture: ComponentFixture<BatchProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BatchProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BatchProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
