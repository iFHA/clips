import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidators {
  static match(controlName: string, confirmControlName:string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const confirmControl = formGroup.get(confirmControlName);
      if(!control || !confirmControl) {
        console.error("Form controls cannot be found in the form group");
        return {
          controlNotFound: true
        };
      }
      const valuesMatch = control.value === confirmControl.value;
      const error = valuesMatch ? null : { noMatch: true };
      confirmControl.setErrors(error);
      return error;
    }
  }
}
