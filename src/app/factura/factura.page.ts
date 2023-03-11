import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { UserService } from '../api/user.service';
import { Cliente, Detalles, Servicio } from '../entidades';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  servicioT: Servicio[] = []
  dettalle: Detalles = new Detalles();
  detalles: Detalles[] = JSON.parse(localStorage.getItem("det"));
  detalles1: any[] = JSON.parse(localStorage.getItem("det"));
  subtotal: number = +localStorage.getItem("subtotal");
  total: number
  totalF: number = +localStorage.getItem("totalfinal");
  impuesto: number = +localStorage.getItem("iva");

  det = [];
  suscription: Subscription;
  cliente: Cliente = new Cliente();
  servicio: Servicio = new Servicio();
  date=new Date()

  id = JSON.parse(localStorage.getItem('usuario'));

  facturaRegisterForm: FormGroup = this.fb.group({
    'fechaDeEmision': this.date.getFullYear()+"-0"+(this.date.getMonth() + 1)+"-"+this.date.getDate(),
    "subtotal": localStorage.getItem("subtotal"),
    "impuesto": localStorage.getItem("iva"),
    "total": localStorage.getItem("totalfinal"),
    "clienteId": ['', [Validators.required]],
    'usuarioId': +localStorage.getItem('usuario'),
    "detalles": [JSON.parse(localStorage.getItem("det"))]


  });



  constructor(
    private userService: UserService,
    private toastController: ToastController,
    private router: Router,
    private fb: FormBuilder,

  ) { }

  ngOnInit() {
    let date = new Date().toLocaleDateString();
    console.log(date)
    localStorage.setItem("date",date)
  }

  focused: boolean = false;
  
  onBlur(event: any){
    const value = event.target.value;

    if (!value) {
      this.focused = false;
    }
  }

  buscarClienteIdentificacion(identificacion: string) {
    this.userService.buscarCedulaCliente(identificacion).subscribe(
      (data) => {
        this.cliente = data;
        console.log("encontrado" + this.cliente)
        this.mostrarMensaje('Cliente Encontrado')
      }, (error) => {
        this.mostrarMensaje(error.error)

      }
    )

  }

  
  cargarfactura() {
    if (!this.facturaRegisterForm.valid) {
      return false;
    } else {

      this.userService.registerFactura(this.facturaRegisterForm.value)
        .subscribe(
          (data) => {
            console.log('hola', data)

            this.facturaRegisterForm.reset();
            localStorage.removeItem("subtotal")
            localStorage.removeItem("totalfinal")
            localStorage.removeItem("iva")
            localStorage.removeItem("det"),
            this.mostrarMensaje('Factura Creada exitosamente');
            this.det.pop()
            this.router.navigate(['factura-list']);
          },
          (error) => {
            //console.log('Ocurrio un error', error.error)
            this.mostrarMensaje(error.error)
          }
        );
      return true;
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

}
