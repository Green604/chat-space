$(function(){ 
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__post">
            <div class="message__post__member-name">
              ${message.user_name}
            </div>
            <div class="message__post__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
        `<div class="message" data-message-id=${message.id}>
          <div class="message__post">
            <div class="message__post__member-name">
              ${message.user_name}
            </div>
            <div class="message__post__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.message-list').animate({ scrollTop: $('.message-list')[0].scrollHeight });
        $('form')[0].reset();
        $('.submit-btn').prop('disabled', false);
      })
      .fail(function(data){
        alert("メッセージ送信に失敗しました");
      })
  })

  var reloadMessages = function() {
    if (document.location.href.match(/\/groups\/\d+\/messages/)) {
      var last_message_id = $('.message:last').data("message-id");
      $.ajax({
        url: "api/messages",
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        if (messages.length !== 0) {       
          var insertHTML = '';       
          $.each(messages, function(i, message) {
            insertHTML += buildHTML(message)
          });
          $('.messages').append(insertHTML);
          $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        }
      })
      .fail(function() {
        alert('error');
      });
    }   
  };
  setInterval(reloadMessages, 7000); 
});