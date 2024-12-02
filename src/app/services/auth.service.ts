import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, fetchSignInMethodsForEmail, signInWithCredential, signInWithEmailAndPassword, signOut, updateProfile, User } from '@angular/fire/auth';
import { collection, CollectionReference, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { delay, map, filter, switchMap, tap } from 'rxjs/operators';
import IUser from '../models/user.model';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: CollectionReference<IUser, IUser>;
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  private redirect: boolean = false;

  constructor (
    private readonly auth:Auth,
    private readonly db:Firestore,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.usersCollection = collection(this.db, "users") as CollectionReference<IUser, IUser>;
    this.isAuthenticated$ = authState(this.auth).pipe(
      map(user => !!user)
    );
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    );
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
        map(() => {
          let activeRoute = this.route;
          while (activeRoute.firstChild) {
            activeRoute = activeRoute.firstChild; // Navega para a rota ativa
          }
          return activeRoute;
        }),
      switchMap(route => route.data ?? of({}))
    ).subscribe((data) => {
      this.redirect = data['authOnly'] ?? false;
    });
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
    if(this.redirect) {
      await this.router.navigateByUrl('/');
    }
  }

  public emailExists(email:string): Observable<boolean> {
    return from(fetchSignInMethodsForEmail(this.auth, email)).pipe(
      map(response => response.length > 0)
    );
  }

  public getCurrentUser(): User | null {
    return this.auth.currentUser;
  }
}
