import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFormComponent } from './input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormType } from '../wo-table';


describe('InputFormComponent', () => {
  let component: InputFormComponent;
  let fixture: ComponentFixture<InputFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputFormComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create Input form', () => {
    expect(component).toBeTruthy();
  });



  it('should submit Form data if all input fields are filled',()=> {
    
    let formData: FormType = {
      name: 'Akshat',
      workout_type:'Running',
      minutes: 30
    }
   
    spyOn(component.updateData,'emit');
    component.onSubmit(formData);
    expect(component.updateData.emit).toHaveBeenCalledWith(formData);

  })

  it('should not submit form if any input fields are missing', ()=>{
     
    let formData: FormType = {
      name: 'Akshat',
      workout_type:'',                  // missing field
      minutes: 30
    }
   
    spyOn(component.updateData,'emit');
    component.onSubmit(formData);
    expect(component.updateData.emit).toHaveBeenCalledTimes(0);

  })
});
