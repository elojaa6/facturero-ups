import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {


  userRegisterForm : FormGroup = this.fb.group({
    'username' : ['', [Validators.required]],
    'password' : ['', [Validators.required]],
    'confirmPassword' : ['', [Validators.required]]
  });

  constructor(
    private alertController: AlertController,
    private fb: FormBuilder, 
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
    ) { }

  ngOnInit() {
    
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  register(){
    if (!this.userRegisterForm.valid) {
      this.datos();
      return false;
    }else{
      this.userService.register(this.userRegisterForm.value)
      .subscribe(
        data => {
          this.userRegisterForm.reset();
          console.log('Hola',data);
          this.mostrarMensaje('El usuario a sido creado correctamente')
          this.router.navigate(['../login']);
        },
        (error) =>{
          console.log('Ocurrio un error', error.error);
          this.mostrarMensaje(error.error);
        }
      );
      return true;
    }
    
  }

  async mostrarMensaje(mensaje: any){
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 3000
    });
    toast.present();
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


}
