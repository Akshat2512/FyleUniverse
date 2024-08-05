import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { InputFormComponent } from './input-form/input-form.component';
import { SearchComponent } from './search-form/search-form.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { CoTable, FormType } from './wo-table';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,  InputFormComponent, SearchComponent, AnalysisComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{

  title = 'Fyleuniverse';
  
 tableData!: FormType;  // this data will be read by 'search-form' component for updating Table. 

  graphData!: CoTable[]; // this data will be read by 'analyis' component for updating graph 

  
  receiveData(newData: FormType)  // Recieve Data from 'input-form' component and update tableData
  {
    console.log('Received new form data:', newData);
    this.tableData = newData; 
  }

   updateGraphData(newData: CoTable[])  // Recieve Data from 'search-form' component and update graphData
   {
    console.log('Received Graph data:', newData);
    this.graphData = newData; 
   }
  
   
}
