$(document).ready(function(){
  var acceptBtn = $('.acceptBtn');

  //query available jobs card based on selection the user makes

  //all posts
  function getPosts() {

  };

  //specific posts based on category and date range

  //post bid amount upon clicking bid, then append to pending bids card

  //upon clicking accept, change to accepted button that is greyed out
  acceptBtn.on('click', function() {
    console.log('clicked');
    acceptBtn.addClass('disabled');
    acceptBtn.html('Accepted');
  });

 
});


