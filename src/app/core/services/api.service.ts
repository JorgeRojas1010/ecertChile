import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public flag: boolean;
  constructor() {
    this.flag = false;
  }

  apiFirmaSuccess() {
    this.flag = true;
  }

  apiSuccess() {
    return this.flag;
  }
}
