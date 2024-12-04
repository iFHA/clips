import { Injectable } from '@angular/core';
import { collection, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import IClip from '../models/clip.model';

@Injectable({
  providedIn: 'root'
})
export class ClipService {

  private clipCollection: CollectionReference<IClip, IClip>;

  constructor(private readonly db:Firestore) {
    this.clipCollection = collection(this.db, "clips") as CollectionReference<IClip, IClip>;
  }

  async createClip(data: IClip) {
    const id = data.fileName.replace(/\.[^/.]+$/, '');
    const documentReference = await doc<IClip, IClip>(this.clipCollection, id);
    await setDoc(documentReference, {...data});
    return documentReference;
  }
}
