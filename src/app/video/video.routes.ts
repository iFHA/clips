import { Routes } from '@angular/router';
import { ManageComponent } from './manage/manage.component';
import { UploadComponent } from './upload/upload.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

export const VIDEO_ROUTES: Routes = [
  {
    path: "manage",
    component: ManageComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate: [AuthGuard]
  },
  {
    path: "upload",
    component: UploadComponent,
    data: {
      authOnly: true,
      authGuardPipe: redirectUnauthorizedToHome
    },
    canActivate: [AuthGuard]
  },
  {
    path: "manage-clips",// assumindo que antes havia esse caminho
    redirectTo: "manage"
  },
];
