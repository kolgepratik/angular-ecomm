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

  public productKey: string;
  public product: Product;
  public product$: Observable<Product>;

  public form: FormGroup;

  constructor(private route: ActivatedRoute, private productService: ProductService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group ({
      title: this.formBuilder.control ('', [Validators.required]),
      price: this.formBuilder.control ('', [Validators.pattern ('\d*')]),
      category: this.formBuilder.control ('', [Validators.required]),
      imageUrl: this.formBuilder.control ('', [Validators.required])
    });

    this.productKey = this.route.snapshot.paramMap.get ('key');

    console.log (`constructor this.productKey: ${this.productKey}`);
  }

  ngOnInit() {
    this.productKey = this.route.snapshot.paramMap.get ('key');

    console.log (`this.productKey: ${this.productKey}`);
    
    if (this.productKey) {
      this.product$ = this.productService.get$ (this.productKey);

      let p$ = this.productService.get$ (this.productKey).subscribe ((p: Product) => {
        this.form.setValue ({title: p.title, price: p.price, category: p.category, imageUrl: p.imageUrl}); 

        //p$.unsubscribe();
      });
    } 
  }

  saveProduct () {
    console.dir (this.form.value);

    let product: Product = {
      title: this.form.value.title,
      price: this.form.value.price,
      category: this.form.value.category,
      imageUrl: this.form.value.imageUrl
    };

    console.dir (this.productKey);
    console.dir (product);

    if (this.productKey) {
      // Update existing Product.
      this.productService.update (this.productKey, product).then (() => {
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
