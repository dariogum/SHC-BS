import { Component, OnInit } from '@angular/core';
import { AppService } from './../app.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  date = new Date();
  newAppointment = { id: null, schedule: null, date: new Date(), hour: null, professional: null, patient: null, indications: null };
  data = {
    items: [
      { id: 1, schedule: 1, date: new Date(), hour: '10:45', professional: { name: 'Mengano', lastname: 'Sultano' }, patient: { name: 'Mengano', lastname: 'Sultano' }, indications: null, confirmed: true },
      { id: 2, schedule: 1, date: new Date(), hour: '11:45', professional: { name: 'Mengano', lastname: 'Sultano' }, patient: { name: 'Mengano', lastname: 'Sultano' }, indications: null, confirmed: false },
      { id: 3, schedule: 1, date: new Date(), hour: '12:45', professional: { name: 'Mengano', lastname: 'Sultano' }, patient: { name: 'Mengano', lastname: 'Sultano' }, indications: null, confirmed: false },
      { id: 4, schedule: 1, date: new Date(), hour: '13:45', professional: { name: 'Mengano', lastname: 'Sultano' }, patient: { name: 'Mengano', lastname: 'Sultano' }, indications: null, confirmed: true },
    ]
  };

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
  }

}
