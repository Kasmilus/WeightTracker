document.getElementById('recordInputForm').addEventListener('submit', saveRecord);

function showAlert(x){
    document.getElementById('errorMessage').innerHTML = 
    '<div class="alert alert-danger" role="alert">' +
    '<strong> Oi, oi!</strong> <hr>' + x +'!' +
    '</div>';
}
function clearAlert(){
    document.getElementById('errorMessage').innerHTML = '';
}

function saveRecord(e){
    var recordUser = document.getElementById('recordUserInput').value;
    var recordDate = document.getElementById('recordDateInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    
    var recordWeight = document.getElementById('recordWeightInput').value;
    var recordShoulders = document.getElementById('recordShoulderInput').value;
    var recordChest = document.getElementById('recordChestInput').value;
    var recordWaist = document.getElementById('recordWaistInput').value;
    var recordHips = document.getElementById('recordHipsInput').value;
    var recordThigh = document.getElementById('recordThighInput').value;
    var recordBiceps = document.getElementById('recordBicepsInput').value;
    var recordDesc = document.getElementById('recordDescInput').value;

    var recordId = chance.guid();
    var recordStatus = 'Neutral';

    // Check if all required fields are filled
    if(recordWeight == 0 || recordWaist == 0 || recordBiceps == 0 || recordChest == 0 || recordHips == 0 || recordShoulders == 0 || recordThigh == 0 || typeof recordDaytime == 'undefined'){
        showAlert("You need to fill all required fields(*)")
        return;
    }
    else{
        clearAlert();
    }

    var record = {
        id: recordId,
        user: recordUser,
        date: recordDate,
        daytime: recordDaytime,
        weight: recordWeight,
        shoulders: recordShoulders,
        chest: recordChest,
        waist: recordWaist,
        hips: recordHips,
        thigh: recordThigh,
        biceps: recordBiceps,
        status: recordStatus,
        description: recordDesc
    }

    if(localStorage.getItem('records') == null) {
        var records = [];
        records.push(record);
        localStorage.setItem('records', JSON.stringify(records));
    } else {
        var records = JSON.parse(localStorage.getItem('records'));
        records.push(record);
        localStorage.setItem('records', JSON.stringify(records));
    }

    document.getElementById('recordInputForm').reset();

    fetchRecords();

    e.preventDefault();
}

function changeStatus(id){
    var records = JSON.parse(localStorage.getItem('records'));

    for(var i = 0; i<records.length; i++){
        if(records[i].id = id){
            if(records[i].status != 'Happy')
                records[i].status = 'Happy';
            else
                records[i].status = 'Sad';
        }
    }

    localStorage.setItem('records', JSON.stringify(records));

    fetchRecords();
}

function deleteRecord(id){
    var records = JSON.parse(localStorage.getItem('records'));

    for(var i = 0; i<records.length; i++){
        if(records[i].id = id){
            records.splice(i, 1);
        }
    }

    localStorage.setItem('records', JSON.stringify(records));

    fetchRecords();
}

function fetchRecords() {
    var records = JSON.parse(localStorage.getItem('records'));
    var recordsList = document.getElementById('recordsList');

    recordsList.innerHTML = '';

    for(var i = 0; i < records.length; i++){
        var id = records[i].id;
        var user = records[i].user;
        var date = records[i].date;
        var daytime = records[i].daytime;
        var weight = records[i].weight;
        var shoulders = records[i].shoulders;
        var chest = records[i].chest;
        var waist = records[i].waist;
        var hips = records[i].hips;
        var thigh = records[i].thigh;
        var biceps = records[i].biceps;
        var status = records[i].status;
        var desc = records[i].description;

        recordsList.innerHTML += '<div class="card card-body">'+
                                '<h6><small>Record ID: <i>' + id + '</i></small></h6>' +
                                '<p><span class="badge badge-info">'+ 'Happiness level: ' + status + '</span></p>'+
                                '<h2><strong>' + user + '</strong> - <small>' + date + '</small></h2>' +
                                '<h4>' + desc + '</h4>' +
                                '<p><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">' +
                                'Show Measurements' +
                                '</button></p>' +
                                '<div class="collapse" id="collapseExample">' +
                                '<div class="card card-body">' +
                                '<p><span class="fas fa-stopwatch"></span> ' + daytime + '</p>' +
                                '<p><span class="fa fa-user"></span> Measurements: </p>' +
                                '<ul class="list-group">' +
                                '<li class="list-group-item">Weight: ' + weight + 'kg<span class="badge">test</span></li>' +
                                '<li class="list-group-item">Shoulders: ' + shoulders + 'cm</li>' +
                                '<li class="list-group-item">Chest: ' + chest + 'cm</li>' +
                                '<li class="list-group-item">Waist: ' + waist + 'cm</li>' +
                                '<li class="list-group-item">Hips: ' + hips + 'cm</li>' +
                                '<li class="list-group-item">Thigh: ' + thigh + 'cm</li>' +
                                '<li class="list-group-item">Biceps: ' + biceps + 'cm</li>' +
                                '</ul>' +
                                '<br><br><a href="#" onclick="changeStatus(\'' + id + '\')" class="btn btn-warning">Change status</a>' +
                                '<br><a href="#" onclick="deleteRecord(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>';
    }

    var chartData;

    createChart(chartData);

}

function createChart(data){
    var data = {
        labels: ['Week1', 'Week2', 'Week3', 'Week4', 'Week5', 'Week6'],
        series: [
          [5, 4, 3, 7, 5, 10],
          [3, 2, 9, 5, 4, 6],
          [2, 1, -3, -4, -2, 0]
        ]
      };
      
      // We are setting a few options for our chart and override the defaults
      var options = {
        // Don't draw the line chart points
        showPoint: false,
        // Disable line smoothing
        lineSmooth: false,
        // X-Axis specific configuration
        axisX: {
          // We can disable the grid for this axis
          showGrid: false,
          // and also don't show the label
          showLabel: false
        },
        // Y-Axis specific configuration
        axisY: {
          // Lets offset the chart a bit from the labels
          offset: 60,
          // The label interpolation function enables you to modify the values
          // used for the labels on each axis. Here we are converting the
          // values into million pound.
          labelInterpolationFnc: function(value) {
            return '$' + value + 'm';
          }
        }
      };
      
      // All you need to do is pass your configuration as third parameter to the chart function
      new Chartist.Line('.ct-chart', data, options);
}