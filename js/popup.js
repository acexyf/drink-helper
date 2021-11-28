$(function () {
  const totalCount = 120;

  chrome.storage.sync.get(
    ["interval", "startTime", "endTime", "open"],
    function (data) {
      const { interval, startTime, endTime, open, lastLog } = data;

      if (open) {
        $(".switch-text").text("关闭喝水提示");
        $(".switch-main").addClass("active");
      } else {
        $(".switch-text").text("开启喝水提示");
        $(".switch-main").removeClass("active");
      }
      $("#start-time").val(startTime);
      $("#end-time").val(endTime);

      ZUI.silder({
        elem: ".interval",
        color: "#1E9FFF",
        pos: `${interval}%`,
        showNum: true,
        count: totalCount,
        disable: false,
        callBackMove: function (num) {
          // console.log('move', num);
        },
        callBackMouseup: function (num) {
          if (num !== 0) {
            let temp = (num / 100) * totalCount;
            let nowMinutes = temp.toFixed();
            console.log(nowMinutes);

            chrome.storage.sync.set({
              interval: parseInt(nowMinutes),
            });
          }
        },
      });
    }
  );

  $(".switch-main").on("click", function () {
    $(this).toggleClass("active");
    if ($(this).hasClass("active")) {
      $(".switch-text").text("关闭喝水提示");
      chrome.storage.sync.set({
        open: true,
      });
    } else {
      $(".switch-text").text("开启喝水提示");
      chrome.storage.sync.set({
        open: false,
      });
    }
  });

  $("#start-time").on("change", function () {
    chrome.storage.sync.set({
      startTime: $(this).val(),
    });
  });
  $("#end-time").on("change", function () {
    chrome.storage.sync.set({
      endTime: $(this).val(),
    });
  });
});
