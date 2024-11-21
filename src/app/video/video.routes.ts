import { Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';

export const VIDEO_ROUTES: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    data: {
      authOnly: true
    }
  }
];
