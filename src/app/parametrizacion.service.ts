
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Historiaclinica } from 'src/app/model/historiaclinica';
import { DetalleHistoria } from './model/detalle_historia';

@Injectable()
export class ParametrizacionService {
    endpoint: string;
    api: string;

    constructor(private http: HttpClient) {
        // this.endpoint = 'parametrizacion';
        //this.api = `${environment.api}`
    }


    getHistoria(): Observable<any> {
        return this.http.get('http://localhost:8080/controller/historias');
    }

    getDetalles(): Observable<any> {
        return this.http.get('http://localhost:8080/controller/detalles');
    }


    getMascotasDisponibles(): Observable<any> {
        return this.http.get('http://localhost:8080/controller/mascotas');
    }

    getColaboradoresDisponibles(): Observable<any> {
        return this.http.get('http://localhost:8080/controller/colaboradores');
    }

    guardarHistoria(historiaForm: Historiaclinica): Observable<any> {
        return this.http.post('http://localhost:8080/controller/agregarHistoria', historiaForm, { headers: this.createRequestHeader() });
    }

    guardarDetalle(detalleHistoriaForm: DetalleHistoria): Observable<any> {
        return this.http.post('http://localhost:8080/controller/detallehistoria', detalleHistoriaForm, { headers: this.createRequestHeader() });
    }

    eliminarHistoria(historia: Historiaclinica): Observable<any> {
        return this.http.delete('http://localhost:8080/controller/historias/' + historia.idhistoriaclinica, { headers: this.createRequestHeader() });
    }


    editarHistorias(editedHistoria: Historiaclinica): Observable<any> {
        return this.http.put('http://localhost:8080/controller/historias/' + editedHistoria.idhistoriaclinica, { headers: this.createRequestHeader() });
    }



    private createRequestHeader() {
        return new HttpHeaders({
            "Content-Type": "application/json",
        });
    }
}