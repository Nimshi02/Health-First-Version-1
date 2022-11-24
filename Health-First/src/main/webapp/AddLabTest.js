if(sessionStorage.getItem('username')==null){
	location.href="login.html"
};

$(document).ready(function(){
	  $("button").click(function(){
		  var uniqueNo=document.getElementById("uNo").value;//This is to get the userid
			var name=document.getElementById("labTname").value;//This will get the doctors ID which was entered by the user
			var price=document.getElementById("price").value;//This will get the medicine code enterd by doctor
			var token = sessionStorage.getItem('accessToken');
	    $.ajax({ /* This will get invoke the api and return the results */
	    	type: "GET",
		        url: 'https://localhost:8243/dataservice/1.0.0/AddLabReport?reportUNo='+uniqueNo+'&reportName='+name+'&price='+price,
		        headers:{         
		        	'accept' :'*/*',
		            'Authorization' : 'Bearer '+token,
		            },
		       
	    	
	    	success: function(result, status, xhr){
	    		var print="<h1>New Lab report type is added successfully</h1>"
	    		$("#div1").html(print);
	    },
		        error: function(error){
		  	      $("#div1").html("Error occured while creating a medical record. Please try again.");
		        }
		});
	  });
	});