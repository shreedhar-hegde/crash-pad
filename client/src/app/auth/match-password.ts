import { FormGroup, Validator } from '@angular/forms'
import { Injectable } from '@angular/core'

@Injectable({providedIn: 'root'})
export class MatchPassword implements Validator {

    validate(formGroup: FormGroup) {
        // console.log('match password',formGroup.value)
        const { password, confirmPassword } = formGroup.value
        if(password === confirmPassword) {
            return null
        }
        else {
            return {passwordsDontMatch: true}
        }
    }

}
