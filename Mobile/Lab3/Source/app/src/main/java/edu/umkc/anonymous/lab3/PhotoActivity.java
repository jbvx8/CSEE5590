package edu.umkc.anonymous.lab3;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.provider.ContactsContract;
import android.provider.MediaStore;

import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.support.v4.content.PermissionChecker;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

public class PhotoActivity extends Activity {
    int TAKE_PHOTO_CODE = 0;
    ImageView userPhoto;
    Bitmap photo;
    static int MY_PERMISSIONS_REQUEST_CAMERA = 1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_photo);

        if (ActivityCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{android.Manifest.permission.CAMERA},
                    MY_PERMISSIONS_REQUEST_CAMERA);
        }

        Button takePhoto = (Button) findViewById(R.id.btn_take_photo);
        userPhoto = (ImageView)  findViewById(R.id.user_photo);

        takePhoto.setOnClickListener(new View.OnClickListener() {


            public void onClick(View v) {
                Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                startActivityForResult(cameraIntent, TAKE_PHOTO_CODE);
                }

            });
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        Button analyze = (Button) findViewById(R.id.btn_photo_ok);

        if (requestCode == TAKE_PHOTO_CODE && resultCode == RESULT_OK ) {
            photo = (Bitmap) data.getExtras().get("data");
            userPhoto.setImageBitmap(photo);
        }
        if (userPhoto.getDrawable() != null) {
            analyze.setVisibility(View.VISIBLE);
        }
    }

    public void redirectToAnalyze(View v) {
        Intent redirect = new Intent(PhotoActivity.this, AnalyzeActivity.class);
        redirect.putExtra("Image", photo);
        startActivity(redirect);
    }
}
