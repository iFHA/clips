import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, confirmControlName:string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const confirmControl = formGroup.get(confirmControlName);
      if(!control || !confirmControl) {
        return {
          controlNotFound: true
        };
      }
      if(control.value !== confirmControl.value) {
        return {
          noMatch: true
        }
      }
      return null;
    }
  }
}
