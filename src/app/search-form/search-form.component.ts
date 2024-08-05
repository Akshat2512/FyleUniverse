import {Component, ViewChild, Input, Output, EventEmitter, SimpleChanges, OnChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { WoTable, CoTable, FormType} from '../wo-table';

import {MatTableModule} from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator} from '@angular/material/paginator';
import { WorkoutService } from '../Service/workout.service';





@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSelectModule, MatTableModule, MatPaginatorModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css',

})
export class SearchComponent implements OnChanges{


  FilterWorkoutList!: CoTable[];

  constructor(public service:WorkoutService){
    this.workouts.setValue(['All']);
    // this.workouts.setValue(['All'])
    this.service.compute_table();
    this.FilterWorkoutList = this.service.TABLE_DATA;
    
   }

  woutList: string[] = this.service.woutList;

  workouts = new FormControl();
  search_name = new FormControl();

  


  displayedColumns: string[] = ['name', 'workouts', 'workout_no', 'workout_time'];
  
  
  @Output() updateGraph = new EventEmitter<any[]>();   // To send updated data to app.component then to analysis.component (for updating Graph)

  @Input() formData!: FormType;  // To Recieve Data from input-form.component

  
ngOnChanges(changes: SimpleChanges) {   // detects changes in SeachComponent.formData and updates the Table and Graph
    
    this.service.updateTableonsubmit(changes);

    var selected = this.workouts.value as string[];
    this.FilterWorkoutList = this.service.onSelectionChange(selected, this.search_name.value);
    setTimeout(()=> this.updatePages(this.FilterWorkoutList));

    this.updateGraph.emit(this.FilterWorkoutList);
    

  }



onFilterAndSearch(){     // filter user data based on workout selection and searches
    this.FilterWorkoutList =  this.service.onSelectionChange(this.service.options, this.search_name.value);
    this.updatePages(this.FilterWorkoutList);
    this.updateGraph.emit(this.FilterWorkoutList);
    
   }


SelectedOptions(select: string)
{
  this.service.ModifyMatSelect(select);
  this.workouts.setValue(this.service.options)
  this.onFilterAndSearch();
}

   
@ViewChild(MatPaginator) paginator!: MatPaginator;

dataSource = new MatTableDataSource<CoTable>();
 
updatePages(DataSource: CoTable[]){
    this.dataSource = new MatTableDataSource<CoTable>(DataSource);
    this.dataSource.paginator = this.paginator;
}


}



