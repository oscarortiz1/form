import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ThisReceiver } from '@angular/compiler';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  validate: boolean = false;

  user: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.minLength(3)]),
    document: new FormControl('', [
      Validators.required,
      Validators.min(999999999),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl('', [Validators.required]),
    age: new FormControl('', [
      Validators.required,
      Validators.max(100),
      Validators.min(0),
    ]),
    hobby: new FormControl('', [Validators.required]),
  });

  gender: string[] = ['Masculino', 'Femenino'];

  ngOnInit() {}

  constructor(public dialog: MatDialog, private userService: UserService) {}

  onSubmit() {
    this.validate = true;

    if (this.user.valid) {
      if (this.user.value.gender === 'Femenino') {
        try {
          this.userService.saveUser({
            name: this.user.value.name,
            lastName: this.user.value.lastName,
            document: this.user.value.document,
            email: this.user.value.email,
            gender: this.user.value.gender,
            hobby: this.user.value.hobby,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          this.userService.saveUser({
            name: this.user.value.name,
            lastName: this.user.value.lastName,
            document: this.user.value.document,
            email: this.user.value.email,
            age: this.user.value.age,
            gender: this.user.value.gender,
            hobby: this.user.value.hobby,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
    this.dialog.open(DialogComponent, { data: this.user.value });
    this.user.reset();
    this.validate = false;
  }

  onchangeGender() {
    if (this.user.value.gender === 'Femenino') {
      this.user.controls['age'].setValidators([]);
    } else {
      this.user.controls['age'].setValidators([
        Validators.required,
        Validators.max(100),
        Validators.min(0),
      ]);
    }
  }
}
