import { AbstractControl, AsyncValidatorFn } from "@angular/forms";
import { catchError, map, of } from "rxjs";
import { AuthService } from "../../services/auth.service";

export function emailTakenValidator(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl) => {
    if (!control.value) {
      return of(null); // Retorna válido se o campo estiver vazio
    }
    return authService.emailExists(control.value).pipe(
      map(emailExists => (emailExists ? { emailTaken: true } : null)),
      catchError(() => of(null)) // Retorna válido em caso de erro no serviço
    );
  };
}
