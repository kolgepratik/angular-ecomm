import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireAction, DatabaseSnapshot } from '@angular/fire/database';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductAdapter } from '../adapter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private angularFireDatabase: AngularFireDatabase) {}

  get$ (key: string): Observable<Product> {
    return this.angularFireDatabase.object<Product> ('/product/' + key).snapshotChanges ()
      .pipe (
        map ((productWithMetadata: AngularFireAction<DatabaseSnapshot<Product>>) => {
          let product: Product = ProductAdapter.metaToProduct (productWithMetadata);
          
          return product;
        })
      );
  }

  list$ (): Observable<Product[]> {
    return this.angularFireDatabase.list<Product> ('/product/').snapshotChanges ()
      .pipe (
        map ((productWithMetadataList: AngularFireAction<DatabaseSnapshot<Product>>[]) => {
          return ProductAdapter.metaToProductList (productWithMetadataList);
        })
      );
  }

  create (product): firebase.database.ThenableReference {
    return this.angularFireDatabase.list<Product> ('/product/').push (product);
  }

  update (product): Promise<void> {
    return this.angularFireDatabase.object<Product> ('/product/' + product.key).set (product);
  }
}
