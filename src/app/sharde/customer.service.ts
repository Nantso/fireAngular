import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }

  customerList: AngularFireList<any>;
  form = new FormGroup({

    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    prenom: new FormControl(''),
    contact: new FormControl('', [Validators.required, Validators.minLength(8)]),
    adresse: new FormControl('', Validators.required)
  });

  getCustomer() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  addCustomer(customer) {

    this.customerList.push({
      nom: customer.nom,
      prenom: customer.prenom,
      contact: customer.contact,
      adresse: customer.adresse
    });
  }

  populateForm(customer) {
    this.form.setValue(customer);
  }

  updateCustomer(customer) {

    this.customerList.update(customer.$key, {
      nom: customer.nom,
      prenom: customer.prenom,
      contact: customer.contact,
      adresse: customer.adresse
    });
  }

  deleteCustomer($key: string)  {
  this.customerList.remove($key);
  }
}
