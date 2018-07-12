package com.example.rohithkumar.cameramapsapplication;

import android.*;
import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.location.Address;
import android.location.Geocoder;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.location.Geocoder;
import android.support.v4.content.ContextCompat;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.List;

public class MyMapsActivity extends FragmentActivity implements OnMapReadyCallback {
    private GoogleMap mMap;
    LatLng currentCoordinates = null;
    double latitude = 0, longitude = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_my_maps);

        LocationManager currentLocation = (LocationManager) this.getSystemService(Context.LOCATION_SERVICE);
        LocationListener currentLocationListener = new LocationListener() {
            @Override
            public void onLocationChanged(Location location) {
                currentCoordinates = new LatLng(location.getLatitude(), location.getLongitude());
            }

            @Override
            public void onStatusChanged(String provider, int status, Bundle extras) {

            }

            @Override
            public void onProviderEnabled(String provider) {

            }

            @Override
            public void onProviderDisabled(String provider) {

            }
        };


        try {
            currentLocation.requestLocationUpdates(LocationManager.GPS_PROVIDER, 0, 0,
                    currentLocationListener);
            latitude = currentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER)
                    .getLatitude();
            longitude = currentLocation.getLastKnownLocation(LocationManager.GPS_PROVIDER)
                    .getLongitude();
            currentCoordinates = new LatLng(latitude, longitude);
        } catch (SecurityException e) {
            requestPermissions(new String[]{android.Manifest.permission.ACCESS_COARSE_LOCATION,
                    Manifest.permission.ACCESS_FINE_LOCATION}, 1);
        }


        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);
    }
    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
        public void onMapReady (GoogleMap googleMap){
            // Add a marker in Sydney, Australia,
            // and move the map's camera to the same location.
            mMap = googleMap;

            googleMap.addMarker(new MarkerOptions().position(currentCoordinates)
                    .title(currentCoordinates.toString())
                    .icon(BitmapDescriptorFactory.fromResource(R.mipmap.ic_launcher_round)));
            googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(currentCoordinates, 15));
        }
    }
