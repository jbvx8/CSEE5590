package edu.umkc.anonymous.icp1;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

    public void checkCredentials(View v) {
        EditText usernameCtrl = (EditText)findViewById(R.id.editTextUser);
        EditText passwordCtrl = (EditText) findViewById(R.id.editTextPassword);
        TextView errorText = (TextView) findViewById(R.id.lbl_Error);
        String userName = usernameCtrl.getText().toString();
        String password = passwordCtrl.getText().toString();

        boolean validationFlag = false;
        // Verify username and password not empty
        if(!userName.isEmpty() && !password.isEmpty()) {
            if(userName.equals("Admin") && password.equals("admin")) {
                validationFlag = true;
            }
        }

        if(!validationFlag) {
            errorText.setVisibility(View.VISIBLE);
        }
        else {
            redirectToHomePage(v);
        }
    }

    public void redirectToHomePage(View v) {
        Intent redirect = new Intent(MainActivity.this, HomeActivity.class);
        startActivity(redirect);
    }
}
