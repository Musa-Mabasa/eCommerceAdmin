import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
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
  router = inject(Router)
}
