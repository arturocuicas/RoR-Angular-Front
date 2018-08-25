import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

// Services
import { UserService } from '../../services/user.service';

// Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

// Models
import { User } from '../../models/user';

@Component({
  selector: 'users-home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  // Inicializamos las Variables
  title = 'Listado de usuarios Registrados';

  items = [];
  user = [];
  familia= [];
  data = (<any>Array);
  showSpinner1 = false;

  editForm: FormGroup;

  // Modals
  modalEdit: BsModalRef;
  modalConfirm: BsModalRef;

  id_to_delete: string;
  editStatus: boolean = false;

  public itemTemporal = (<any>Array);

  public name;

  // Iniciamos el orden de las columnas por el nombre
  column: string = 'name';
  isDesc: boolean = true;
  direction: number;

  // Posibles atributos para los usuarios
  POSITIONS = [
    'EJECUTIVO PERSONAS', 'AGENTE I', 'AGENTE I', 'AGENTE II',
    'EJECUTIVO SELECT', 'GESTOR COMERCIAL SENIOR', 'EJECUTIVO PYME'
  ];

  AREAS = ['ZONA SUR', 'ZONA NORTE', 'ZONA CENTRO'];

  WORLDS = ['SANTANDER', 'BANEFE', 'BANCO Y FILIALES'];
  
  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadAllUsers();
  }

  private loadAllUsers() {
    this.userService.getAll()
      .pipe(first()).subscribe(data => {
        this.data = data;
        // Extraemos los dos arreglos
        this.user = this.data.user;
        this.familia = this.data.familyGoal;
        // Itermaos los Usuarios para armar el nuevo Obejto con la Familia
        this.user.forEach((item) => {
          let nameFamlily = this.familia.filter((family) => {
            if (item.family_goal_id === family.id)  {
              return true
            }
          });

          // En caso de encontrar coincidencias coloar la etiqueta SIN FAMILIA
          let Familia = nameFamlily.length > 0 ? nameFamlily[0].name : 'SIN FAMILIA';

          // Armamos el nuevo objeto
          let userFill = {
            id: item.id,
            familyGoal: Familia,
            name: item.name,
            position: item.position,
            area: item.area,
            world: item.world
          }
          this.items.push(userFill);
        });

    });
  }

  // Funcion para ordenar y cambiar la direcion del Orden de la tabla
  sort(property){
    this.isDesc = !this.isDesc;
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  get edit() {
    return this.editForm.controls;
  }

  // Abrimos el Modal de Edicion
  openModalEdit(modal, item) {
    this.itemTemporal = item;
    this.editForm = this.formBuilder.group({
      name: [this.itemTemporal.name],
      position: [this.itemTemporal.position],
      area: [this.itemTemporal.area],
      world: [this.itemTemporal.world]
    });
    this.editForm.disable();
    this.modalEdit = this.modalService.show(modal);
  }

  // Habilitamos la Edicion
  toggleForm() {
    this.editStatus = true;
    this.editForm.enable();
  }

  // Cerramos el Modal y desactivamos la edicion
  closeModal(): void {
    this.editStatus = false;
    this.modalEdit.hide();
  }

  //  Guardamos la Edicion
  onSubmit() {

    this.editStatus = false;
    this.editForm.disable();
    this.modalEdit.hide();
  }

  // Abrimos el Modal de Confirmacion para eliminar el usuario
  openModalConfirm(modal, item) {
    this.itemTemporal = item;
    this.id_to_delete = item.id;
    this.modalConfirm = this.modalService.show(modal, {class: 'modal-sm'});
  }

  // Eliminamos el registro...
  confirm(id): void {
    this.showSpinner1 = true;
    this.modalConfirm.hide();
    this.userService.delete(id)
      .pipe(first()).subscribe(() => {
        this.loadAllUsers();
        this.showSpinner1 = false;
    });
  }

  // Cerramos el Modal sin eliminar el registro...
  decline(): void {
    this.modalConfirm.hide();
  }

}
