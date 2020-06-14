/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
$(document).ready(function () {
  var title = $('#title');
  var category = $('#category');
  var timeframe = $('#timeframe');
  var description = $('#description');
  var saveBtn = $('.save');
  var postEditor = $('#postEditor');
  saveBtn.on('click', handleFormSubmit);
  var url = window.location.search;
  var jobId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;
  if (url.indexOf('?job_id=') !== -1) {
    jobId = url.split('=')[1];
    console.log(jobId);
    getPostData(jobId);
  }
  function handleFormSubmit(event) {

    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!title.val().trim() || !description.val().trim()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: title.val().trim(),
      category: category.val().trim(),
      timeframe: timeframe.val(),
      description: description.val()
    };
    console.log(newPost);
    if (updating) {
      newPost.id = jobId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  }
  function submitPost(job) {
    $.post('/api/jobs', job, function() {
      window.location.href = '/members';
    });
  }
  function getPostData(jobId) {
    console.log('getpostdata running');
    console.log(jobId);
    $.get('/api/jobs/' + jobId, function(data) {
      if (data) {
        console.log(data.id);
        // If this post exists, prefill our cms forms with its data
        title.val(data.title);
        category.val(data.category);
        timeframe.val(data.timeframe);
        description.val(data.description);
        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }
  function updatePost(job) {
    $.ajax({
      method: 'PUT',
      url: '/api/jobs',
      data: job
    })
      .then(function() {
        window.location.href = '/members';
      });
  }
});