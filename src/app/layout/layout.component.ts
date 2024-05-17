import { Component } from '@angular/core';
import { ScreenComponent } from '../screen/screen.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [ScreenComponent, RouterOutlet],
  template: `
  <app-screen></app-screen>
  <router-outlet></router-outlet>
`,  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
