import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss'],
  imports: [],
  standalone: true
})
export class Footer {
  year = new Date().getFullYear();
}
