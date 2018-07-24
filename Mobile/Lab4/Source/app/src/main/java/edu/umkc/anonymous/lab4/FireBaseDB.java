package edu.umkc.anonymous.lab4;

import android.nfc.Tag;
import android.util.Log;

import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class FireBaseDB {
    private DatabaseReference mDatabase;
    String result;
    FireBaseDB() {
    }

    public void pushToDB (ProductInfo productInfo) {
        //String product_Name, String product_Price, String product_UPC, String image_url, String size, String manufacturer, String features, String siteName, String discription
        mDatabase = FirebaseDatabase.getInstance().getReference();
        DatabaseReference mDB = FirebaseDatabase.getInstance().getReference("products");
        String productID = mDB.push().getKey();
        //ProductInfo product = new ProductInfo(product_Name,product_Price,product_UPC,image_url,size,manufacturer,features,siteName,discription);
        mDB.child(productID).setValue(productInfo);
    }

    public String readFromDb(String productID){
        DatabaseReference mDB = FirebaseDatabase.getInstance().getReference("products");
        mDB.child(productID).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                ProductInfo product = dataSnapshot.getValue(ProductInfo.class);
                result = product.toString();
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            // Failed to read value
            Log.d( "Database", "Failed to read value.");
            }
        });
        return result;
    }

    public void deleteFromDB(String productID){
        DatabaseReference mDB = FirebaseDatabase.getInstance().getReference("products");
        mDB.child(productID).removeValue();
    }
}
