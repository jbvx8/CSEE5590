package edu.umkc.anonymous.lab4;

import android.app.ProgressDialog;
import android.os.AsyncTask;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.android.gms.vision.barcode.Barcode;
import com.semantics3.api.Products;

import org.json.semantics3.JSONArray;
import org.json.semantics3.JSONObject;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.HashMap;
import java.util.Map;

import oauth.signpost.exception.OAuthCommunicationException;
import oauth.signpost.exception.OAuthExpectationFailedException;
import oauth.signpost.exception.OAuthMessageSignerException;

public class ProductsActivity extends AppCompatActivity {

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
            ProductInfo info = createProductInfo(results);
            displayResults(info);
        }
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

    private void displayResults(ProductInfo product) {

    }
}
