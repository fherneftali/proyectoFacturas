import { FirestoreService } from './../services/firestore/firestore.service';
import { Component, OnInit} from '@angular/core';
import datosFact from '../../assets/js/cargar.js';
@Component({
  selector: 'app-cargar-file',
  templateUrl: './cargar-file.component.html',
  styleUrls: ['./cargar-file.component.css']
})
export class CargarFileComponent implements OnInit {

  public facturas = [];

  constructor() { }
  ngOnInit() {}
}
