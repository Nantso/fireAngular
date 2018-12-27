import { Component, OnInit } from '@angular/core';
import { CustomerService } from './../../sharde/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customerArray = [];
  showDeleteMessage: boolean;

  constructor(private customerService: CustomerService) { }


  ngOnInit() {
    this.customerService.getCustomer().subscribe(
      list => {
        this.customerArray = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      });
  }

  onDelete($key) {
    if (confirm('Vous etes sur de vouloir effacer?')) {
      this.customerService.deleteCustomer($key);
      this.showDeleteMessage = true;
      setTimeout(() => {
        this.showDeleteMessage = false;
      }, 3000);
    }
  }

}
