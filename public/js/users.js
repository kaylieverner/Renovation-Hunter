$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function(data) {
    $('.member-name').text(data.email);
  });
});

//figure out if a user or contractor is logged in to show correct html page 

//when user clicks create, post job info to database 
function createPost() {

};

//when user clicks create, append the job post to the jobs pending card 

//when user wants to edit a post, bring up the job post info based on id and route to posteditor HTML
function getPost() {

};

//when user clicks delete post, remove data from database and remove card 
function deletePost() {

}; 

//job posts with an active status should append to my active job posts
//GET requst

//job posts with an inactive status should append to jobs completed
//GET request