import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  public dataUser = [{
    name: 'Ignacio Sepúlveda Aguilera',
    run: '17.888.888-k',
    email: 'Prueba@prueba.cl',
    phone: '+569 9664 4367',
    bank: 'Santander',
    numberAccount: '32289967'
  }]

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  sendData() {
    this.api.apiFirmaSuccess();
    this.router.navigate(['/']);
  }

}
