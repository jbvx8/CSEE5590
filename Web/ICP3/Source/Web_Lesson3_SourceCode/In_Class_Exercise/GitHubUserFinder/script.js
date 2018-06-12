function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it. The function should finally return the object(it now contains the response!)
    var http = new XMLHttpRequest();
    var url = "https://api.github.com/search/users?q=" + user;
    http.open("GET", url, false);
    http.send();

    return http;
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    document.querySelector('h2').innerHTML = user["items"][0]["login"];

    var avatar = document.createElement('img');
    avatar.src = user["items"][0]["avatar_url"];
    var div = document.getElementById("avatar");
    // must clear existing image if page not refreshed
    if (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
    div.appendChild(avatar);

    var info = document.getElementById("information");
    var text = "";
    for (var key in user["items"][0]) {
        text += key + ": " + user["items"][0][key] + "<br>";
    }
    info.innerHTML = text;
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    document.querySelector('h2').innerHTML = username + " not found.  Please search again.";

    // must clear existing divs if page not refreshed
    var div = document.getElementById("avatar");
    if (div.hasChildNodes()) {
        div.removeChild(div.firstChild);
    }
    document.getElementById("information").innerHTML = '';
}


$(document).ready(function(){
    $(document).on('keypress', '#username', function(e){
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            var username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            var response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                var text = JSON.parse(response.responseText);
                // non-existent user still returns 200
                if (text["total_count"] == 0) {
                    noSuchUser(username);
                } else {
                    showUser(JSON.parse(response.responseText));
                }
            } else {
                noSuchUser(username);
            }
        }
    })
});
