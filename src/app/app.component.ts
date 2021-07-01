import { Component } from '@angular/core';
import { AutoLogoutService } from './_shared/services/auto-logout.service';

@Component({
  selector: 'in-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'investnaija-learning-cp';

  constructor(private logout: AutoLogoutService) {}
}
