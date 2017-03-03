    // Initialize Firebase
$(document).ready(function(){

    console.log("page open");

    var config = {
      apiKey: "AIzaSyDVCuv3xcr8LLlPXg305DbMlAh3udDRJqc",
      authDomain: "employee-data-mcpt.firebaseapp.com",
      databaseURL: "https://employee-data-mcpt.firebaseio.com",
      storageBucket: "employee-data-mcpt.appspot.com",
      messagingSenderId: "95033379405"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Initial Values
    var name = "";
    var email = "";
    var age = 0;
    var comment = "";

    // Capture Button Click
    $("#submit-button").on("click", function(event) {
      event.preventDefault();


    //   <input id="add-name" class="add_data" type="text" name="Name">
    // <input id="add-role" class="add_data" type="text" name="Role">
    // <input id="add-start-date" class="add_data" type="text" name="Start Date">
    // <input id="add-monthly-rate" class="add_data" type="text" name="Monthly Rate">
    // <input id="submit-button" type="submit" name="Submit" value="Submit">

      // Grabbed values from text boxes
      name = $("#add-name").val().trim();
      role = $("#add-role").val().trim();
      startDate = $("#add-start-date").val().trim();
      monthlyRate = $("#add-monthly-rate").val().trim();

      // Code for handling the push
      database.ref().push({
        name: name,
        role: role,
        startDate: startDate,
        monthlyRate: monthlyRate
      });

      // console.log(name + role + startDate + monthlyRate);

    });

    // Firebase watcher + initial loader HINT: .on("value")
    database.ref().on("value", function(snapshot) {

      // storing the snapshot.val() in a variable for convenience
      var snapValue = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var snapValueArr = Object.keys(snapValue);

      // Finding the last user's key
      var lastIndex = snapValueArr.length - 1;

      var lastKey = snapValueArr[lastIndex];

      // Using the last user's key to access the last added user object
      var lastObj = snapValue[lastKey]

      // Console.loging the last user's data
      console.log(lastObj.name);
      console.log(lastObj.role);
      console.log(lastObj.startDate);
      console.log(lastObj.monthlyRate);


      var markup = "<tr><td>" + lastObj.name + "</td><td>" + lastObj.role + "</td><td>" + lastObj.startDate + "</td><td>x</td><td>" + lastObj.monthlyRate + "</td><td>x</td></tr>";
      $("#current-employee-data").append(markup);

      
        
  

      // Change the HTML to reflect
      // $("#name-display").html(lastObj.name);
      // $("#email-display").html(lastObj.email);
      // $("#age-display").html(lastObj.age);
      // $("#comment-display").html(lastObj.comment);

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });



});