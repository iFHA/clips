import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { addDoc, collection, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import IUser from '../models/user.model';
import { set } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: CollectionReference<IUser, IUser>;

  constructor (
    private auth:Auth,
    private db:Firestore
  ) {
    this.usersCollection = collection(this.db, "users") as CollectionReference<IUser, IUser>;
  }

  async createUser({
    email,
    password,
    name,
    age,
    phoneNumber
  }: IUser) {

    const userCredentials = await createUserWithEmailAndPassword(
      this.auth, email as string, password as string
    );

    const userId = userCredentials.user.uid;

    const documentReference = await doc<IUser, IUser>(this.usersCollection, userId);
    await setDoc(documentReference, {
      name,
      email,
      age,
      phoneNumber
    });

    await updateProfile(userCredentials.user, {
      displayName: name
    });

  }
}
