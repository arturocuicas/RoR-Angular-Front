import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService } from '../../services/alert.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'user-new',
  templateUrl: './new.component.html'
})

export class NewComponent implements OnInit {

  title = 'Nuevo Usuario';
  newForm: FormGroup;
  loading = false;
  submitted = false;

  POSITIONS = [
    'EJECUTIVO PERSONAS', 'AGENTE I', 'AGENTE I', 'AGENTE II',
    'EJECUTIVO SELECT', 'GESTOR COMERCIAL SENIOR', 'EJECUTIVO PYME'
  ];

  AREAS = ['ZONA SUR', 'ZONA NORTE', 'ZONA CENTRO'];

  WORLDS = ['SANTANDER', 'BANEFE', 'BANCO Y FILIALES'];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    // private alertService: AlertService,
    private userService: UserService
  ) {}

  ngOnInit() {

    this.newForm = this.formBuilder.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      area: ['', Validators.required],
      world: ['', Validators.required]
    });
  }

  get new() {
    return this.newForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;

    this.userService.create(this.newForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Nuevo Usuario Registrado', true);
          this.router.navigate(['/']);
        },
        error => {
          // this.alertService.error(error.error.text);
          this.loading = false;
        }
      );
  }
}
