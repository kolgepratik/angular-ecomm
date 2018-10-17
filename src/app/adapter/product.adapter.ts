import { AngularFireAction, DatabaseSnapshot } from "@angular/fire/database";
import { Product } from "../models";

export class ProductAdapter {

    static metaToProduct (productAndMetadata: AngularFireAction<DatabaseSnapshot<Product>>): Product {
        let product: Product = productAndMetadata.payload.val ();
        product.key = productAndMetadata.key;

        return product;
    }

    static metaToProductList (productAndMetadataList: AngularFireAction<DatabaseSnapshot<Product>>[]): Product[] {
        let productList = new Array();

        productAndMetadataList.forEach(productAndMetadata => {
            productList.push (ProductAdapter.metaToProduct (productAndMetadata));
        });

        return productList;
    }
    
}