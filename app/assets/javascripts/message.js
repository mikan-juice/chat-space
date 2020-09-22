$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Chat-main__messages__comment">
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
            <img src="${message.image}">
        </div>`
      return html;
    } else {
      let html =
        `<div class="Chat-main__messages__comment">
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

  $('.Chat-main__form__new-message').on('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__messages').append(html).animate({ scrollTop: $('.Chat-main__messages')[0].scrollHeight});
      $('.Chat-main__form__new-message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
    return false;
  });
});