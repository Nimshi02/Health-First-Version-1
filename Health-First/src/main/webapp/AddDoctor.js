if(sessionStorage.getItem('username')==null){
	location.href="login.html"
};

$(document).ready(function(){
	  $("button").click(function(){
		  var DID=document.getElementById("DID").value;//This is to get the userid
			var Dname=document.getElementById("Dname").value;//This will get the doctors ID which was entered by the user
			var availability=document.getElementById("availability").value;
			var location=document.getElementById("location").value;//This will get the location
			var speciality=document.getElementById("speciality").value;
			var dcharges=document.getElementById("dcharges").value;
			var token = sessionStorage.getItem('accessToken');
	    $.ajax({ /* This will get invoke the api and return the results */
	    	type: "GET",
		        url: 'https://localhost:8243/dataservice/1.0.0/AddDoctor?DID='+DID+'&Dname='+Dname+'&availability='+availability+'&location='+location+'&speciality='+speciality+'&dcharges='+dcharges,
		        headers:{         
		        	'accept' :'*/*',
		            'Authorization' : 'Bearer '+token,
		            },
		       
	    	
	    	success: function(result, status, xhr){
	    		var print="<h1>New Doctor is added successfully</h1>"
	    		$("#div1").html(print);
	    },
		        error: function(error){
		  	      $("#div1").html("Error occured while creating a medical record. Please try again.");
		        }
		});
	  });
	});