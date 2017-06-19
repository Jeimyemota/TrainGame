
    var config = {
    apiKey: "AIzaSyD8HwCAiWRpM4YoN-54fW-pkZ_fK4Zmeqs",
    authDomain: "train-schedule-ce8d1.firebaseapp.com",
    databaseURL: "https://train-schedule-ce8d1.firebaseio.com",
    projectId: "train-schedule-ce8d1",
    storageBucket: "train-schedule-ce8d1.appspot.com",
    messagingSenderId: "122058691753"
  };
  firebase.initializeApp(config);
var database = firebase.database();

  $('#add-user').on('click', function(event){
    event.preventDefault();


//grabbing user input
    var name = $('#trainName').val().trim();
    var des = $('#destination').val().trim();
    var trainTimes = moment($('#timeInput').val().trim(), "HH:mm").format("HH:mm");
    var freq = $('#frequencyInput').val().trim();

//creating local temp objects
var newTrain = {
  trainName: name,
  destination: des,
  timeInput: trainTimes,
  frequencyInput: freq,
  };

  //uploading data to database
  database.ref().push(newTrain);


  console.log(newTrain.trainname);
  console.log(newTrain.destination);
  console.log(newTrain.timeInput);
  console.log(newTrain.frequency);

  //alert
  alert('New Train added');

  //clear 
$('#trainName').val("");
$('#destination').val("");
$('#timeInput').val("");
$('#frequencyInput').val("");

return false;
});


 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // storing childsnapshots into vars. 
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().timeInput;
  var frequency = childSnapshot.val().frequencyInput;
  // departing Train pushed back, this make sure it comes before current time
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  // store difference between currentTime and departing train 
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left 
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  // to calculate minutes 
  var minToTrain = frequency - timeRemainder;
  // next train
  var nTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + nTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});
