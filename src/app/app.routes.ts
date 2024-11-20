import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'videos',
    loadChildren: () => import('./video/video.routes')
    .then(r=>r.VIDEO_ROUTES)
  },
  {
    path: 'about',
    component: AboutComponent
  },
];
