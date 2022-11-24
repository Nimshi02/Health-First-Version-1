if(sessionStorage.getItem('username')==null){
	location.href="login.html"
};
var token = sessionStorage.getItem('accessToken');
$(document).ready(function(){
	  $("button").click(function(){
		  var LabScId=document.getElementById("labScId").value;//This is to get the labscientist id
			var name=document.getElementById("name").value;//This is for get the name of the lab scientist
			
	    $.ajax({ /* This will get invoke the api and return the results */
	    	type: "GET",
		        url: 'https://localhost:8243/dataservice/1.0.0/GetLabReportType',
		        headers:{         
		        	'accept' :'*/*',
		            'Authorization' : 'Bearer '+token,
		            },
		       
	    	
	    	success: function(result, status, xhr){
	    		var print="<h1>New LabScientist is added successfully</h1>"
	    		$("#div1").html(print);
	    },
		        error: function(error){
		  	      $("#div1").html("Error occured while creating a medical record. Please try again.");
		        }
		});
	  });
	});