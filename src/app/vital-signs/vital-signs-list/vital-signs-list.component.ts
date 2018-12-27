import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';

import { AppService } from './../../app.service';
import { VitalSignsFormComponent } from './../vital-signs-form/vital-signs-form.component';
import { VitalSigns, VitalSignsService } from '../vital-signs.service';

@Component({
  selector: 'app-vital-signs-list',
  templateUrl: './vital-signs-list.component.html',
  styleUrls: ['./vital-signs-list.component.css']
})
export class VitalSignsListComponent implements OnInit {
  vitalSignsRecords: VitalSigns[] = [];
  date = new Date();
  newVitalSignsRecord: VitalSigns = new VitalSigns;

  constructor(
    private appService: AppService,
    private vitalSignsRecordService: VitalSignsService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.readVitalSignsRecords();
  }

  vitalSignsRecordsParser(data: any): VitalSigns[] {
    let vitalSignsRecords: VitalSigns[] = []
    data.forEach((vitalSignsRecord: any) => {
      vitalSignsRecords.push(this.appService.vitalSignsRecordParser(vitalSignsRecord));
    });
    return vitalSignsRecords;
  }

  openVitalSignsBottomSheet(vitalSignsRecord: VitalSigns): void {
    const data = { title: 'Información del registros de signos vitales', vitalSignsRecord: vitalSignsRecord };
    this.appService.openBottomSheet(VitalSignsFormComponent, data);
  }

  readVitalSignsRecords(): void {
    this.vitalSignsRecordService.readAll().subscribe(
      vitalSignsRecords => this.vitalSignsRecords = vitalSignsRecords,
      error => this.snackBar.open('Ocurrió un error al obtener los registros de signos vitales', 'OK', { duration: 2000 })
    );
  }

}
