import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutService } from './Service/workout.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers:[WorkoutService]
})
export class AppModule { }
