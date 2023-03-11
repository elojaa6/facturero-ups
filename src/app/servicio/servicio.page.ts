import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';
import { Servicio } from '../entidades';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.page.html',
  styleUrls: ['./servicio.page.scss'],
})
export class ServicioPage implements OnInit {

  userId: any;

  id = JSON.parse(localStorage.getItem('usuario'));

  servicioRegisterForm : FormGroup = this.fb.group({
    'descripcion' : ['', [Validators.required]],
    'precioUnitario' : ['', [Validators.required]],
    'usuarioId' : [this.id]
  });



  constructor(
    private alertController: AlertController,
    private fb: FormBuilder, 
    private userService: UserService,
    private toastController: ToastController,
    private router: Router
    ) { 
      this.userId = JSON.parse(localStorage.getItem('usuario'));
      console.log('Contructo',this.userId.id)
    }

  ngOnInit() {
    
  }

  focused: boolean = false;

  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  /*registerServicio(){  
    if(!this.servicioRegisterForm.valid){
      return false
    }else{
      console.log('User',this.userId)
      const servicio:Servicio={
        descripcion: this.servicioRegisterForm.get('descripcion')?.value,
        userId: this.userId.id,
        precioUnitario:this.servicioRegisterForm.get('precioUnitario')?.value,
      }
      console.log('form',servicio)
    this.userService.registerServicio(servicio)
    .subscribe(
      data => {
        console.log("Producto",data)
        this.mostrarMensaje("El Producto fue registrado")
        this.servicioRegisterForm.reset()
        //this.router.navigate(['/web/home'])
        
      },
      (error)=>{
        console.log("Los datos estan incorrectos")
        this.mostrarMensaje(error.error)
        
      });
    
    return true
    }
  }*/

  registerServicio(){
    if (!this.servicioRegisterForm.valid) {
      this.datos();
      return false;
    }else{
      this.userService.registerServicio(this.servicioRegisterForm.value)
      .subscribe(
        data => {
          //this.servicioRegisterForm.reset('descripcion');
          console.log('Hola',data);
          this.mostrarMensaje('El servicio a sido creado correctamente')
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

  

  /*listarServicios() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    this.userService.listarServicio().subscribe(dato => {
      this.listadoServicio = dato;
      console.log(dato)
    },
    (error) =>{
      console.log('Ocurrio un error', error.error);
      this.mostrarMensaje(error.error);
    });
  }*/

}
