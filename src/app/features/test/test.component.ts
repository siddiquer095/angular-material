import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'test',
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss',
  standalone: true
})
export class TestComponent {
  name: string = '';
  constructor(
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data: any) => {
      this.name = data.name;

    });
  }
}
