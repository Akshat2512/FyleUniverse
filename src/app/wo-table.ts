export interface WoTable {
    id: number,
    name: string,
    workouts: workouts[]
}

export interface CoTable extends WoTable {

 workout_type: string;
 workout_time: number;
 workout_no: number;

}

export interface FormType {
   name: string;
   workout_type: string;
   minutes: number;
}

export interface workouts {
  type: string;
  minutes: number;
}