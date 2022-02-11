import { Component, OnInit } from '@angular/core';
import { Historiaclinica } from 'src/app/model/historiaclinica';
import { Colaborador } from './model/colaborador';
import { DetalleHistoria } from './model/detalle_historia';
import { Mascota } from './model/mascota';
import { ParametrizacionService } from './parametrizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  columnasHistorias: any[];
  historias: Historiaclinica[];
  historiaForm: Historiaclinica;

  //selectedHistoria: Historiaclinica[];

  mascotasDisponibles: Mascota[];
  //mascotaSeleccionada: Mascota;

  colaboradoresDisponibles: Colaborador[];
  detalleHistoriaForm: DetalleHistoria;
  columnasDetalles: any[];
  detalles: DetalleHistoria[];


  displayModal: boolean;
  displayModalDetalle: boolean;

  constructor(private parametrizacionService: ParametrizacionService) {

    this.historiaForm = new Historiaclinica();
    this.detalleHistoriaForm = new DetalleHistoria();

    this.historias = [];
    this.detalles = [];
    this.mascotasDisponibles = [];
    this.colaboradoresDisponibles = [];

  }

  ngOnInit(): void {
    this.getHistorias();
    this.getMascotas();
  }

  getHistorias() {

    this.parametrizacionService.getHistoria().subscribe(
      (res) => {
        this.historias = res;
      }
    );

  }

  getMascotas() {
    this.parametrizacionService.getMascotasDisponibles().subscribe(
      (res) => {
        this.mascotasDisponibles = res;
      }
    );
  }

  getColaboradores() {
    this.parametrizacionService.getColaboradoresDisponibles().subscribe(
      (res) => {
        this.colaboradoresDisponibles = res;
      }
    );
  }


  getDetalleHistorias() {

    this.parametrizacionService.getDetalles().subscribe(
      (res) => {
        this.detalles = res;
      }
    );

  }


  saveHistoria() {
    this.parametrizacionService.guardarHistoria(this.historiaForm).subscribe(
      (res) => {
        this.historiaForm = new Historiaclinica();
        this.getHistorias();
      }
    );
  }

  saveDetalle() {
    this.parametrizacionService.guardarDetalle(this.detalleHistoriaForm).subscribe(
      (res) => {
        this.detalleHistoriaForm = new DetalleHistoria();
        this.closeForm();
        this.getHistorias();
      }
    )
  }


  // editarHistoria(historiaForm: Historiaclinica) {
  //   this.parametrizacionService.editarHistorias(historiaForm).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.historiaForm = new Historiaclinica();
  //       this.getHistorias();
  //     }
  //   );
  // }


  // edithistoria(history: Historiaclinica) {
  //   this.historiaForm = { ...history };
  // }

  // confirmar() {

  //   if (this.historiaForm.idhistoriaclinica) {
  //     this.parametrizacionService.editarHistorias(this.historiaForm).subscribe(
  //       (res) => {
  //         console.log(res);
  //         this.getHistorias();
  //       }
  //     );
  //   } else {
  //     this.parametrizacionService.guardarHistoria(this.historiaForm).subscribe(
  //       (res) => {
  //         console.log(res);
  //         this.getHistorias();
  //       }
  //     );
  //   }
  // }

  deleteHistoria(historia: Historiaclinica) {
    this.parametrizacionService.eliminarHistoria(historia).subscribe(
      (res) => {
        this.historiaForm = res;
        this.getHistorias();
      }
    );
  }

  deleteDetalles(detalle: DetalleHistoria) {
    this.parametrizacionService.eliminarDetalles(detalle).subscribe(
      (res) => {
        this.detalleHistoriaForm = res;
        this.getDetalleHistorias();
        this.getHistorias();
      }
    );
  }


  showForm() {
    this.displayModal = true;
    this.getColaboradores();
    this.historiaForm = new Historiaclinica();
  }

  openForm() {
    this.displayModalDetalle = true;
    this.getDetalleHistorias();
    this.detalleHistoriaForm = new DetalleHistoria();
  }

  closeForm() {
    this.displayModal = false;
  }


}
