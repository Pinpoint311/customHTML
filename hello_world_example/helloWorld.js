   

var strArr;
var TickitGPSLocation;
var TickitSubject;
var TikitDescription;
var TickitAPI;
var TickitAddress;
var TickitLatitude;
var TickitLongitude;
var attachmentUrl;
var marker = null;
var map = null;
var infowindow = new google.maps.InfoWindow();
$(function(){

	var url = window.location.href;
        strArr = url.split("#");
        strArr = strArr[1].split("_");
	isSavedToFit = strArr[1];
	ajaxFetchTickitDetails();
        $('input:radio[name="choice"]').change(function() {
	});
        $(".tickitMsgBody").mCustomScrollbar({
    	  setHeight:100,
          theme:"dark-3"
        	  
        });
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
		    		   $("#tickitSubject").text(tickitModel.tickitSubject);
		    		   $("#address").text(tickitModel.customAddress);
		    		   $("#tickitMsgBody").html(tickitModel.tickitMsgBody);
				   $("#tickitGpsCoordinates").val(tickitModel.tickitGpsCordinatesModel.latitude+","+tickitModel.tickitGpsCordinatesModel.logitude);
				   $("#apiKey").val(tickitModel.apiKey);
                       
                   TickitGPSLocation = tickitModel.tickitGpsCordinatesModel.latitude+","+tickitModel.tickitGpsCordinatesModel.logitude;
                   TickitSubject = tickitModel.tickitSubject;
                   TikitDescription = tickitModel.tickitMsgBody;
                   TickitAPI = tickitModel.apiKey;
                   TickitAddress = tickitModel.customAddress ;  
                   TickitLatitude = tickitModel.tickitGpsCordinatesModel.latitude;
		           TickitLongitude = tickitModel.tickitGpsCordinatesModel.logitude;  
                   attachmentUrl = tickitModel.tickitAttachmentUrl; 
                   if(tickitModel.tickitAttachmentUrl)
		   {
			$("#imageRadioBtn").prop("disabled",false);
			$("#imageRadioBtn").prop("checked",true);
                        $(".imageBtn").prop("disabled",false);
		        $("#showImageBtn").prop("disabled",false);
                        
             	   }
				   
            } 
             else 
            { 
                  swal("FAILED, Try again ..." , response.message, "error"); 
            } 
       
         }, 
            error : function() { swal("FAILED, Try again ..." , "System error occured, please try again ...", "error"); 
            
         }});        

}
      	
      		
function logbookRefresh()
{
    //refresh the logbook with the current time and the current address
    $("#CurrentAddress").val(TickitAddress);   
}

 
function closeMe()
{
    window.location.href = "http://192.168.1.217:8080/";    
}

function showMap()
{
  $("#firstContainer").hide();
  $(".mapCustom").fadeIn('normal');
	$("#showImageBtn").show();
	$("#backBtn").show();
	$("#showMapBtn").hide();
	$("#imageBtnContainer").hide();
	$("#imageContainer").hide();
	$("#secondContainer").fadeIn('normal');
	$(".thirdContainer").hide();
        $("#FitBtn").hide();

	initializeMap();
        updateMap();
}

function SendToFit()
{
    var PinpointFormData = { 
                UserId: 1, 
                tickitId: strArr[0], 
                tickitSubject: TickitSubject, 
                tickitMsgBody: $("#tickitMsgBody").val(), 
                tickitGpsCoordinates: TickitGPSLocation, 
                address: TickitAddress, 
                apiKey: TickitAPI               
 
            };            
           
           
         //store the values locally - in case of issues with the API 
         var MyTickitIDStr = strArr[0];          
              
          
            
          // this updates the tickit history on Pinpoint prod site. 
            $.ajax({ 
                    url: 'http://www.pinpoint311.com/flippadoo/mobile/tickitService/888666555/updateTickitHistory', 
                    type : 'post', 
                    async : true, 
                    cache: false, 
                    dataType: 'json', 
                    contentType: 'application/json; charset=UTF-8', 
                    data : JSON.stringify(PinpointFormData), 
                    beforeSubmit: function() { }, 
                    success: function(response) { },  
              });       
        
            
        // this updates the Fit Tracking item on the City Track 
 
               
            fitUrl = "https://fitcitytrack.alceatech.com/restapi/fitapp/createTicket"; 
                        
           
            $.ajax({  
                url: fitUrl, 
                type : 'post', 
                async : true, 
                cache: false, 
                dataType: 'json', 
                contentType:   'application/json; charset=UTF-8', 
                data : JSON.stringify(PinpointFormData), 
                beforeSubmit: function() { }, 
                success: function(response) { 
              
             if(response.status == 'OK') 
                {                          
                    swal("Fit Tracking updated" , "Pinpoint has updated Fit Tracking", "success");                          
                                          
                    //need a timeout or the SweetAlert message will not show.... 
                    setTimeout(closeMe, 4900);                 
 
                } 
                else 
                { 
                    swal("System Update Failure" , "201: Fit was not updated- record saved locally", "error"); 
                       setTimeout(closeMe, 4900);
                } 
       
            }, 
                error : function() { swal("System Network Failure - Offline" , "101: Fit was not updated- record saved locally - please try again when you are back online", "error"); $('#tickitAttachment').attr('disabled', false);} 
            
         }); 
}

function initializeMap()
{
	var map_canvas = document.getElementById('map_canvas');
	var map_options = {
	//center: myCenter,
	zoom: 16,
	mapTypeId: google.maps.MapTypeId.MAP
	}
	map = new google.maps.Map(map_canvas, map_options)

}
		
/* Function to update MAP*/
function updateMap()
{
	if(TickitLongitude !=null && TickitLongitude != "")
	{
		if(marker != null)
		marker.setMap(null);
		var gpsPoint = new google.maps.LatLng(TickitLatitude, TickitLongitude);
		if(map!=null)
			map.setCenter(gpsPoint);
		marker = new google.maps.Marker({
		position:gpsPoint,
		map:map
		});
		infowindow.setContent(TickitAddress);
		infowindow.open(map,marker);
	}
}


function showImage()
{
	$("#firstContainer").fadeIn('normal');
        $("#secondContainer").hide();
        $(".mapCustom").hide();
	$("#showImageBtn").hide();
	$("#showMapBtn").show();
	$("#backBtn").show();
        $("#imageContainer").fadeIn('normal');
	$("#imageBtnContainer").hide();
	$(".thirdContainer").hide();
	$("#imageContainer img").prop("src",attachmentUrl);
        $("#FitBtn").hide();
	
}

function backToOriginal()
{
        $("#FitBtn").show();
        $("#firstContainer").fadeIn('normal');
        $("#secondContainer").fadeIn('normal');
	$(".mapCustom").hide();
	$("#backBtn").hide();
	$("#showImageBtn").hide();
	$("#showMapBtn").show();
	$("#imageBtnContainer").show();
	$(".thirdContainer").fadeIn('normal');
	$("#imageContainer").hide();
}

function closeForm()
{
	swal({
	  title: "Goodbye!",
	  text: "Fit City Track says Goodbye for now",
	  timer: 3000
	});
       setTimeout(closeMe, 4900);
}

function closeMe() 
{ 
    window.location.href = "http://192.168.1.217:8080/";     
} 
   
