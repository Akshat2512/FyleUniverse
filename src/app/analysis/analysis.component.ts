import { Component, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CoTable } from '../wo-table';
import { WorkoutService } from '../Service/workout.service';




 
@Component({
  selector: 'app-analysis',
  standalone: true,
  imports: [CommonModule, ChartModule, MatCardModule, MatRadioModule, FormsModule, ReactiveFormsModule, MatListModule, MatDividerModule],
  templateUrl: './analysis.component.html',
  styleUrl: './analysis.component.css'
})



export class AnalysisComponent{


select = new FormControl();

heading: string = '';
names: string[] = this.service.names;
basicData: any; 
basicOptions: any;

constructor(public service:WorkoutService){
  this.basicOptions = this.service.basicOptions;
}


 @Input() updateData!: CoTable[];  // To receive update graph data from search-form.component
                        
 ngOnChanges(changes: SimpleChanges) {    // detect changes in 'updateData' and then update graph
   if (changes['updateData'] && this.updateData[0]) {
     this.onSelection(this.updateData[0].name);
     this.select.setValue(this.updateData[0].name);
   }
   else if(!this.updateData[0])
   {
    this.names = [];
    this.basicData = {};
    this.service.heading = '';
   }
}

onSelection(name: string){  // This function trigger when click on names list and display the graph associated with the name
    this.service.handleListItemClick(this.updateData);
    this.service.SelectItemClick(name);

    this.basicData = this.service.basicData;
   
    this.names = this.service.names;
}




}
