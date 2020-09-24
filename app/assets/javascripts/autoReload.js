$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat-main__messages__comment" data-message-id=${message.id}>
          <div class="Chat-main__messages__comment__info">
            <div class="Chat-main__messages__comment__info__name">
              ${message.user_name}
            </div>
            <div class="Chat-main__messages__comment__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__messages__comment__text">
            <p class="Chat-main__messages__comment__text__content">
              ${message.content}
            </p>
          </div>
            <img class="Chat-main__messages__comment__text__image" src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
        `<div class="Chat-main__messages__comment" data-message-id=${message.id}>
          <div class="Chat-main__messages__comment__info">
            <div class="Chat-main__messages__comment__info__name">
              ${message.user_name}
            </div>
            <div class="Chat-main__messages__comment__info__time">
              ${message.created_at}
            </div>
          </div>
          <div class="Chat-main__messages__comment__text">
            <p class="Chat-main__messages__comment__text__content">
              ${message.content}
            </p>
          </div>
        </div>`
      return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Chat-main__messages__comment:last').data("message-id") || 0;
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Chat-main__messages').append(insertHTML);
        $('.Chat-main__messages').animate({ scrollTop: $('.Chat-main__messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
})