document.getElementById('recordInputForm').addEventListener('submit', saveRecordValues);

function showAlert(x){
    document.getElementById('errorMessage').innerHTML = 
    '<div class="alert alert-danger" role="alert">' +
    '<strong> Oi, oi!</strong> <hr>' + x +'!' +
    '</div>';
}
function clearAlert(){
    document.getElementById('errorMessage').innerHTML = '';
}

function saveRecord(record){
    // Create records variable if one doesn't exist
    if(localStorage.getItem('records') == null) {
        var records = [];
        records.push(record);
        localStorage.setItem('records', JSON.stringify(records));
    } else {
        var records = JSON.parse(localStorage.getItem('records'));
        records.push(record);
        localStorage.setItem('records', JSON.stringify(records));
    }

    fetchRecords();
}

function saveRecordValues(e){
    // Get form values
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

    // Create record variable
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
    // Call function saving record
    saveRecord(record);

    document.getElementById('recordInputForm').reset();

    e.preventDefault();
}

function saveRecordRandom(e){
    // Randomize values
    var recordUser = 'Kamil';
    if(chance.bool()) recordUser = 'Klaudia';
    var recordDate = '';
    var recordDaytime = 'Morning';
    var recordWeight = chance.integer({min: 40, max: 160});
    var recordShoulders = chance.integer({min: 30, max: 100});
    var recordChest = chance.integer({min: 50, max: 200});
    var recordWaist = chance.integer({min: 50, max: 200});
    var recordHips = chance.integer({min: 40, max: 160});
    var recordThigh = chance.integer({min: 40, max: 160});
    var recordBiceps = chance.integer({min: 40, max: 160});
    var recordDesc = '';

    var recordId = chance.guid();
    var recordStatus = 'Neutral';

    // Create record variable
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
    // Call function saving record
    saveRecord(record);

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
    var chartSection = document.getElementById('chartMain');


    // Get quote - later move it somewhere
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', 'quotes.json', true);
    req.onload  = function() {
        var jsonResponse = JSON.parse(req.responseText);
        var randomNumber = chance.integer({ min: 0, max: (jsonResponse.length-1) })
        // Text
        var textElement = document.getElementById('quoteText');
        textElement.innerHTML = jsonResponse[randomNumber].text;
        //Author
        var authorElement = document.getElementById('quoteAuthor');
        authorElement.innerHTML = jsonResponse[randomNumber].author;
        
    };
    req.send(null);
    

    recordsList.innerHTML = '';
    chartSection.innerHTML = '';
    
    var chartData = [[],[], []];

    if(records == null || records.length == 0){
        recordsList.innerHTML =
        '<br>' +
        '<div class="alert alert-danger" role="alert">' +
        '<strong> Oi, oi!</strong> No records to show!!' +
        '</div>';

        chartSection.innerHTML = 
        '<div class="alert alert-danger" role="alert">' +
        '<strong> Oi, oi! </strong> Not enough data to show the chart!' +
        '</div>';
    }
    else{
        for(var i = 0; i < records.length; i++){
            // Get variables for this record
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

            // Add to chart data array
            if(user == 'Kamil'){
                chartData[0].push(weight);
                chartData[0].push(weight);
                chartData[0].push(weight);
            }
            else{
                chartData[2].push(weight);
                chartData[2].push(weight);
                chartData[2].push(weight);
            }
            

            // Calculate BMI
            // !!! Store user data in some seperate variable later on - e.g. make user registration form !!!
            var height = 187;
            if(user == "Klaudia")
                height = 160;
            var bmiMessage = getBMI(weight, height);
            
            recordsList.innerHTML += '<div class="card card-body">'+
                                    '<h6><small>Record ID: <i>' + id + '</i></small></h6>' +
                                    '<p><span class="badge badge-info">'+ 'Happiness level: ' + status + '</span></p>'+
                                    '<h2><strong>' + user + '</strong> - <small>' + date + '</small></h2>' +
                                    '<h4>' + desc + '</h4>' +
                                    '<p><button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseMeasurements' + id + '" aria-expanded="false" aria-controls="collapseMeasurements' + id + '">' +
                                    'Show Measurements' +
                                    '</button></p>' +
                                    '<div class="collapse" id="collapseMeasurements' + id + '">' +
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
                                    '<li class="list-group-item">' + bmiMessage + '</li>' +
                                    '</ul>' +
                                    '<br><br><a href="#" onclick="changeStatus(\'' + id + '\')" class="btn btn-warning">Change status</a>' +
                                    '<br><a href="#" onclick="deleteRecord(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
        }

        createChart(chartData);
        createPieChart(chartData);
    }
}

function createChart(chartData){
    var data = {
        labels: ['Empty'],
        series: chartData
      };
      
      // We are setting a few options for our chart and override the defaults
      var options = {
        showPoint: true,
        lineSmooth: true,
        // X-Axis specific configuration
        axisX: {
          showGrid: false,
          showLabel: false
        },
        // Y-Axis specific configuration
        axisY: {
          // Lets offset the chart a bit from the labels
          offset: 60,
          scaleMinSpace: 25,
          onlyInteger: true,
          // The label interpolation function enables you to modify the values
          // used for the labels on each axis. Here we are converting the
          // values into million pound.
          labelInterpolationFnc: function(value) {
            return value + 'kg';
          }
        }
      };
      
      // All you need to do is pass your configuration as third parameter to the chart function
      new Chartist.Line('#chartMain', data, options);
}

function createPieChart(chartData){
    var data = {
        labels: ['Kamil', ' ','Klaudia'],
        series: [chartData[0].length,0, chartData[2].length]
      };
      
      var options = {
        donut: true,
        donutWidth: 50,
        startAngle: 270,
        total: (chartData[0].length+chartData[2].length)*2,
        width: '360px',
        height: '280px',
        labelInterpolationFnc: function(value) {
          return value;
        }
      };
      
      new Chartist.Pie('#chartSecondary', data, options);
}

function getBMI(weight, heightInCm){
    var heightInM = heightInCm/100.0;
    var bmi = weight/(heightInM*heightInM);

    var result = 'Current BMI: ' + bmi.toFixed(2) + ' - ';
    
    if(bmi < 18.5){
        result += 'Underweight';
    }
    else if(bmi < 24.9){
        result += 'Normal weight';
    }
    else if(bmi < 29.9){
        result += 'Overweight';
    }
    else {
        result += 'Obese';
    }

    return result;
}