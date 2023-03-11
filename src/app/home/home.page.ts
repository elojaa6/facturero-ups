import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from '../entidades';
import { LoginPage } from '../login/login.page';
import { RegisterPage } from '../register/register.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuarioDemo:Usuario;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
    if(localStorage.getItem("usuario")===null){
        console.log("hola mundo");
    }else{
      var usuario = JSON.parse(localStorage.getItem('usuario'));
      console.log("usuario recuperado" )
      this.usuarioDemo=usuario;
      console.log(this.usuarioDemo.id);
    }
  }

 

}
