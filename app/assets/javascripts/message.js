$(function(){

      function buildHTML(message){
        if ( message.image ) {
          var html =
          `<div class="message" data-message-id=${message.id}>
              <div class="message__upper">
                <div class="upper__name">
                  ${message.user_name}
                </div>
                <div class="upper__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message-text">
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
              <div class="message__upper">
                <div class="upper__name">
                  ${message.user_name}
                </div>
                <div class="upper__date">
                  ${message.created_at}
                </div>
              </div>
              <div class="message-text">
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
        var url = $(this).attr('action');
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
          $('.contents__main').append(html)
          $('.contents__main').animate({ scrollTop: $('.contents__main')[0].scrollHeight})
          $('.contents__form__submit').removeAttr('disabled');
          $('.new_message')[0].reset();
        })
        .fail(function() {
          alert("メッセージ送信に失敗しました");
        });
      })
});