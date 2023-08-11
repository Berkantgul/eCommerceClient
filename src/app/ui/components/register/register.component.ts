import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/user/create-user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: CustomToastrService
  ) { }
  frm: FormGroup
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      userName: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)
      ]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email
      ]],
      password: ["",
        [
          Validators.required
        ]],
      checkPassword: ["",
        [
          Validators.required
        ]]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrar = group.get("checkPassword").value;
        return sifre === sifreTekrar ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submitted: boolean = false;
  async onSubmit(user: User) {
    this.submitted = true;
    debugger
    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.createUser(user)
    debugger
    if (result.succeeded==true)
      this.toastr.message(result.message, "Başarılı", { messageType:ToastrMessageType.Success,toastrPosition: ToastrPosition.TopRight })

    else
      this.toastr.message(result.message, "Hata", { messageType: ToastrMessageType.Error, toastrPosition: ToastrPosition.TopRight })

  }  
}
