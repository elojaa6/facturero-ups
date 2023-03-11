import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../api/user.service';
import { Servicio } from '../entidades';


@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.page.html',
  styleUrls: ['./factura-detalle.page.scss'],
})
export class FacturaDetallePage implements OnInit {
  
  pre=0
  subtotal: number;
  total: number
  totalF: number
  impuesto: number
  servicioT: Servicio[] = []
  det = [];
  serviciof: Servicio= new Servicio;

  listadoServicios : Servicio[] = []

  userId: any;

  facturaRegisterForm: FormGroup = this.fb.group({
    'producto': ['',[Validators.required]],
    'precioUnitario': ['',[Validators.required]],
    'cantidad1': ['',[Validators.required]],

  });

  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router,
    private alertController: AlertController,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.cargarCliente();
  }

  focused: boolean = false;
  
    onBlur(event: any){
      const value = event.target.value;
  
      if (!value) {
        this.focused = false;
      }
    }

  cargarCliente() {

    /*this.userId = JSON.parse(localStorage.getItem('usuario'));

    this.userService.listarAllServicio(this.userId.id)
      .subscribe(servicios => {
        this.servicioT = servicios


      });*/

    const id = JSON.parse(localStorage.getItem('usuario'));
    console.log(id)

    this.userService.listarServicio(id).subscribe(servicios => {
      this.listadoServicios = servicios;
    })
  }

  agregarDetalles(precio: number, idServicio: number, cantidad1: number, nom: string) {
  
    if (!this.facturaRegisterForm.valid) {
      this.datos();
    } else {
      this.total = precio * cantidad1;
      this.total.toFixed(2);

      this.det.push(
        {
          "cantidad": cantidad1,
          "precioUnitario": precio,
          "total": this.total,
          "servicioId": idServicio,
          "descripcion": nom

        }

      )

      this.subtotal = +localStorage.getItem("subtotal");

      console.log(this.subtotal)
      this.subtotal = (this.total + this.subtotal);
      this.impuesto = (this.subtotal * 0.12);
      this.totalF = this.impuesto + this.subtotal

      localStorage.setItem("subtotal", "" + this.subtotal.toFixed(2))
      localStorage.setItem("totalfinal", "" + this.totalF.toFixed(2))
      localStorage.setItem("iva", "" + this.impuesto.toFixed(2))
      localStorage.setItem("det", JSON.stringify(this.det))

      console.log(this.det)
      this.facturaRegisterForm.reset()
    }


  }

  cancelar(){
  
    localStorage.removeItem("subtotal")
    localStorage.removeItem("totalfinal")
    localStorage.removeItem("iva")
    localStorage.removeItem("det")
    this.det.shift()
      this.subtotal = 0
      this.impuesto = 0
      this.totalF = 0

      this.router.navigate(['../listar-factura'])
  }

  siguiente() {

    //  console.log("Termiando "+this.det.length)
    if (this.det.length == 0) {
      this.mostrarMensaje('No ha agregado productos para la facturación');
    } else {
      this.det.shift()
      this.subtotal = 0
      this.impuesto = 0
      this.totalF = 0

      this.router.navigate(['../factura'])

    }



  }
  async mostrarMensaje(mensaje: any) {
    const toast = await this.toastController.create({
      position: 'top',
      message: mensaje,
      duration: 1500
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

  currentFood = undefined;
  handleChange(ev) {
    this.currentFood = ev.target.value;
    console.log(this.currentFood)
   

    this.serviciof=this.currentFood
    console.log(this.serviciof.descripcion)
    

  }

}
