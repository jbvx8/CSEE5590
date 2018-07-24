package edu.umkc.anonymous.lab4;

import org.json.JSONObject;
import org.json.semantics3.JSONArray;

import java.util.ArrayList;

public class ProductInfo {

    public String productName;
    public String productPrice;
    public String productUPC;
    public String productImageURL;
    public String productSize;
    public String productManufacturer;
    public String productFeatures;
    public String siteName;
    public String productDescription;

    public ProductInfo(){
    }

    public ProductInfo(String product_Name, String product_Price, String product_UPC, String image_url, String size, String manufacturer, String features, String siteName, String discription){
        this.productName = product_Name;
        this.productPrice = product_Price;
        this.productUPC = product_UPC;
        this.productImageURL = image_url;
        this.productSize = size;
        this.productManufacturer = manufacturer;
        this.productFeatures = features;
        this.siteName = siteName;
        this.productDescription = discription;
    }
    public ArrayList<String> getData(){
        //JSONArray r = product.getJSONArray("results");
        ArrayList<String> s = new ArrayList<String>();
        String name = "test";//r.getJSONArray(0).get(0).toString();//("name").toString();
        String price = "test";//results.map.get("results").myArrayList[0].map.get("price");
        String UPCCode = "test";//results.map.get("results").myArrayList[0].map.get("upc");
        String imageURL = "test";//results.map.get("results").myArrayList[0].map.get("images");
        String size = "test";//results.map.get("results").myArrayList[0].map.get("size");
        String manufacturer = "test";//results.map.get("results").myArrayList[0].map.get("manufactirer");
        String features = "test";//results.map.get("results").myArrayList[0].map.get("features");
        String sitename = "test";//results.map.get("results").myArrayList[0].map.get("sitedetails").myArrayList[0].map.get("name");
        String discription = "test";//results.map.get("results").myArrayList[0].map.get("description");
        ProductInfo p = new ProductInfo(name, price, UPCCode, imageURL, size, manufacturer, features, sitename, discription);
        FireBaseDB db = new FireBaseDB();
        db.pushToDB(name,price,UPCCode,imageURL,size,manufacturer,features,siteName,discription);
        return s;


    }
}
