import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithCredential, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { collection, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { delay, from, map, Observable, of, tap } from 'rxjs';
import IUser from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: CollectionReference<IUser, IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;

  constructor (
    private auth:Auth,
    private db:Firestore
  ) {
    this.usersCollection = collection(this.db, "users") as CollectionReference<IUser, IUser>;
    this.isAuthenticated$ = authState(this.auth).pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
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
  async login(email:string, password:string): Promise<void> {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout(): Promise<void> {
    await signOut(this.auth);
  }

  public emailExists(email:string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(
      map(response => response.length > 0)
    );
  }
}
