package edu.umkc.anonymous.lab4;

import java.util.Map;

public class ProductInfo {
    private String productName;
    private String productPrice;
    private String productUPC;
    private String productImageURL;
    private String productWeight;
    private String productManufacturer;
    private String productDescription;
    private Map<String, String> productFeatures;
    private String siteName;
    private String siteProductURL;

    public ProductInfo(String productName, String productPrice, String productUPC,
                       String productImageURL, String productWeight, String productManufacturer,
                       String productDescription, Map<String, String> productFeatures,
                       String siteName, String siteProductURL) {
        this.productName = productName;
        this.productPrice = productPrice;
        this.productUPC = productUPC;
        this.productImageURL = productImageURL;
        this.productWeight = productWeight;
        this.productManufacturer = productManufacturer;
        this.productDescription = productDescription;
        this.productFeatures = productFeatures;
        this.siteName = siteName;
        this.siteProductURL = siteProductURL;
    }

    public String getProductName() {
        return productName;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public String getProductUPC() {
        return productUPC;
    }

    public String getProductImageURL() {
        return productImageURL;
    }

    public String getProductWeight() {
        return productWeight;
    }

    public String getProductManufacturer() {
        return productManufacturer;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public Map<String, String> getProductFeatures() {
        return productFeatures;
    }

    public String getSiteName() {
        return siteName;
    }

    public String getSiteProductURL() {
        return siteProductURL;
    }
}




