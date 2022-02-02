import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjeta:any[] = [
    {titular: 'Juan Perez', numeroTarjeta: '1231243423', fechaExpiracion: '11/12', cvv: '123'},
    {titular: 'Miguel Gonzalez', numeroTarjeta: '9876431643', fechaExpiracion: '11/24', cvv: '312'}
  ];

  form:FormGroup;

  constructor(private fb:FormBuilder, private toastr:ToastrService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.maxLength(16), Validators.required, Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  agregarTarjeta(){

    const tarjeta:any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };
    this.listTarjeta.push(tarjeta);
    this.toastr.success("Tarjeta agregada", "Tarjeta agregada exitosamente");
    this.form.reset();
  }

  ngOnInit(): void {
  }

  eliminarTarjeta(valor:number){
    this.listTarjeta.splice(valor,1);
    this.toastr.error("Tarjeta eliminada", "Tarjeta eliminada exitosamente");
  }

}
