import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl,FormsModule,ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { FormType } from '../wo-table';
import { WorkoutService } from '../Service/workout.service';



@Component({
  selector: 'app-input-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule, MatButtonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './input-form.component.html',
  styleUrl: './input-form.component.css'
})



export class InputFormComponent {
 


  public wout_List: string[] = [];

  constructor(public service:WorkoutService ){
    this.wout_List = this.service.putOptions();
  }



  @Output() updateData = new EventEmitter<FormType>();

  
  onSubmit(formData: FormType){   // check if any of the form input field is empty ,then it will not allow any submission 

    if(formData.name!='' && formData.workout_type!='' && formData.minutes)
         this.updateData.emit(formData); 

   }
 
 

}
