$(function(){ 
  function buildHTML(message){
    if (message.image) {
      var html =
        `<div class="message">
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
        `<div class="message">
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
});