import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaServiceService } from 'src/app/servicios/tarjeta-service.service';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  listTarjeta:any[] = [];
  accion = 'Agregar Tarjeta';
  id: number|undefined;

  form:FormGroup;

  constructor(private fb:FormBuilder, private toastr:ToastrService, private service:TarjetaServiceService) {
    this.form = this.fb.group({
      titular: ['', Validators.required],
      numeroTarjeta: ['', [Validators.maxLength(16), Validators.required, Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }
  
  ngOnInit(): void {
    this.obtenerTarjeta();
  }

  obtenerTarjeta(){
    this.service.getListTarjetas().subscribe({
      
        next: (data) => {
          this.listTarjeta = data;
        },
        error: (e) => console.log(e)
    });
  }

  agregarTarjeta(){
    const tarjeta:any = {
      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value
    };
    if(this.id == 0){
        this.service.guardarTarjeta(tarjeta).subscribe({
            next: () => {
              this.obtenerTarjeta();
              this.toastr.success("Tarjeta agregada", "Tarjeta agregada exitosamente");
              this.form.reset();
            },
            error: () => this.toastr.error("Error", "Error al Guardar la Tarjeta")
        });
    }
    else{
        tarjeta.id = this.id;
        this.service.updateTarjeta(this.id, tarjeta).subscribe({
          next: () => {
            this.accion = 'Agregar Tarjeta';
            this.obtenerTarjeta();
            this.form.reset();
            this.id = undefined;
            this.toastr.info("Tarjeta Modificada Exitosamente", "Tarjeta Modificada");
          },
          error: (e) => {
            this.toastr.error("Error", "Error al modificar Tarjeta");
            console.log(e);
          }
        });
    }
    
  }

  eliminarTarjeta(valor:number){
    this.service.deleteTarjeta(valor).subscribe({
      next: () => {
        this.toastr.success("Tarjeta eliminada", "Tarjeta eliminada exitosamente");
        this.obtenerTarjeta();
      },
      error : (e) => this.toastr.error("Error", "Error al eliminar Tarjeta")
    });
  }

  editarTarjeta(tarjeta:any){
      this.accion = 'Editar Tarjeta';
      this.id = tarjeta.id;

      this.form.patchValue({
        titular: tarjeta.titular,
        numeroTarjeta: tarjeta.numeroTarjeta,
        fechaExpiracion: tarjeta.fechaExpiracion,
        cvv: tarjeta.cvv
      });
  }

}
