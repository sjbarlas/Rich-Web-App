$(function(){
  $('#submitbutton').on('click', function(e){
    var username = $('#username').val();
    var requri   = 'https://api.github.com/users/'+username;
    var repouri  = 'https://api.github.com/users/'+username+'/repos';
    
    requestJSON(requri, function(json) {
      if(json.message == "Not Found" || username == '') {
        $('#ghapidata').html("<h2>No User Info Found</h2>");
      }
      
      else {
        var fullname   = json.name;
        var username   = json.login;
        var aviurl     = json.avatar_url;
        var profileurl = json.html_url;
        var location   = json.location;
        var reposnum     = json.public_repos;
        var email 		 = json.email;
		var location 	 = json.location;
		var public_gists = json.public_gists;
		
		/* User Profile */
        var outhtml = '<div class="style"><div class="ok"><strong>User Profile</strong></div></div>'
		/* Avatar */
        outhtml = outhtml + '<table class="pro"><tr><td><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="250" height="190" alt="'+username+'"></a></div></td></tr>';
		/* Name */
		if(fullname == undefined) { 
			outhtml = outhtml + '<tr><td><div class="style">Name </div></td></tr>'; 
		} else {
			outhtml = outhtml + '<tr><td><div class="style">Name</div> '+fullname+'</td></tr>';
		}
		/* Username */
		outhtml = outhtml + '<tr><td><div class="style">Username</div> '+username+'</td></tr>';
		/* Email */
		if(email == null) {
			outhtml = outhtml + '<tr><td><div class="style">Email</div> </td></tr>';
		} else {
			outhtml = outhtml + '<tr><td><div class="style">Email</div> '+email+'</td></tr>';
		}
		/* Location */
		if(location == null) {
			outhtml = outhtml + '<tr><td><div class="style">Location</div> </td></tr>';
		} else {
			outhtml = outhtml + '<tr><td><div class="style">Location</div> '+location+'</td></tr>';
		}
		/* Number of Gists */
		outhtml = outhtml + '<tr><td><div class="style">Number of Gists</div> '+public_gists+'</td></tr></table>'; /* ends table */

        
        var repositories;
        $.getJSON(repouri, function(json){
          repositories = json;   
          outputPageContent();                
        });          
        
        function outputPageContent() {
          if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p>'; }
          else {
            outhtml = outhtml + '<div class="repo"><strong><p class="font">User Repos</p></strong>';
            $.each(repositories, function(index) {
              outhtml = outhtml + '<table><tr><td><div class="style">Name</div> <a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name +'</a><br/><br/>';
			  outhtml = outhtml + '<div class="style">Description</div> '+repositories[index].description+'<br/></td></tr>';
            });
            outhtml = outhtml + '</table></div></div>'; 
          }
          $('#ghapidata').html(outhtml);
        }
      }
    });
  });
  
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
});
