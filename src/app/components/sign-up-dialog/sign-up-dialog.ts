import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAnchor, MatIconButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatPrefix, MatSuffix } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { EcommerceStore } from '../../ecommerce-store';
import { SignUpParams } from '../../models/user';
import { SignInDialog } from '../sign-in-dialog/sign-in-dialog';

@Component({
  selector: 'app-sign-up-dialog',
  imports: [
    MatIconButton,
    MatIcon,
    MatDialogClose,
    MatFormField,
    MatInput,
    MatSuffix,
    MatPrefix,
    MatAnchor,
    ReactiveFormsModule,
  ],
  template: `
    <div class="p-8 max-w-[400px] flex flex-col">
      <div class="flex justify-between">
        <div>
          <h2 class="text-xl font-medium mb-1">Sign up</h2>
          <p class="text-sm text-gray-500">Join us and start shopping today</p>
        </div>
        <button tabindex="-1" matIconButton class="-mt-2 -mr-2" mat-dialog-close>
          <mat-icon>close</mat-icon>
        </button>
      </div>

      <form action="" class="mt-6 flex flex-col" [formGroup]="signUpForm" (ngSubmit)="signUp()">
        <mat-form-field class="w-full mb-4">
          <input type="text" matInput formControlName="name" placeholder="Enter your name" />
          <mat-icon matPrefix>person</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full mb-4">
          <input type="email" matInput formControlName="email" placeholder="Enter your email" />
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <mat-form-field class="w-full mb-6">
          <input
            [type]="passwordVisible() ? 'text' : 'password'"
            matInput
            formControlName="password"
            placeholder="Enter your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
          <button
            matSuffix
            matIconButton
            type="button"
            class="mr-2"
            (click)="passwordVisible.set(!passwordVisible())"
          >
            <mat-icon [fontIcon]="passwordVisible() ? 'visibility_off' : 'visibility'"></mat-icon>
          </button>
        </mat-form-field>

        <mat-form-field class="w-full mb-6">
          <input
            type="password"
            matInput
            formControlName="confirmPassword"
            placeholder="Confirm your password"
          />
          <mat-icon matPrefix>lock</mat-icon>
        </mat-form-field>

        <button type="submit" matButton="filled" class="w-full">
          <!-- {{ store.loading() ? 'Creating Account...' : 'Create Account' }} -->
          Create an Account
        </button>
      </form>

      <p class="text-sm text-gray-500 mt-2 text-center">
        Already have an account?
        <a class="text-blue-500 cursor-pointer" (click)="openSignInDialog()">Sign Up</a>
      </p>
    </div>
  `,
  styles: ``,
})
export class SignUpDialog {
  fb = inject(NonNullableFormBuilder);
  dialogRef = inject(MatDialogRef);
  store = inject(EcommerceStore);
  data = inject<{ checkout: boolean }>(MAT_DIALOG_DATA);
  matDialog = inject(MatDialog);

  passwordVisible = signal(false);

  signUpForm = this.fb.group({
    name: ['John D', Validators.required],
    email: ['john@test.com', Validators.required],
    password: ['password123', Validators.required],
    confirmPassword: ['password123', Validators.required],
  });

  signUp() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.signUpForm.value;

    this.store.signUp({
      name,
      email,
      password,
      dialogId: this.dialogRef.id,
      checkout: this.data?.checkout ?? false,
    } as SignUpParams);
  }

  openSignInDialog() {
    this.dialogRef.close();
    this.matDialog.open(SignInDialog, {
      disableClose: true,
      data: {
        checkout: this.data.checkout,
      },
    });
  }
}
