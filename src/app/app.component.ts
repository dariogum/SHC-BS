import { Component } from '@angular/core';
import { AppService } from './app.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    private appService: AppService,
    breakpointObserver: BreakpointObserver
  ) {
    breakpointObserver.observe([
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.appService.setLayout('handset');
      }
    });
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait,
    ]).subscribe(result => {
      if (result.matches) {
        this.appService.setLayout('tablet');
      }
    });
    breakpointObserver.observe([
      Breakpoints.TabletLandscape,
      Breakpoints.Web,
    ]).subscribe(result => {
      if (result.matches) {
        this.appService.setLayout('web');
      }
    });
  }

}
