   

var strArr;
var TickitGPSLocation;
var TickitSubject;
var TikitDescription;
var TickitAPI;
var TickitAddress;

$(function(){

	var url = window.location.href;
        strArr = url.split("#");
        strArr = strArr[1].split("_");
	isSavedToFit = strArr[1];
	ajaxFetchTickitDetails();
})

//Ajax fetch tickit details
function ajaxFetchTickitDetails()
{
	  
      	 //this form is set to work with Prod as an example      	 
      	 $.ajax({
			crossDomain:    true, 
      			url: 'http://www.pinpoint311.com/flippadoo/mobile/tickitService/888666555/fetchTickitDetails',
      			type : 'get',
      			async : true,
      			cache: false,
			    dataType: 'json',
        		contentType:    'application/json; charset=UTF-8',
        		
      			data : {
      				tickitId : strArr[0],
				userId: 1
      			
      				},
             beforeSubmit: function() { },
             success: function(response) {
          	   
          	   if(response.status == 'OK')
         		   {
				var tickitModel = response.ticketModel;
		    		   $("#tickitSubject").val(tickitModel.tickitSubject);
		    		   $("#address").text(tickitModel.customAddress);
		    		   $("#tickitMsgBody").html(tickitModel.tickitMsgBody);
				   $("#tickitGpsCoordinates").val(tickitModel.tickitGpsCordinatesModel.latitude+","+tickitModel.tickitGpsCordinatesModel.logitude);
				   $("#apiKey").val(tickitModel.apiKey);
                       		   $("#CurrentAddress").val(tickitModel.address);
                   TickitGPSLocation = tickitModel.tickitGpsCordinatesModel.latitude+","+tickitModel.tickitGpsCordinatesModel.logitude;
                   TickitSubject = tickitModel.tickitSubject;
                   TikitDescription = tickitModel.tickitMsgBody;
                   TickitAPI = tickitModel.apiKey;
                   TickitAddress = tickitModel.customAddress ;  
		                           
				   
            } 
             else 
            { 
                  swal("FAILED, Try again ..." , response.message, "error"); 
            } 
       
         }, 
            error : function() { swal("FAILED, Try again ..." , "System error occured, please try again ...", "error"); 
            
         }});        

}
      	
      		
		
    

//Ajax update tickit history
function ajaxSubmitDetails()
{
if(TikitDescription != null && TikitDescription != "")
{
TikitDescription = TikitDescription.replace(/<br>/g, "\n"); 
TikitDescription = TikitDescription.replace(/&#x23;/g, "#");
TikitDescription = TikitDescription.replace(/&#x40;/g, "@"); 
TikitDescription = TikitDescription + "\n";
}
       

 TikitDescription = TikitDescription + "Logbook Entry\n" + "Start Time: "+startTime + " End Time: "+ stopTime + "\nElapsed Time: " + elapsedTimeFormat;
if($("#comment").val() != "")
{
	TikitDescription += "\n" + $("#comment").val();
}

       //we need to call this on the Stop event.    
              
      	var PinpointFormData = {
                UserId: 1,
                tickitId: strArr[0],
                tickitSubject: TickitSubject,
                tickitMsgBody: TikitDescription,
                tickitGpsCoordinates: TickitGPSLocation,
                address: TickitAddress,
                apiKey: TickitAPI               

            };
          //we also have to record the start and end times for the log record
          
          
         //store the values locally - in case of issues with the API
         var MyTickitIDStr = strArr[0];         
                
           
          // this updates the tickit history on Pinpoint qa site.
            $.ajax({			
      			url: 'http://www.pinpoint311.com/flippadoo/mobile/tickitService/888666555/updateTickitHistory',
      			type : 'post',
      			async : true,
      			cache: false,
			    dataType: 'json',
        		contentType: 'application/json; charset=UTF-8',
      			data : JSON.stringify(PinpointFormData),
                beforeSubmit: function() { },
                success: function(response) { 
			    if(response.status == 'OK') 
			    { 
				         
			      swal({
				  title: "Logbook updated",
				  text: '<span style="color:#878F96;font-size: 18px;font-weight: bold;">'+elapsedTime+'</span><br>'+'<span style="color:#7D99CA;font-weight: 600;">'+$("#comment").val()+'</span>',
				  type: "success",
				  html: true
				});  
			      //need a timeout or the SweetAlert message will not show.... 
			     setTimeout(closeMe, 4900);                 
		 
			    } 
			     else 
			    { 
				swal("System Update Failure" , "201: Fit was not updated- record saved locally", "error"); 
				       setTimeout(closeMe, 4900); 
			    } 
		}, 
              });      	
       
                  
      }
	  
function logbookRefresh()
{
    //refresh the logbook with the current time and the current address
    document.getElementById('CurrentTime').value = new Date();
      
     
}

 
function closeMe()
{
    window.location.href = "http://192.168.1.217:8080/";    
}


function getElapsedTimeFormat(s)
{
	var milliseconds = parseInt((s%1000)/100)
        , seconds = parseInt((s/1000)%60)
        , minutes = parseInt((s/(1000*60))%60)
        , hours = parseInt((s/(1000*60*60))%24);
	
        elapsedTime = "";
	if(hours != 0)
	{
		elapsedTime += hours + " hours ";
	}
	if(minutes != 0)
	{
		elapsedTime += minutes + " mins ";
	}
	if(seconds != 0)
	{
		elapsedTime += seconds + " second ";
	}
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;
	var t =  hours + ":" + minutes + ":" + seconds;
        return t;
}
     
   
