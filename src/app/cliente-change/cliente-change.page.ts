import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-cliente-change',
  templateUrl: './cliente-change.page.html',
  styleUrls: ['./cliente-change.page.scss'],
})
export class ClienteChangePage implements OnInit {

  cedula : string = '';

  clienteUpdateForm : FormGroup = this.fb.group({
    id: [''],
    tipoIdentificacion : ['', [Validators.required]],
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
    private router: Router,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.cedula = this.route.snapshot.paramMap.get('cedula') ?? '';
      console.log(this.cedula);
      if (this.cedula) {
        this.userService.buscarCedulaCliente(this.cedula)
        .subscribe(data =>{
          this.clienteUpdateForm?.setValue({
            id:data.id!,
            tipoIdentificacion: data.tipoIdentificacion,
            identificacionNumero: data.identificacionNumero,
            nombre: data.nombre,
            direccion: data.direccion,
            telefono: data.telefono,
            correoElectronico: data.correoElectronico,
          });
        });
        
      }
    }
  
    focused: boolean = false;
  
    onBlur(event: any){
      const value = event.target.value;
  
      if (!value) {
        this.focused = false;
      }
    }

  async updateCliente(){
    if (!this.clienteUpdateForm.valid) {
      this.datos();
      return false;
    }else{
      this.userService.editarCliente(this.clienteUpdateForm.value)
      .subscribe(
        data => {
          this.clienteUpdateForm.reset();
          console.log('Hola',data);
          this.mostrarMensaje('El cliente fue actualizado correctamente')
          this.router.navigate(['/../cliente-list'])
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