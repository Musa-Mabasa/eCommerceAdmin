import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { matHomeOutline } from '@ng-icons/material-icons/outline';

@Component({
  selector: 'app-route-error',
  standalone: true,
  imports: [NgIconComponent, RouterLink],
  templateUrl: './route-error.component.html',
  styleUrl: './route-error.component.scss',
  viewProviders: [provideIcons({ matHomeOutline })],
})
export class RouteErrorComponent {

}
