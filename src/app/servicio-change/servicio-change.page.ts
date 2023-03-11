import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-servicio-change',
  templateUrl: './servicio-change.page.html',
  styleUrls: ['./servicio-change.page.scss'],
})
export class ServicioChangePage implements OnInit {

  servicioId: number = 0;

  servicioUpdateForm:FormGroup=this.fb.group({
    descripcion: ['',[Validators.required]],
    precioUnitario: ['',[Validators.required]],
    id:[''],
  })

  userId:any

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService:UserService,
    private toastController:ToastController,
    private router:Router) { 

    this.userId = JSON.parse(localStorage.getItem('usuario'));
    console.log('Cambio',this.userId.id)
  }

  ngOnInit() {
    this.servicioId = parseInt(this.route.snapshot.paramMap.get('servicio') ?? '0');
    console.log(this.servicioId)
    const usuario = this.userId.id
    if (this.servicioId ) {
      this.userService.buscarIdServicio(usuario, this.servicioId)
        .subscribe(data => {
          console.log(data);
          this.servicioUpdateForm?.setValue({
            descripcion: data?.descripcion,
            precioUnitario: data?.precioUnitario,
            id:this.servicioId
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


  updateServicio(){
    if(!this.servicioUpdateForm.valid){
      return false
    }else{
    this.userService.editarServicio(this.servicioUpdateForm.value).
    subscribe(
      (res:any)=>{
        console.log("Servicio",res)
        this.mostrarMensaje("El Servicio fue actualizado")
        this.servicioUpdateForm.reset()
        this.router.navigate(['/../servicio-list'])
        
      },
      (error)=>{
        console.log("Los datos estan incorrectos")
        this.mostrarMensaje(error.error)
        
      });
    
    return true
    }
  }
  async mostrarMensaje(mensaje:any){
    const toast=await this.toastController.create({
      position:'top',
      message: mensaje,
      duration:3000
    })
    toast.present()
  }
  
}