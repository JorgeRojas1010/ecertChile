import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from "rxjs/operators";
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public dataForm: FormGroup;
  public bankForm: FormGroup;
  public isChangeButton: boolean;
  public bankList = [
    { name: 'Banco Bci' },
    { name: 'Banco de Chile' },
    { name: 'Banco Estado' },
    { name: 'Banco Santander' },
    { name: 'Banco BICE' },
    { name: 'Banco Condell' },
    { name: 'Banco CrediChile' },
    { name: 'Banco Edwards Citi' },
    { name: 'Banco Falabella' },
    { name: 'Banco Internacional' },
    { name: 'Banco Itaú' },
    { name: 'Banco Ripley' },
    { name: 'Banco Security' }, 
    { name: 'Scotiabank' }
  ];
  

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private router: Router
  ) {
    const regExp = {
      text: /^[a-zA-Z\s]*$/,
      alpha: /^[a-zA-Z0-9\-]*$/,
      emails: /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      phone: /^[0-9\-\s]*$/,
    };
    this.dataForm = this.fb.group({
      namePay         : ['', [Validators.required, Validators.pattern(regExp.text)]],
      runPay          : ['', [Validators.required, Validators.pattern(regExp.alpha)]],
      emailPay        : ['', [Validators.required, Validators.pattern(regExp.emails)]],
      phonePay        : ['', [Validators.required, Validators.pattern(regExp.phone), Validators.minLength(9)]],
      checkUseData    : [false],
      nameClient      : ['', [Validators.required, Validators.pattern(regExp.text)]],
      runClient       : ['', [Validators.required, Validators.pattern(regExp.alpha)]],
      emailClient     : ['', [Validators.required, Validators.pattern(regExp.emails)]],
      phoneClient     : ['', [Validators.required, Validators.pattern(regExp.phone), Validators.minLength(9)]]
    });
    this.bankForm = this.fb.group({
      bankPay         : ['', Validators.required],
      numberAccountPay: ['', Validators.required]
    });
    this.isChangeButton = false;
  }

  ngOnInit(): void {
    /**
     * open signature confirmation modal
     */
    // const flag = this.apiService.apiSuccess();
    // console.log('flag', flag);


    this.dataForm.valueChanges.pipe(debounceTime(400)).subscribe(res => {
      const { checkUseData, emailPay, namePay, phonePay, runPay } = res;
      if (checkUseData === true) {
        this.dataForm.controls['nameClient'].setValue(namePay);
        this.dataForm.controls['runClient'].setValue(runPay);
        this.dataForm.controls['emailClient'].setValue(emailPay);
        this.dataForm.controls['phoneClient'].setValue(phonePay);
      }
    })
  }

  /**
   * Send payer and customer data
   */
  public sendData() {
    if (this.dataForm.valid) {
      this.inputDisabled()
      this.isChangeButton = true;
    }
  }

  /**
   * Confirm bank data
   */
  public sendDataBank() {
    this.router.navigate(['/document']);
  }

  /**
   * Set inputs disabled
   */
  private inputDisabled() {
    Object.keys(this.dataForm.controls).forEach(key => {
      if (key !== 'bankPay' && key !== 'numberAccountPay' && key !== 'checkUseData') {
        this.dataForm.controls[key].disable();
      }
    });
  }

  /**
   * Do not use the same data
   */
  public releaseInput() {
    if (this.dataForm.controls['checkUseData'].value === true) {
      this.dataForm.controls['checkUseData'].setValue(false);
    }
  }
}
