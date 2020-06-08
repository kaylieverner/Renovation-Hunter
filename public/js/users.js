$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.email);
  });
});

//when user clicks create, write job post info to database 

//when user clicks create, append the job post to the jobs pending card 

//when user wants to edit a post, bring up the job post info 

//when user clicks delete post, remove data from database and remove card 

