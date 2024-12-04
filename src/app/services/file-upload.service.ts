import { Injectable } from '@angular/core';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, UploadTask } from 'firebase/storage';
import { Observable } from 'rxjs';

export interface UploadProgress {
  progress: number;
  downloadURL: string;
  error?: any;
  state: 'in_progress' | 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  private currentUploadTask?: UploadTask;

  uploadFile(file: File, path: string): Observable<UploadProgress> {
    return new Observable((observer) => {
      const storage = getStorage();
      const storageRef = ref(storage, path);

      // Iniciar o upload
      this.currentUploadTask = uploadBytesResumable(storageRef, file);

      this.currentUploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next({ progress, state: 'in_progress', downloadURL: '' });
        },
        (error) => {
          observer.next({ error, state: 'error', progress: 0, downloadURL: '' });
          observer.error(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(this.currentUploadTask!.snapshot.ref);
          observer.next({ progress: 100, state: 'success', downloadURL });
          observer.complete();
        }
      );
    });
  }

  cancelUpload() {
    if (this.currentUploadTask) {
      this.currentUploadTask.cancel(); // Cancela o upload
      this.currentUploadTask = undefined;
      console.log('upload cancelado');
    }
  }
}
