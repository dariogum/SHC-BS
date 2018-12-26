import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientClinicHistoryComponent } from './patient-clinic-history/patient-clinic-history.component';

const routes: Routes = [
  { path: '', component: PatientListComponent },
  { path: ':id', component: PatientClinicHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsRoutingModule { }
