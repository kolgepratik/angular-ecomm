import { Component, OnInit, OnDestroy } from '@angular/core';

import { User, Product } from "../models";
import { UserService } from '../services';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {

  dataTableOptions;
  productList: Product[];
  dataTableTrigger: Subject<Product> = new Subject();

  constructor(private router: Router, private productService: ProductService) { 
  }

  ngOnInit() {
    this.dataTableOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };
    this.productService.list$()
      .subscribe((productList: Product[]) => {
        this.productList = productList;

        // Calling the DT trigger to manually render the table
        this.dataTableTrigger.next();
      });
  }
  
  ngOnDestroy() {
    this.dataTableTrigger.unsubscribe();
  }

  goManageProduct () {
    this.router.navigate (['/admin/product/manage', '-KrqgOLs07ZkbapP4EGi']);
  }

  goNewProduct () {
    this.router.navigate (['/admin/product/new']);
  }
}
