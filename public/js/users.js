/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get('/api/user_data').then(function (data) {
    $('.member-name').text(data.email);
  });
  var jobs;
  var title = $('#title');
  var category = $('#jobCat');
  var timeframe = $('#timeframe');
  var jobDescription = $('#jobDescription');
  var createBtn = $('#createBtn');
  var editBtn = $('#editBtn');
  var deleteBtn = $('#deleteBtn');
  var posts;
  var activeJobPostContainer = $('.activePosts');
  var jobsCompletedContainer = $('.completedPosts');
  // The code below handles the case where we want to get blog posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var postId;
  var userId;
  var updating = false;
  // if (url.indexOf('?id=') !== -1) {
  //   userId = url.split('=')[1];
  //   getPosts(userId);
  // }
  // // If there's no userId we just get all posts as usual
  // else {
  //   getPosts();
  // }


  // function initializeRowsCompletedJobs() {
  //   jobsCompletedContainer.empty();
  //   var postsToAdd = [];
  //   for (var i = 0; i <posts.length; i++) {
  //     postsToAdd.push(createNewRowCompletedJobs(posts[i]));
  //   }
  //   jobsCompletedContainer.append(postsToAdd);
  // }

  // function createNewRowCompletedJobs(post) {
  //   var newPostRow = $('<div>');
  //   newPostRow.addClass('row');
  //   newPostRow.append(newPostCol);
  //   var newPostCol = $('<div>');
  //   newPostCol.addClass('col');
  //   newPostCol.append(newPostCard);
  //   var newPostCard = $('<div>');
  //   newPostCard.addClass('card-body');
  //   var cardTitle = $('<h5>');
  //   cardTitle.addClass('card-title');
  //   cardTitle.text(post.title);
  //   newPostCard.append(cardTitle);
  //   var cardTimeframe = $('<h6>');
  //   cardTimeframe.addClass('card-subtitle mb-2 text-muted');
  //   cardTimeframe.text(post.timeframe);
  //   newPostCard.append(cardTimeframe);
  //   var cardJobCat = $('<h6>');
  //   cardJobCat.addClass('card-subtitle mb-2');
  //   cardJobCat.text(post.category);
  //   newPostCard.append(cardJobCat);
  //   var cardDescription = $('<p>');
  //   cardDescription.addClass('card-text');
  //   cardDescription.text(post.jobDescription);
  //   newPostCard.append(cardDescription);
  //   var cardEditBtn = $('<a>');
  //   cardEditBtn.addClass('btn btn-success');
  //   cardEditBtn.attr('id', 'editBtn');
  //   cardEditBtn.text('Edit Post');
  //   newPostCard.append(cardEditBtn);
  //   var cardDelBtn = $('<a>');
  //   cardDelBtn.addClass('btn btn-danger');
  //   cardDelBtn.attr('id', 'deleteBtn');
  //   cardDelBtn.text('Delete Post');
  //   newPostCard.append(cardDelBtn);
  //   return newPostRow;
  // }
  //delete post
  deleteBtn.on('click', function() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data('post');
    deletePost(currentPost.id);
  });
  //when user clicks delete post, remove data from database and remove card
  deleteBtn.on('click', function (post) {
    $.ajax({
      method: 'DELETE',
      url: '/api/posts',
      data: post
    }).then(getPosts);
  });
  //edit post
  editBtn.on('click', function() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data('post');
    window.location.href = '/users?post_id=' + currentPost.id;
  });
  //CODE BELOW THIS LINE IS WORKING:
  //when user clicks create, create new post
  createBtn.on('click', function (event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or user
    if (!title.val().trim() || !category.val().trim() || !jobDescription.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: title.val().trim(),
      category: category.val().trim(),
      timeframe: timeframe.val().trim(),
      jobDescription: jobDescription.val().trim(),
    };
    console.log(newPost);
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }
  });
  function submitPost(newPost) {
    $.post('/api/posts', newPost, function () {
      window.location.href = '/members';
    });
  }

  function initializeRows() {
    activeJobPostContainer.empty();
    var jobsToAdd = [];
    for (var i = 0; i < jobs.length; i++) {
      jobsToAdd.push(createNewRow(jobs[i]));
    }
    activeJobPostContainer.append(jobsToAdd);
  }
  function createNewRow(job) {
    var jobCard = $('<div>');
    jobCard.addClass('card');
    var jobCardHeading = $('<div>');
    jobCardHeading.addClass('card-header');
    var editBtn = $('<button>');
    editBtn.text('Edit Post');
    editBtn.addClass('edit btn btn-success');
    var delBtn = $('<button>');
    delBtn.text('Delete Post');
    delBtn.addClass('delete btn btn-danger ml-2');
    var jobTitle = $('<h2>');
    var jobCategory = $('<h4>');
    var jobTimeframe = $('<h5>');
    jobTitle.text(job.title);
    jobCategory.text('Category: ' + job.category);
    jobTimeframe.text('Timeframe: ' + job.timeframe);
    jobCardHeading.append(jobTitle);
    jobCardHeading.append(jobCategory);
    jobCardHeading.append(jobTimeframe);
    var jobCardBody = $('<div>');
    jobCardBody.addClass('card-body');
    var jobBody = $('<p>');
    jobBody.text(job.description);
    jobCardBody.append(jobBody);
    jobCardBody.append(editBtn);
    jobCardBody.append(delBtn);
    jobCard.append(jobCardHeading);
    jobCard.append(jobCardBody);
    jobCard.data('job', job);
    return jobCard;
  }
  getPosts();
  function getPosts(user) {
    // userId = user || '';
    // if (userId) {
    //   userId = '/?user_id=' + userId;
    // }
    $.get('/api/jobs', function(data) {
      console.log('Posts', data);
      jobs = data;
      // if (!posts || !posts.length) {
      //   displayEmpty();
      // } else {
      initializeRows();
      // initializeRowsCompletedJobs();
    });
  }

  function deletePost(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/posts/' + id
    })
      .then(function() {
        getPosts();
      });
  }
  //when user clicks delete post, remove data from database and remove card
  $(document).on('click', 'button.delete', function handlePostDelete() {
    console.log('clicked');
    var currentPost = $(this)
      .parent()
      .parent()
      .data('job');
    console.log(currentPost);
    deletePost(currentPost.id);
  });

  $(document).on('click', 'button.edit', handlePostEdit);
  function handlePostEdit() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data('job');
    window.location.href = '/postEditor?job_id=' + currentPost.id;
  }


});