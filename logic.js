var config = {
    apiKey: "AIzaSyBdJZIayRdYcT3vtJpySOTDdQ0SCG3h-y0",
    authDomain: "traintime-b5ea2.firebaseapp.com",
    databaseURL: "https://traintime-b5ea2.firebaseio.com",
    projectId: "traintime-b5ea2",
    storageBucket: "traintime-b5ea2.appspot.com",
    messagingSenderId: "776475609988"
  };
  firebase.initializeApp(config);

var trainData = firebase.database();

$("#add-train-btn").on("click", function() {

    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
  
      name: trainName,
      destination: destination,
      firstTrain: firstTrain,
      frequency: frequency
    };
  
    // Uploads train data to the database
    trainData.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTrain);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  
    // Determine when the next train arrives.
    return false;
  });
  
  // 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
  trainData.ref().on("child_added", function(snapshot) {
  
        console.log(snapshot.val());
  
        // Store everything into a variable.
        var name = snapshot.val().name;
        var destination =snapshot.val().destination;
        var frequency = snapshot.val().frequency;
        var firstTrain = snapshot.val().firstTrain;
  
  var remainder = moment().diff(moment.unix(firestTrain),"minute")%frequency;
  var minutes = frequency-remainder;
  var arrival=moment().add(minutes,"m").format("hh.mm A");

console.log(remainder);
console.log(minutes);
console.log(arrival);

 // Add each train's data into the table
          $("#train-table > tbody").append("<tr><td>" + name + "</td><td>" + destination+ "</td><td>" +
            frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
        });
  