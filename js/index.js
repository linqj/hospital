var app = document.getElementById("app");
var firstPage = document.getElementsByClassName("first-page")[0];
var secondPage = document.getElementsByClassName("second-page")[0];
var threePage = document.getElementsByClassName("three-page")[0];
var fourPage = document.getElementsByClassName("four-page")[0];
var handMove = document.getElementsByClassName("hand-move")[0];
var handMoveImg = document.getElementsByClassName("hand-move-img")[0];
var fourPageImg = document.getElementsByClassName("four-page-content-img")[0];
var firstPageInput = document.getElementsByClassName("first-page-input")[0];
var secondPageTitle = document.getElementsByClassName("second-page-title")[0];
var secondPageContents = document.getElementsByClassName("second-page-content");
var pageNum = 0;
var nameValue = null; 
function blurInput() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
function toInsure() {
  nameValue = firstPageInput.value;
  if (!nameValue) {
    alert("请输入您的姓名");
  } else {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    app.style.backgroundImage = "url('./images/background2.jpg')";
    firstPage.style.display = "none";
    secondPage.style.display = "block";
    sessionStorage.setItem("pageNum", pageNum);
    sessionStorage.setItem("nameValue", nameValue);
  }
  this.operateOption(pageNum);
}
function operateOption(num) {
  var that = this;
  var option = questionData.find(item => {
    return item.order == num;
  });
  var isUnNormal = false; 
  secondPageTitle.innerHTML = option.title;
  option.options.forEach((item, index) => {
    var parentNode = secondPageContents[index];
    parentNode.children[1].innerHTML = item.value;
    parentNode.children[0].setAttribute("src", "./images/radio.png");
  });
  if (option.options.length < 4) {
    var parentNode = secondPageContents[3];
    parentNode.children[1].innerHTML = "";
    parentNode.children[0].setAttribute("src", "");
  }
  for (var i = 0; i < secondPageContents.length; i++) {
    let childValue = secondPageContents[i].children[1].innerText;
    if (childValue) {
      (function(i) {
        secondPageContents[i].onclick = function() {
          secondPageContents[i].children[0].setAttribute(
            "src",
            "./images/radio_checked.png"
          );
          if (num == "0") {
            pageNum += 1;
          } else if (num == "1") {
            if (i == "0") {
              pageNum = 8;
            } else if (i == "1" || i == "2") {
              pageNum = 3;
            } else {
              isUnNormal = true;
              that.dealNoCare(num);
            }
          } else if (num == 8) {
            if (i == "0") {
              pageNum = 4;
            } else if (i == "1") {
              pageNum = 2;
            } else {
              isUnNormal = true;
              that.dealNoCare(num);
            }
          } else if (num == 4) {
            if (i == 2) {
              isUnNormal = true;
              that.dealNoCare(num);
            } else {
              pageNum = 2;
            }
          } else if (num == 2) {
            if (i == 2) {
              isUnNormal = true;
              that.dealNoCare(num);
            } else {
              pageNum = 5;
            }
          } else if (num == 3) {
            if (i == 0) {
              pageNum = 6;
            } else if (i == 1 || i == 2) {
              pageNum = 5;
            }
          } else if (num == 6) {
            if (i == 2) {
              //选择了管你屁事
              isUnNormal = true;
              that.dealNoCare(num);
            } else {
              pageNum = 7;
            }
          } else if (num == 7) {
            pageNum = 5;
          } else if (num == 5) {
            //最后一题进入loading页面
            that.dealResult();
          }
          if (num != 5 && !isUnNormal) {
            setTimeout(function() {
              return operateOption(pageNum);
            }, 500);
          }
        };
      })(i);
    }
  }
}
function dealNoCare(num) {
  handMove.style.display = "block";
  handMoveImg.style.animation = "mymove 0.1s forwards";
  if (num == "1") {
    this.setNestTep(3);
  } else if (num == "8") {
    this.setNestTep(5);
  } else if (num == "2" || num == "6") {
    this.setNestTep(5);
  } else if (num == "4") {
    this.setNestTep(2);
  }
}
function setNestTep(index) {
  setTimeout(function() {
    pageNum = index;
    this.operateOption(pageNum);
    handMove.style.display = "none";
    handMoveImg.style.width = "10%";
    handMoveImg.style.animation = "";
  }, 1000);
}
function dealResult() {
  handMove.style.display = "none";
  var customerName = document.getElementsByClassName("customer-item-name")[0];
  var signDate = document.getElementsByClassName("four-page-sign-date")[0];
  // // 首先进入loading页面
  app.style.backgroundImage = "url('./images/background3.jpg')";
  secondPage.style.display = "none";
  threePage.style.display = "block";

  setTimeout(function() {
    app.style.backgroundImage = "url('./images/background4.jpg')";
    threePage.style.display = "none";
    fourPage.style.display = "block";
    customerName.innerHTML = "姓名：" + nameValue;
    signDate.innerHTML = "日期：" + this.getNowDate();
    fourPageImg.style.display = "block";
    this.html2Canvas();
  }, 3000);
}

function html2Canvas() {
  const shareContent = fourPage; 
  const width = shareContent.offsetWidth;
  const height = shareContent.offsetHeight; 
  const offsetTop = shareContent.offsetTop;
  const canvas = document.createElement("canvas"); 
  const context = canvas.getContext("2d");
  const scaleBy = getPixelRatio(context); 
  canvas.width = width * scaleBy; 
  canvas.height = (height + offsetTop) * scaleBy; 
  context.scale(scaleBy, scaleBy);
  const opts = {
    useCORS: true,
    tainttest: true, 
    scale: scaleBy, 
    canvas: canvas, 
    width: width, 
    height: height 
  };
  html2canvas(shareContent, opts).then(function(canvas) {
    var context = canvas.getContext("2d");
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    canvas.setAttribute("id", "thecanvas");
    fourPage.innerHTML = "";
    fourPage.appendChild(canvas);
    var thecanvas = document.getElementById("thecanvas");
    var imgUrl = thecanvas.toDataURL("image/png");
    var img = document.getElementById("img");
    fourPage.style.display = "none";
    img.style.display = "block";
    img.src = imgUrl;
  });
}
function getPixelRatio(context) {
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
}

function getNowDate() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1; 
  var day = now.getDate();
  var clock = year + "年";
  if (month < 10) {
    clock += "0";
  }
  clock += month + "月";
  if (day < 10) {
    clock += "0";
  }
  clock += day + "日";
  return clock;
}
