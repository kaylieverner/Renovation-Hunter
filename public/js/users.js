/* eslint-disable no-use-before-define */
$(document).ready(function () {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page

  // $.get('/api/user_data').then(function (data) {
  //   $('.member-name').text(data.email);
  // });

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
  if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getPosts(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getPosts();
  }

  function getPosts(user) {
    userId = user || '';
    if (userId) {
      userId = '/?user_id=' + userId;
    }
    $.get('/api/posts' + userId, function(data) {
      console.log('Posts', data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      } else {
        initializeRows();
        initializeRowsCompletedJobs();
      }
    });
  }

  //when user clicks delete post, remove data from database and remove card
  deleteBtn.on('click', function (post) {
    $.ajax({
      method: 'DELETE',
      url: '/api/posts',
      data: post
    }).then(getPosts);
  });

  function initializeRows() {
    activeJobPostContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i <posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    activeJobPostContainer.append(postsToAdd);
  }

  function initializeRowsCompletedJobs() {
    jobsCompletedContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i <posts.length; i++) {
      postsToAdd.push(createNewRowCompletedJobs(posts[i]));
    }
    jobsCompletedContainer.append(postsToAdd);
  }

  function createNewRow(post) {
    var newPostRow = $('<div>');
    newPostRow.addClass('row');
    newPostRow.append(newPostCol);
    var newPostCol = $('<div>');
    newPostCol.addClass('col');
    newPostCol.append(newPostCard);
    var newPostCard = $('<div>');
    newPostCard.addClass('card-body');
    var cardTitle = $('<h5>');
    cardTitle.addClass('card-title');
    cardTitle.text(post.title);
    newPostCard.append(cardTitle);
    var cardTimeframe = $('<h6>');
    cardTimeframe.addClass('card-subtitle mb-2 text-muted');
    cardTimeframe.text(post.timeframe);
    newPostCard.append(cardTimeframe);
    var cardJobCat = $('<h6>');
    cardJobCat.addClass('card-subtitle mb-2');
    cardJobCat.text(post.category);
    newPostCard.append(cardJobCat);
    var cardDescription = $('<p>');
    cardDescription.addClass('card-text');
    cardDescription.text(post.jobDescription);
    newPostCard.append(cardDescription);
    var cardEditBtn = $('<a>');
    cardEditBtn.addClass('btn btn-success');
    cardEditBtn.attr('id', 'editBtn');
    cardEditBtn.text('Edit Post');
    newPostCard.append(cardEditBtn);
    var cardDelBtn = $('<a>');
    cardDelBtn.addClass('btn btn-danger');
    cardDelBtn.attr('id', 'deleteBtn');
    cardDelBtn.text('Delete Post');
    newPostCard.append(cardDelBtn);
    return newPostRow;
  }

  function createNewRowCompletedJobs(post) {
    var newPostRow = $('<div>');
    newPostRow.addClass('row');
    newPostRow.append(newPostCol);
    var newPostCol = $('<div>');
    newPostCol.addClass('col');
    newPostCol.append(newPostCard);
    var newPostCard = $('<div>');
    newPostCard.addClass('card-body');
    var cardTitle = $('<h5>');
    cardTitle.addClass('card-title');
    cardTitle.text(post.title);
    newPostCard.append(cardTitle);
    var cardTimeframe = $('<h6>');
    cardTimeframe.addClass('card-subtitle mb-2 text-muted');
    cardTimeframe.text(post.timeframe);
    newPostCard.append(cardTimeframe);
    var cardJobCat = $('<h6>');
    cardJobCat.addClass('card-subtitle mb-2');
    cardJobCat.text(post.category);
    newPostCard.append(cardJobCat);
    var cardDescription = $('<p>');
    cardDescription.addClass('card-text');
    cardDescription.text(post.jobDescription);
    newPostCard.append(cardDescription);
    var cardEditBtn = $('<a>');
    cardEditBtn.addClass('btn btn-success');
    cardEditBtn.attr('id', 'editBtn');
    cardEditBtn.text('Edit Post');
    newPostCard.append(cardEditBtn);
    var cardDelBtn = $('<a>');
    cardDelBtn.addClass('btn btn-danger');
    cardDelBtn.attr('id', 'deleteBtn');
    cardDelBtn.text('Delete Post');
    newPostCard.append(cardDelBtn);
    return newPostRow;
  }

  deleteBtn.on('click', function() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data('post');
    deletePost(currentPost.id);
  });

<<<<<<< HEAD

//when user clicks create, write job post info to database 
//figure out if a user or contractor is logged in to show correct html page 
=======
  editBtn.on('click', function() {
    var currentPost = $(this)
      .parent()
      .parent()
      .data('post');
    window.location.href = '/users?post_id=' + currentPost.id;
  });

  //figure out if a user or contractor is logged in to show correct html page
  function submitPost(post) {
    $.post('/api/posts', post, function () {
      window.location.href = '/blog';
    });
  }
>>>>>>> bd02e619a97e01eb65cf920ed4eb3cc9a579cee8

  //when user clicks create, append the job post to the jobs pending card

 

  //job posts with an active status should append to my active job posts
  //GET requst

  //job posts with an inactive status should append to jobs completed
  //GET request
  //when user clicks create, create new post
  createBtn.on('click', function createPost(event) {
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
      // userId: userId
    };
    console.log(newPost);

    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    } else {
      submitPost(newPost);
    }

  });

});