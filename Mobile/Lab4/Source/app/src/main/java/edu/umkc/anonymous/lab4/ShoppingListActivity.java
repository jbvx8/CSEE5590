package edu.umkc.anonymous.lab4;

import android.content.Context;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.Toast;
import android.widget.Toolbar;

import com.google.android.gms.gcm.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ShoppingListActivity extends AppCompatActivity {


        ArrayList<ProductInfo> dataModels;
        ListView listView;
       // private static CustomAdapter adapter;
    final Map<String, String> temp = new HashMap<>();
    ArrayList<String> result = new ArrayList<>();
    ArrayAdapter<String> adapter;

    @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_shopping_list);
            listView=(ListView)findViewById(R.id.prList);
            dataModels = new ArrayList<>();

                   result = getIntent().getStringArrayListExtra("EXTRA_SESSION_ID");
            adapter = new ArrayAdapter<String>(this, android.R.layout.simple_list_item_1,
                    android.R.id.text1, result);
        Context context = getApplicationContext();
        CharSequence text = "Long tap to delete product from the list";
        int duration = Toast.LENGTH_SHORT;

        Toast toast = Toast.makeText(context, text, duration);
        toast.show();

//
            // Assign adapter to ListView
            listView.setAdapter(adapter);
        listView.setOnItemLongClickListener(new AdapterView.OnItemLongClickListener() {

            @Override
            public boolean onItemLongClick (AdapterView<?> parent, View view,
                                    int position, long id) {

                // ListView Clicked item index
                int itemPosition     = position;

                // ListView Clicked item value
                String  itemValue    = (String) listView.getItemAtPosition(position);


                adapter.remove(result.remove(position));
                FireBaseDB fb = new FireBaseDB();
                fb.deleteFromDB(itemValue);
                return false;
            }

        });
       }



        @Override
        public boolean onCreateOptionsMenu(Menu menu) {
            // Inflate the menu; this adds items to the action bar if it is present.
            getMenuInflater().inflate(R.menu.main_menu, menu);
            return true;
        }



        @Override
        public boolean onOptionsItemSelected(MenuItem item) {
            // Handle action bar item clicks here. The action bar will
            // automatically handle clicks on the Home/Up button, so long
            // as you specify a parent activity in AndroidManifest.xml.
            int id = item.getItemId();

            //noinspection SimplifiableIfStatement
            if (id == R.id.action_settings) {
                return true;
            }

            return super.onOptionsItemSelected(item);
        }
    }
