import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisComponent } from './analysis.component';
import { SimpleChanges } from '@angular/core';

describe('AnalysisComponent', () => {
  let component: AnalysisComponent;
  let fixture: ComponentFixture<AnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    
    fixture = TestBed.createComponent(AnalysisComponent);
    component = fixture.componentInstance;
   
  })

  it('should create graph', () => {
    expect(component).toBeTruthy();
  });

  it('should check graph fuction trigger on changes', ()=>{

    //Arrange
    component.updateData = []; // Simulate updateData with null first element
    const changes: SimpleChanges = {
      updateData: {
        currentValue: component.updateData,
        previousValue: undefined,
        firstChange: true,
        isFirstChange: () => true
      }
    };

    //Act
    component.ngOnChanges(changes);

    //Assert
    expect(component.service.names).toEqual([]);
    expect(component.basicData).toEqual({});
    expect(component.service.heading).toBe('');

  });

  it('should update graph heading',()=>{
    
    //Arrange
    component.service.heading = "User's workout progress";
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    //Assert
    expect(compiled.querySelector('.text-2xl')?.innerHTML).toEqual("User's workout progress")
  })

  it('should update name selection list',()=>{
    
    component.names = ['Daniel', 'John', 'James', 'Wade', 'Drake'];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    const inputs = compiled.querySelectorAll('label');
    
    component.names.forEach((name,index) => {
      expect(inputs[index].innerText).toBe(name);
    })


   
  })
});
