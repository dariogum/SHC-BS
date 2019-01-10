import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-stats-list',
  templateUrl: './stats-list.component.html',
  styleUrls: ['./stats-list.component.css']
})
export class StatsListComponent implements OnInit {
  columnNames = ['City', 'Inhabitants'];
  data = [
    ['London', 8136000],
    ['New York', 8538000],
    ['Paris', 2244000],
    ['Berlin', 3470000],
    ['Kairo', 19500000],
  ];
  dynamicResize = true;
  today = new Date();
  end = this.today;
  start = this.today;
  selectedChart = 'XMChart'
  title = "Cities inhabitants";
  type = "LineChart";

  constructor(
    private appService: AppService,
  ) { }

  ngOnInit() {
  }

  update(chart: string) {
    console.log(chart);
  }

}
