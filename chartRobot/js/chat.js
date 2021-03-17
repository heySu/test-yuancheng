$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui();

  //为发送按钮添加点击事件
  $("#btnSend").on("click", function () {
    let text = $("#ipt").val().trim();
    if (text.length <= 0) return $("#ipt").val("");
    $("#talk_list").append(`<li class="right_word">
            <img src="img/person02.png" /> <span>${text}</span>
          </li>`);
    $("#ipt").val("");
    resetui();
    getMsg(text);
  });

  function getMsg(text) {
    $.ajax({
      method: "GET",
      url: "http://www.escook.cn:3006/api/robot",
      data: {
        spoken: text
      },
      success: function (res) {
        if (res.message === "success") {
          let msg = res.data.info.text;
          $("#talk_list").append(`<li class="left_word">
            <img src="img/person01.png" /> <span>${msg}</span>
          </li>`);
          resetui();
          getVioce(msg);
        }
      }
    });
  }

  function getVioce(robotText) {
    $.ajax({
      method: "GET",
      url: "http://www.escook.cn:3006/api/synthesize",
      data: {
        text: robotText
      },
      success: function (res) {
        if (res.status === 200) {
          $("#voice").attr("src", res.voiceUrl);
        }
      }
    });
  }

  $("#ipt").on("keyup", function (e) {
    if (e.keyCode === 13) {
      $("#btnSend").click();
    }
  });
})