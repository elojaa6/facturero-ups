import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  clienteRegisterForm : FormGroup = this.fb.group({
    'tipoIdentificacion' : ['', [Validators.required]],
    'identificacionNumero' : ['', [Validators.required]],
    'nombre' : ['', [Validators.required]],
    'direccion' : ['', [Validators.required]],
    'telefono' : ['', [Validators.required]],
    'correoElectronico' : ['', [Validators.required]]
  });

  constructor(
    public alertController: AlertController,
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

  async registerCliente(){
    if (!this.clienteRegisterForm.valid) {
      this.datos();
      return false;
    }else{
      this.userService.registerCliente(this.clienteRegisterForm.value)
      .subscribe(
        data => {
          this.clienteRegisterForm.reset();
          console.log('Hola',data);
          this.mostrarMensaje('El cliente a sido creado correctamente')
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