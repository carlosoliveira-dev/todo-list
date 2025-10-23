import { Component, signal, WritableSignal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  myForm = new FormControl('');
  newTask: WritableSignal<string> = signal('')

  clearForm() {
    this.myForm.setValue('');
  }

  onEnter() {
    
    let myFormValue = this.myForm.value;
        
    if (myFormValue != null) {
      this.newTask.set(myFormValue);
    }

    this.clearForm();
  }

  OnButton() {
    this.clearForm();
  }

}
