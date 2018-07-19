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
    var recordUser = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    
    var recordWeight = document.getElementById('recordWeightInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDaytime = document.getElementById('recordDaytimeInput').value;
    var recordDesc = document.getElementById('recordDescInput').value;

    var recordId = chance.guid();
    var recordStatus = 'Open';

    // Check if all required fields are filled
    if(recordWeight == 0 || ){
        showAlert("You need to fill all required fields(*)")
        return;
    }
    else{
        clearAlert();
    }

    var record = {
        id: recordId,
        description: recordDesc,
        daytime: recordDaytime,
        weight: recordWeight,
        status: recordStatus
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

function setStatusClosed(id){
    var records = JSON.parse(localStorage.getItem('records'));

    for(var i = 0; i<records.length; i++){
        if(records[i].id = id){
            records[i].status = 'Closed';
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
    //records[id].status = 'Closed';

    localStorage.setItem('records', JSON.stringify(records));

    fetchRecords();
}

function fetchRecords() {
    var records = JSON.parse(localStorage.getItem('records'));
    var recordsList = document.getElementById('recordsList');

    recordsList.innerHTML = '';

    for(var i = 0; i < records.length; i++){
        var id = records[i].id;
        var desc = records[i].description;
        var daytime = records[i].daytime;
        var weight = records[i].weight;
        var status = records[i].status;

        recordsList.innerHTML += '<div class="card card-body">'+
                                '<h9><small>Record ID: <i>' + id + '</i></small></h9>' +
                                '<p><span class="badge badge-info">'+ status + '</span></p>'+
                                '<h3>' + desc + '</h3>' +
                                '<p><span class="fas fa-stopwatch"></span> ' + daytime + '</p>' +
                                '<p><span class="fa fa-user"></span> ' + weight +  'kg</p>' +
                                '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a>' +
                                '<a href="#" onclick="deleteRecord(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
                                '</div>';
    }
}