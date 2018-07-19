package com.stacktips.speechtotext;

import android.content.ActivityNotFoundException;
import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.os.Bundle;
import android.speech.RecognizerIntent;
import android.speech.tts.TextToSpeech;
import android.support.v7.app.AppCompatActivity;
import android.text.Spannable;
import android.text.style.ForegroundColorSpan;
import android.view.View;
import android.widget.ImageButton;
import android.widget.TextView;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Locale;

public class MainActivity extends AppCompatActivity {

    private static final int REQ_CODE_SPEECH_INPUT = 100;
    private final int CHECK_CODE = 0x1;
    private TextView mVoiceInputTv;
    private ImageButton mSpeakBtn;
    private Speaker speaker;
    private String name;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mVoiceInputTv = (TextView) findViewById(R.id.voiceInput);
        mSpeakBtn = (ImageButton) findViewById(R.id.btnSpeak);
        mSpeakBtn.setOnClickListener(new View.OnClickListener() {

            @Override
            public void onClick(View v) {
                startVoiceInput();
            }
        });
        checkTTS();


    }

    private void startVoiceInput() {
        Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
        intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.getDefault());
        intent.putExtra(RecognizerIntent.EXTRA_PROMPT, "Hello, How can I help you?");
        try {
            startActivityForResult(intent, REQ_CODE_SPEECH_INPUT);
        } catch (ActivityNotFoundException a) {

        }
    }

    private void checkTTS(){
        Intent check = new Intent();
        check.setAction(TextToSpeech.Engine.ACTION_CHECK_TTS_DATA);
        startActivityForResult(check, CHECK_CODE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        switch (requestCode) {
            case REQ_CODE_SPEECH_INPUT: {
                if (resultCode == RESULT_OK && null != data) {
                    ArrayList<String> result = data.getStringArrayListExtra(RecognizerIntent.EXTRA_RESULTS);
                    String text = result.get(0);
                    appendColoredText(mVoiceInputTv, "\n" + text, Color.RED);
                    respond(text);
                }
                break;
            }
            case CHECK_CODE: {
                if(resultCode == TextToSpeech.Engine.CHECK_VOICE_DATA_PASS){
                    speaker = new Speaker(this);
                    speaker.allow(true);
                }else {
                    Intent install = new Intent();
                    install.setAction(TextToSpeech.Engine.ACTION_INSTALL_TTS_DATA);
                    startActivity(install);
                }
            }
        }
    }

    private void respond(String text) {
        String input = text;
        String response = "";
        if (text.contains("name")) {
            input = "name";
        } else if (text.contains("medicine") || text.contains("medicines")) {
            input = "medicine";
        } else if (text.contains("time")) {
            input = "time";
        } else if (text.contains("feeling")) {
            input = "feeling";
        } else if (text.contains("thank")) {
            input = "thanks";
        } else if (text.contains("hello")) {
            input = "hello";
        } else {
            input = "unknown";
        }
        switch(input) {
            case "hello": {
                response = "What is your name?";
                speaker.speak(response);
            } break;
            case "medicine": {
                response = "I think you have a fever.  Please take this medicine.";
                speaker.speak(response);
            } break;
            case "name": {
                String[] words = text.split(" ");
                name = words[words.length - 1];
                response = "hello, " + name;
                speaker.speak(response);
            } break;
            case "time": {
                SimpleDateFormat sdfDate =new SimpleDateFormat("HH:mm");//dd/MM/yyyy
                Date now = new Date();
                String[] strDate = sdfDate.format(now).split(":");
                if(strDate[1].contains("00")) {
                    strDate[1] = "o'clock";
                }
                response = "The time is " + sdfDate.format(now);
                speaker.speak(response);
            } break;
            case "feeling": {
                response = "I can understand.  Please tell me your symptoms in short.";
                speaker.speak(response);
            } break;
            case "thanks": {
                response = "Thank you too, " + name + ". Take care.";
                speaker.speak(response);
            } break;
            default: {
                response = "I did not recognize that. Please speak again.";
                speaker.speak(response);
            } break;
        }
        appendColoredText(mVoiceInputTv, "\n" + response, Color.BLUE);
    }

    public static void appendColoredText(TextView tv, String text, int color) {
        int start = tv.getText().length();
        tv.append(text);
        int end = tv.getText().length();

        Spannable spannableText = (Spannable) tv.getText();
        spannableText.setSpan(new ForegroundColorSpan(color), start, end, 0);
    }
}
