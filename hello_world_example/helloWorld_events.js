    

    

var i = 0;
var Ok = false;
var StartMilliseconds = new Date().getTime();
var StopMilliseconds = new Date().getTime();

function LogbookCaption(e) {
 
            
     if (e.innerHTML == "Start")
 {
     e.innerHTML = "Stop";
      Ok = true;
      i = 0;
      StartMilliseconds = new Date().getTime();
 }
   else
       {
         e.innerHTML = "Start" ; 
         Ok = false;
         StopMilliseconds = new Date().getTime();
          document.getElementById('elapsedtime').value =  (StopMilliseconds - StartMilliseconds)/1000 ;
        //create a tickit to record the log session   
         ajaxSubmitDetails();
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

