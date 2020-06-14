/* eslint-disable no-unused-vars */
//when user wants to edit a post, bring up the job post info based on id and route to posteditor HTML
$(document).ready(function () {
  var title = $('#title');
  var category = $('#job');
  var timeframe = $('#timeframe');
  var jobDescription = $('#jobDescription');
  var posts;
  var jobsEditedContainer = $('.EditedPosts');
  function getPost(id) {
    var queryUrl;
    queryUrl = '/api/jobs/' + id;
  }
  $.get(queryUrl, function (data) {
    if (data) {
      console.log(data.JobId || data.id);
      // If this post exists, prefill forms with its data
      title.val(data.title);
      category.val(data.category);
      timeframe.val(data.timeframe);
      jobDescription.val(data.jobDescription);
      authorId = data.AuthorId || data.id;
      // If we have a post with this id, set a flag for us to know to update the post
      // when we hit submit
      updating = true;
    }
  });
  app.get('/api/jobs/:id', function (req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
  });
  function updatePost(post) {
    $.ajax({
      method: 'PUT',
      url: '/api/posts',
      data: post
    })
      .then(function () {
        window.location.href = '/users';
      });
  }
});