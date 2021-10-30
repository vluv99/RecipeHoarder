import {AbstractControl, ValidatorFn} from "@angular/forms";

export default class FormValidation {

    static compare(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl == null || control == null){
                return null;
            }

            if (checkControl.errors && !checkControl.errors.matching) {
                return null;
            }

            if (control.value !== checkControl.value) {
                controls.get(checkControlName)!.setErrors({ matching: true });
                return { matching: true };
            } else {
                return null;
            }
        };
    }
}
