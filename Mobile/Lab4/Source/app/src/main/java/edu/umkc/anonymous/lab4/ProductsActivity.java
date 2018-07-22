package edu.umkc.anonymous.lab4;

import android.app.ProgressDialog;
import android.graphics.Bitmap;
import android.os.AsyncTask;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.vision.barcode.Barcode;
import com.semantics3.api.Products;


import org.json.semantics3.JSONArray;
import org.json.semantics3.JSONObject;
import org.json.semantics3.JSONString;

import java.io.Console;
import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

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
            printResults(results);
        }
    }

    private void printResults(JSONObject results) {
        GridLayout gridLayout = new GridLayout(getApplicationContext());
        gridLayout.setAlignmentMode(GridLayout.ALIGN_BOUNDS);

        JSONArray products = results.getJSONArray("results");
        gridLayout.setColumnCount(1);
        TextView nameText;
        TextView siteText;
        TextView priceText;
        ImageView imageView;
        if (products.length() > 0) {
            JSONObject product = products.getJSONObject(0);
            String productName = product.getString("name");
            JSONArray images = product.getJSONArray("images");
            String imageURL = images.get(0).toString();
            JSONArray stores = product.getJSONArray("sitedetails");
            gridLayout.setRowCount(stores.length());

            for (int i = 0; i < stores.length(); i++) {
                JSONObject store = stores.getJSONObject(i);
                String productURL = store.getString("url");
                JSONArray offers = store.getJSONArray("latestoffers");
                JSONObject offer = offers.getJSONObject(0);
                String price = offer.getString("price");
            }
        } else {
            String message = results.getString("message");
        }

    }
}
