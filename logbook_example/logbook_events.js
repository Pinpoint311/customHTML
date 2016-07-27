    

    

var i = 0;
var Ok = false;
var StartMilliseconds = new Date().getTime();
var StopMilliseconds = new Date().getTime();
var startTime;
var stopTime;
var elapsedTime;
var elapsedTimeFormat;
function LogbookCaption(e) {
 
            
     if (e.innerHTML == "Start")
 {
     e.innerHTML = "Stop";
      Ok = true;
      i = 0;
      StartMilliseconds = new Date().getTime();
//var duration = moment.duration(parseInt(StartMilliseconds, 10));
//var addZero = function(v) { return (v<10 ? '0' : '') + Math.floor(v); };

startTime = moment(parseInt(StartMilliseconds, 10)).format('hh:mm:ss');
 }
   else
       {
         e.innerHTML = "Start" ; 
         Ok = false;
         StopMilliseconds = new Date().getTime();
         stopTime = moment(parseInt(StopMilliseconds, 10)).format('hh:mm:ss');
         document.getElementById('elapsedtime').value =  (StopMilliseconds - StartMilliseconds)/1000 ;
         elapsedTime = (StopMilliseconds - StartMilliseconds);
         elapsedTimeFormat = getElapsedTimeFormat(elapsedTime);
        //create a tickit to record the log session 
	  $("#fieldArea").hide();
	  $("#commentArea").show();
          $("#startBtn").hide();
	  $("#doneBtn").show();
         
       }
    
}            
 
var interval = setInterval( increment, 1000);

function increment(){
    i = i + 1;
    if (Ok == true)
    {
        document.getElementById('elapsedtime').value = i;
    }
    
}



