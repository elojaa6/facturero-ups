import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm : FormGroup = this.fb.group({
    'username' : ['', [Validators.required]],
    'password' : ['', [Validators.required]]
  });

    constructor(
      public alertController: AlertController,
    private fb: FormBuilder, 
    private userService: UserService,
    private toastController: ToastController,
    private router: Router) { }

  ngOnInit() {
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  async login(){
    if (!this.loginForm.valid) {
      this.datos();
      return false;
    }else{
      this.userService.login(this.loginForm.value)
      .subscribe(
        (data) => {
          
          const usuario = JSON.stringify(data)
          localStorage.setItem('usuario', data.id);

          this.loginForm.reset();
          console.log('Ingreso',data);
          this.mostrarMensaje('El usuario a ingresado correctamente')
          this.router.navigate(['../servicio']);
        },
        (error) =>{
          console.log('Ocurrio un error', error.error);
          this.mostrarMensaje(error.error);
        }
      );
      return true;
    }
    
  }

  async datos(){
    const alert = await this.alertController.create({
      header:'Datos Incompletos',
      message: 'Colocar todos los datos',
      buttons: ['Aceptar']
    });

    await alert.present();
    return
  }

  async mostrarMensaje(mensaje: any){
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  navegacion(){
    this.router.navigate(['../register']);
  }


}