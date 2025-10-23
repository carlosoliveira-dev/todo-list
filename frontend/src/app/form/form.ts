import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  myForm = new FormControl('');

  clearForm() {
    this.myForm.setValue('');
  }

  onEnter() {
    this.clearForm();
  }

  OnButtonClicked() {
    this.clearForm();
  }

}
  