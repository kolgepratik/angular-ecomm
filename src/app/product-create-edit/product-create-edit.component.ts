import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../models';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create-edit',
  templateUrl: './product-create-edit.component.html',
  styleUrls: ['./product-create-edit.component.css']
})
export class ProductCreateEditComponent implements OnInit {

  public productId: string;
  public product: Product;
  public product$: Observable<Product>;

  public form: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group ({
      title: this.formBuilder.control ('', [Validators.required]),
      price: this.formBuilder.control ('', [Validators.pattern ('\d*')]),
      category: this.formBuilder.control ('', [Validators.required])
    });

    this.productId = this.route.snapshot.paramMap.get ('id');

    console.log (`constructor this.productId: ${this.productId}`);
  }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get ('id');

    console.log (`this.productId: ${this.productId}`);
    
    if (this.productId) {
      this.product$ = this.productService.get$ (this.productId);

      let p$ = this.productService.get$ (this.productId).subscribe ((p: Product) => {
        this.form.setValue ({title: p.title, price: p.price, category: p.category}); 

        p$.unsubscribe();
      });
    } 
  }

  save (form) {
    console.dir (form.value);

    let product: Product = {
      title: form.value.name,
      price: form.value.cost,
      category: 'fruits'
    };

    if (this.productId) {
      // Update existing Product.
      product.key = this.product.key;

      this.productService.update (product).then (() => {
        console.log ('Product updated');
      });
    } else {
      // Create new Product.
      this.productService.create (product).then ((newProduct: Product) => {
        console.dir (`Product Created: ${newProduct}`);
      });
    }
  }

}
