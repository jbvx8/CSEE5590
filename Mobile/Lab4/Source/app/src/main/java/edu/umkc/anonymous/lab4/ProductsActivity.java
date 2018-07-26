package edu.umkc.anonymous.lab4;

import android.app.ProgressDialog;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.Html;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.android.gms.vision.barcode.Barcode;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.semantics3.api.Products;
import com.squareup.picasso.Picasso;

import org.json.semantics3.JSONArray;
import org.json.semantics3.JSONObject;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;

public class ProductsActivity extends AppCompatActivity {

    ArrayList<String> r = new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_products);

        Barcode barcode = getIntent().getParcelableExtra(BarcodeCaptureActivity.BarcodeObject);
        new GetProductsTask().execute(barcode);
    }

    private class GetProductsTask extends AsyncTask<Barcode, Void, JSONObject> {
        ProgressDialog progress = new ProgressDialog(ProductsActivity.this);

        @Override
        protected void onPreExecute() {
//            this.progress.setMessage("Please wait");
//            this.progress.show();
        }
        @Override
        protected JSONObject doInBackground(Barcode... barcode) {
            String upc = barcode[0].displayValue;
            JSONObject results = new JSONObject();

            Products products = new Products(BuildConfig.PRODUCT_API_KEY, BuildConfig.PRODUCT_API_SECRET);
            products
                    .productsField("upc", upc);

            try {
                results = products.getProducts();
                Log.d("Success", "Products returned.");

            } catch (OAuthMessageSignerException e) {
                e.printStackTrace();
            } catch (OAuthExpectationFailedException e) {
                e.printStackTrace();
            } catch (OAuthCommunicationException e) {
                e.printStackTrace();
            } catch (IOException e) {
                e.printStackTrace();
            } catch (URISyntaxException e) {
                e.printStackTrace();
            }
            return results;
        }

        protected void onPostExecute(JSONObject results) {
//            if (progress.isShowing()) {
//                progress.dismiss();
//            }

            //printResults(results);


            ProductInfo info = createProductInfo(results);

            displayResults(info);
            //shList();
        }
    }
    public void shList(){
        DatabaseReference ref = FirebaseDatabase.getInstance().getReference().child("products");
        ref.addListenerForSingleValueEvent(
                new ValueEventListener() {
                    @Override
                    public void onDataChange(DataSnapshot dataSnapshot) {
                        //Get map of users in datasnapshot
                        if(dataSnapshot != null) {
                            collectPhoneNumbers((Map<String, Object>) dataSnapshot.getValue());
                        }
                    }

                    @Override
                    public void onCancelled(DatabaseError databaseError) {
                        //handle databaseError
                    }

                });

    }
    private void collectPhoneNumbers(Map<String,Object> users) {


        //iterate through each user, ignoring their UID
        for (Map.Entry<String, Object> entry : users.entrySet()){

            //Get user map
            Map singleUser = (Map) entry.getValue();
            //Get phone field and append to list
            r.add((String) singleUser.get("productName"));
        }

        System.out.println(r.toString());
    }

    private ProductInfo createProductInfo(JSONObject results) {
        JSONArray products = results.getJSONArray("results");
        if (products.length() > 0) {
            String price = "", productName = "", upc = "", imageURL = "", weight = "",
                    manufacturer = "", description = "", storeURL= "", storeName = "";
            Map<String, String> featureMap = null;

            JSONObject product = products.getJSONObject(0);
            if (product.has("name")) { productName = product.getString("name"); }
            if (product.has("manufacturer")) { manufacturer = product.getString("manufacturer"); }
            if (product.has("upc")) { upc = product.getString("upc"); }
            if (product.has("description")) { description = product.getString("description"); }
            if (product.has("weight")) { weight = product.getString("weight"); }
            if (product.has("features")) {
                String features = product.getJSONObject("features").toString();
                ObjectMapper mapper = new ObjectMapper();
                try {
                    featureMap = mapper.readValue(features, HashMap.class);
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }

            if (product.has("images")) {
                JSONArray images = product.getJSONArray("images");
                imageURL = images.get(0).toString();
            }

            if (product.has("sitedetails")) {
                JSONArray stores = product.getJSONArray("sitedetails");
                if (stores.length() > 0) {
                    JSONObject store = stores.getJSONObject(0);
                    if (store.has("name")) { storeName = store.getString("name"); }
                    if (store.has("url")) { storeURL = store.getString("url"); }
                    if (store.has("latestoffers")) {
                        JSONArray offers = store.getJSONArray("latestoffers");
                        if (offers.length() > 0) {
                            JSONObject offer = offers.getJSONObject(0);
                            price = offer.getString("price");
                        }
                    }
                }
            }

            ProductInfo productInfo = new ProductInfo(productName, price, upc, imageURL,
                    weight, manufacturer, description, featureMap, storeName, storeURL);
            return productInfo;
        }
        return null;
    }

    private void displayResults(final ProductInfo product) {
        String imageURL = product.getProductImageURL();
        String manufacturer = product.getProductManufacturer();
        String upc = product.getProductUPC();
        final String storeURL = product.getSiteProductURL();
        String storeName = product.getSiteName();
        String price = product.getProductPrice();
        String description = product.getProductDescription();
        Map<String, String> features = product.getProductFeatures();

        ImageView imageView = findViewById(R.id.productImage);
        TextView productText = findViewById(R.id.productText);
        TextView linkText = findViewById(R.id.linkText);
        TextView featureText = findViewById(R.id.linkText);
        Button button = findViewById(R.id.addButton);

        // library that loads the image from the image URL
        Picasso.get()
                .load(imageURL)
                .resize(500, 500)
                .placeholder(R.mipmap.ic_launcher_round)
                .into(imageView);

        productText.append(Html.fromHtml("<b>" + product.getProductName() + "</b><br>"));
        if (upc != "") {
            productText.append("upc: " + upc + "\n");
        }
        if (manufacturer != "") {
            productText.append("manufacturer: " + manufacturer + "\n");
        }
        if (description != "") {
            productText.append(description);
        }

        if (storeName != "") {
            linkText.append("find at " + storeName + "\n");
        }
        if (storeURL != "") {
            linkText.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    Intent intent = new Intent(Intent.ACTION_VIEW);
                    intent.setData(Uri.parse(storeURL));
                    startActivity(intent);
                }
            });
        }
        if (price != "") {
            linkText.append("for " + price);
        }


        if (features != null) {
            for (Map.Entry<String, String> entry : features.entrySet()) {
                String key = entry.getKey();
                String value = entry.getValue();
                featureText.append(key + ": " + value + "\n");
            }
        }
        button.setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick(View view) {
                FireBaseDB db = new FireBaseDB();
                db.pushToDB(product);
                //Intent intent = new Intent(view.getContext(), ShoppingListActivity.class);
               // startActivity(intent);
                shList();
                Intent intent = new Intent(getBaseContext(), ShoppingListActivity.class);
                intent.putExtra("EXTRA_SESSION_ID", r);
                startActivity(intent);
                //TODO: redirect to shopping list
            }
        });
    }
}
