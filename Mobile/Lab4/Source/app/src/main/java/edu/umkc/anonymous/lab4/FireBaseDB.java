package edu.umkc.anonymous.lab4;

import android.nfc.Tag;
import android.support.annotation.NonNull;
import android.util.Log;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class FireBaseDB {
    private static final String TAG = "AddToDatabase";
    private FirebaseDatabase mFirebaseDatabase;
    private FirebaseAuth mAuth;
    private DatabaseReference myRef;
    ProductInfo productread = new ProductInfo();

    String result;
    FireBaseDB() {
        mAuth = FirebaseAuth.getInstance();
        mFirebaseDatabase = FirebaseDatabase.getInstance();
        myRef = mFirebaseDatabase.getReference();
    }

    public void pushToDB (ProductInfo productInfo) {
        FirebaseDatabase database = FirebaseDatabase.getInstance();
        DatabaseReference mDB = database.getReference("products");
       String productID = mDB.push().getKey();
        mDB.child(productID).setValue(productInfo);
    }

    public ProductInfo readFromDb(String productID){

        DatabaseReference mDB = FirebaseDatabase.getInstance().getReference("products");
        mDB.child(productID).addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                productread = dataSnapshot.getValue(ProductInfo.class);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
            // Failed to read value
            Log.d( "Database", "Failed to read value.");
            }
        });
        return productread;
    }

    public void deleteFromDB(String productName){
        DatabaseReference mDB = FirebaseDatabase.getInstance().getReference("products");
        mDB.child(productName).removeValue();
    }
}
