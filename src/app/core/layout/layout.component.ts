import {Component, ViewEncapsulation} from '@angular/core';
import {NavBar} from "../../shared/navbar";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'layout',
  imports: [
    NavBar,
    RouterOutlet
  ],
  template: `
    <app-navbar/>
    <router-outlet/>
  `,
  styleUrl: './layout.component.scss',
  standalone: true,
})
export class LayoutComponent {

}
