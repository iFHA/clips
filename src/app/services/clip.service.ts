import { Injectable } from '@angular/core';
import { collection, CollectionReference, deleteDoc, doc, Firestore, getDocs, orderBy, OrderByDirection, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import IClip from '../models/clip.model';
import { AuthService } from './auth.service';
import { FileUploadService } from './file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  private clipCollection: CollectionReference<IClip, IClip>;

  constructor(
    private readonly db: Firestore,
    private readonly auth: AuthService,
    private readonly fileUploadService: FileUploadService
  ) {
    this.clipCollection = collection(this.db, "clips") as CollectionReference<IClip, IClip>;
  }

  async createClip(data: IClip) {
    const id = data.fileName.replace(/\.[^/.]+$/, '');
    const documentReference = await doc<IClip, IClip>(this.clipCollection, id);
    await setDoc(documentReference, {...data});
    return documentReference;
  }

  async getUserClips(videoOrder: string) {
    const videosList:Array<IClip> = [];
    const userId = this.auth.getCurrentUser()?.uid;
    if(userId) {
      let order:OrderByDirection = 'desc';
      if(videoOrder === '2') {
        order = 'asc';
      }
      const userClipsQuery = query(
        this.clipCollection,
        where('uid', '==', userId),
        orderBy('timestamp', order)
      );
      const userClipsQuerySnapshot = await getDocs(userClipsQuery);
      userClipsQuerySnapshot.forEach(doc => {
        videosList.push({
          docId: doc.id,
          ...doc.data()
        })
      });
    }
    return videosList;
  }

  async updateClip(id: string, title: string) {
    const documentReference = await doc<IClip, IClip>(this.clipCollection, id);
    await updateDoc(documentReference, { title });
    return documentReference;
  }

  async deleteClip(clip: IClip) {
    const documentReference = await doc<IClip, IClip>(this.clipCollection, clip.docId);
    await this.fileUploadService.deleteFile(`clips/${clip.fileName}`);
    await deleteDoc(documentReference);
  }
}
