// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAgdDrpq_MAV2XO550FmJbZY-MTHBYGncU",
    authDomain: "trains-93fa5.firebaseapp.com",
    databaseURL: "https://trains-93fa5.firebaseio.com",
    projectId: "trains-93fa5",
    storageBucket: "",
    messagingSenderId: "868681658597"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  // Button for adding a train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();

    var trainName = $("#train-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainPlatform = $("#platform-input").val().trim();
    var trainFirst= $("#first-train-input").val().trim();
    var trainFrequency= $("#frequency-input").val().trim();

  // Storing new trains
    var newTrain = {
      train: trainName,
      destination: trainDestination,
      platform: trainPlatform,
      firstTrain: trainFirst,
      frequency: trainFrequency
    };
  // Uploading new trains
  database.ref().push(newTrain);
  console.log(newTrain);
  alert("Train added!");

  // Clear fields so new train can be added... ADD ALL THE TRAINS!!!  
  
  $("#train-input").val("")
  $("#destination-input").val("")
  $("#platform-input").val("")
  $("#first-train-input").val("")
  $("#frequency-input").val("")

  });

  // Calculate next train time
function getTrainTime(t, f) {

  var now = moment();
  console.log(now);
  
  var first = moment(t, "HH:mm");
  console.log(first);

  if (moment(now).isBefore(first)) {
    return first.format("HH:mm");
  }

  while (moment(now).isAfter(first)) {
    first.add(f, 'm');
  } 

  return [first.format("HH:mm"), (first.diff(now, 'minutes'))]
};

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {


  var trainName = childSnapshot.val().train;
  var trainDestination = childSnapshot.val().destination;
  var trainPlatform = childSnapshot.val().platform;
  var trainFirst = childSnapshot.val().firstTrain;
  var trainFrequency = childSnapshot.val().frequency;

  var trainArrival = getTrainTime(trainFirst, trainFrequency)[0];
  var trainMinutesAway = getTrainTime(moment(), moment().subtract(trainArrival, "minutes"))[1];

  getTrainTime();

  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainPlatform + "</td><td>" + trainFirst + "</td><td>" + trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutesAway + "</td></tr>");

  // <td>" + trainArrival + "</td><td>" + trainMinutesAway + "</td>
  
  });