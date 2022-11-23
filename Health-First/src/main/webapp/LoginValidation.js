/**
 * This page is to generate id token using IS, generate access token and based on the claims, redirect the user to corret page
 */
 $(document).ready(function(){
	  $("button").click(function(){
		  var idToken="";
		  var accessToken="";
		  var user=document.getElementById("txtuname").value;
		  var id=document.getElementById("txtid").value;
		  
		  
		  sessionStorage.setItem('username',user);
		  
		  var details = {
				  'grant_type':'password',
				    'username': user,
				    'password': id,
				    'scope': 'openid'}
		  var formBody = [];
		  for (var property in details) {
		    var encodedKey = encodeURIComponent(property);
		    var encodedValue = encodeURIComponent(details[property]);
		    formBody.push(encodedKey + "=" + encodedValue);
		  }
		  formBody = formBody.join("&");
		 
	    $.ajax({ /* This AJAX function is to send the user details to the IS and get the id token */
	    	type: "POST",
		        url: 'https://localhost:9444/oauth2/token',
		        contentType: "application/x-www-form-urlencoded",
		        beforeSend: function(xhr) {
		            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent('AeanWPGVNnwZ1htfDIiMKD1oqFYa' + ':' + '6tJ3FuaEtB3GfzCOXDMNI6ffqTca'))))
		          },
		          headers: {
		        		
			            'Content-Type': 'application/x-www-form-urlencoded',
			            'Access-Control-Allow-Origin': '*'
			          },
		          data: formBody,
		          
		          
		          success: function(result, status, xhr){
		        	  idToken = result["id_token"];
		        	  var data = {
		    				  'grant_type':'urn:ietf:params:oauth:grant-type:jwt-bearer',
		    				   'assertion': idToken,
		    				   }
		    		  var Body = [];
		    		  for (var property in data) {
		    		    var encodedKey = encodeURIComponent(property);
		    		    var encodedValue = encodeURIComponent(data[property]);
		    		    Body.push(encodedKey + "=" + encodedValue);
		    		  }
		    		  
		    		  Body = Body.join("&");
		    		    $.ajax({ /*  This function is to send the id token to APIM and generate access token*/
		    		    	type: "POST",
		    			        url: 'https://localhost:8243/token',
		    			        beforeSend: function(xhr) {
		    			            xhr.setRequestHeader('Authorization', 'Basic ' + btoa(unescape(encodeURIComponent('WucOGQ6y1mR4uvOw5SwjBskoUJka' + ':' + 'p7WAE4oaxtfcS4kXsc7IlsXtfp4a'))))
		    			          },
		    			        headers: {
		    			            'Content-Type': 'application/x-www-form-urlencoded',
		    			          },
		    			          data: Body,
		    			          
		    			          
		    			          success: function(result, status, xhr){
		    			        	  
		    			        	  /* This will decode the id token and extract the returned claim 'HospitalRole' */
		    			        	  var base64Url = idToken.split('.')[1];
		    			        	    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		    			        	    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		    			        	        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		    			        	    }).join(''));

		    			        	  var encoded= JSON.parse(jsonPayload);
		    			        	  var role= encoded["HospitalRole"];
		    			        	  
		    			        	  accessToken = result["access_token"];
		    			        	  sessionStorage.setItem('role',role);
		    			        	  alert(role);
		    			        	  sessionStorage.setItem('accessToken',accessToken);
		    				    		$("#div2").html(accessToken);
		    				    		if(accessToken!=null)/* This will check whether the access token is generated or not */
		    				    			{
		    				    			if(role=="admin")/* Based on the role user will redirected to different web pages */
		    				    				{
		    				    				location.href = "Admin.html";
		    				    				}
		    				    			else{
		    				    			if(role=="doctor")
		    				    				{
		    				    				location.href = "Doctor.html";
		    				    				}
		    				    				if(role=="MLS")
	    				    				{
	    				    				location.href = "MLS.html";
	    				    				}
		    				    			if(role=="patient")
	    				    				{
	    				    				location.href = "Patient.html";
	    				    				}
		    				    			if(role=="Pharmacist")	
		    				    			{
												location.href="Pharmacist.html";
		}
		    				    			}
		    				    			}
		    				    },
		    					        error: function(error){
		    					  	      $("#div2").html("An error occured while registering the user");
		    					        }
		    			      
		    			});
			    },
				        error: function(error){
				  	      $("#div1").html("An error occured while creating a token to the user");
				        }
	    	
		      
		});
	   
		 
	  });
	});