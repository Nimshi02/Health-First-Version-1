if(sessionStorage.getItem('username')==null){
	location.href="login.html"
};
var token = sessionStorage.getItem('accessToken');
$(document).ready(function(){
	  $("button").click(function(){
		  var pid=document.getElementById("pid").value;//This is to get the userid
			
	    $.ajax({ /* This will get invoke the api and return the results */
	    	type: "GET",
		        url: 'https://localhost:8243/dataservice/1.0.0/ViewReport?PID='+pid,
		        headers:{         
		        	'accept' :'*/*',
		            'Authorization' : 'Bearer '+token,
		            },
		       
	    	
	    	success: function(result, status, xhr){
	    		PatientDetails(result)
	    		
	    },
		        error: function(error){
		  	      $("#div1").html("Error occured while creating a medical record. Please try again.");
		        }
		});
	  });
	});
	
	function PatientDetails(xml) {
        var i;
        var table =
            `<table><tbody><tr><th>Report No</th>
                <th>Doctor ID</th>
                <th>Patient ID</th>
                 <th>Date</th>
                  <th>Result</th>
                  <th>Report Name</th>
            </tr>`;
        var x = xml.getElementsByTagName("Entry");

        // Start to fetch the data by using TagName 
        for (i = 0; i < x.length; i++) {
            table += `<tr><td>` +
                x[i].getElementsByTagName("reportNo")[0]
                .childNodes[0].nodeValue + `</td><td>` +
                x[i].getElementsByTagName("did")[0]
                .childNodes[0].nodeValue + `</td><td>` +
                x[i].getElementsByTagName("patientid")[0]
                .childNodes[0].nodeValue + `</td><td>`+
                x[i].getElementsByTagName("date")[0]
                .childNodes[0].nodeValue + `</td><td>`+
                x[i].getElementsByTagName("result")[0]
                .childNodes[0].nodeValue + `</td><td>`+
                x[i].getElementsByTagName("reportName")[0]
                .childNodes[0].nodeValue + `</td></tr>`;
                
        }
        document.getElementById("div1").innerHTML = table;
	}