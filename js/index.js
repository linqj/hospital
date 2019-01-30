// 点击立即诊断
var app = document.getElementById("app");
var firstPage = document.getElementsByClassName("first-page")[0];
var secondPage = document.getElementsByClassName("second-page")[0];
var threePage = document.getElementsByClassName("three-page")[0];
var fourPage = document.getElementsByClassName("four-page")[0];
var handMove = document.getElementsByClassName("hand-move")[0];
var handMoveImg = document.getElementsByClassName("hand-move-img")[0];
var fourPageImg = document.getElementsByClassName(
  "four-page-content-img"
)[0];
var firstPageInput = document.getElementsByClassName(
  "first-page-input"
)[0];
var secondPageTitle = document.getElementsByClassName(
  "second-page-title"
)[0];
var secondPageContents = document.getElementsByClassName(
  "second-page-content"
);
// var pageNum = 0 || sessionStorage.getItem("pageNum");
var pageNum = 0; //当前是第几题
var nameValue = null; //用户输入的名称
function toInsure() {
  nameValue = firstPageInput.value;
  //判断是否已经输入了值
  if (!nameValue) {
    alert("请输入您的姓名");
  } else {
    //点击立即诊断，换背景图片隐藏首页的内容
    app.style.backgroundImage = "url('./images/background2.jpg')";
    firstPage.style.display = "none";
    secondPage.style.display = "block";
    sessionStorage.setItem("pageNum", pageNum);
    sessionStorage.setItem("nameValue", nameValue);
  }
  this.operateOption(pageNum);
}
//根据第几题展示内容
function operateOption(num) {
  var that = this;
  var option = questionData.find(item => {
    return item.order == num;
  });
  var isUnNormal = false; //是否选择了关你屁事
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
            // merrageCode = i;
            //第二题判断是选择的那一道题
            if (i == "0") {
              pageNum = 8;
              //选择已婚
            } else if (i == "1" || i == "2") {
              pageNum = 3;
            } else {
              //选择了管你屁事
              isUnNormal = true;
              that.dealNoCare(num);
            }
          } else if (num == 8) {
            if (i == "0") {
              pageNum = 4;
            } else if (i == "1") {
              pageNum = 2;
            } else {
              //选择了管你屁事
              isUnNormal = true;
              that.dealNoCare(num);
            }
          } else if (num == 4) {
            if (i == 2) {
              //选择了管你屁事
              isUnNormal = true;
              that.dealNoCare(num);
            } else {
              pageNum = 2;
            }
          } else if (num == 2) {
            if (i == 2) {
              //选择了管你屁事
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
//处理关你屁事的选项
function dealNoCare(num) {
  handMove.style.display = "block";
  handMoveImg.style.animation = "mymove 0.1s forwards";
  if(num=='1'){
    this.setNestTep(3);
  }else if(num=='8'){
    this.setNestTep(4);
  }else if(num=='2'||num=='6'){
    this.setNestTep(5);
  }else if(num=='4'){
    this.setNestTep(2);
  }
}
function setNestTep(index){
  setTimeout(function() {
    pageNum=index;
    this.operateOption(pageNum);
    handMove.style.display = "none";
    handMoveImg.style.width = "10%";
    handMoveImg.style.animation = "";
  }, 1000);
}
//最后结果页
function dealResult() {
  handMove.style.display = "none";
  var customerName = document.getElementsByClassName(
    "customer-item-name"
  )[0];
  var signDate = document.getElementsByClassName(
    "four-page-sign-date"
  )[0];
  // // 首先进入loading页面
  app.style.backgroundImage = "url('./images/background3.jpg')";
  secondPage.style.display = "none";
  threePage.style.display = "block";

  //loading页面显示2秒后进入结果页面
  setTimeout(function() {
    app.style.backgroundImage = "url('./images/background4.jpg')";
    threePage.style.display = "none";
    fourPage.style.display = "block";
    customerName.innerHTML = "姓名：" + nameValue;
    signDate.innerHTML = "日期：" + this.getNowDate();
    fourPageImg.style.display = "block";
    // html转化为canvas生成图片
    this.html2Canvas();
  }, 3000);
}

function html2Canvas() {
  alert(3);
  const shareContent = fourPage; // 需要绘制的部分的 (原生）dom 对象 ，注意容器的宽度不要使用百分比，使用固定宽度，避免缩放问题
  const width = shareContent.offsetWidth; // 获取(原生）dom 宽度
  const height = shareContent.offsetHeight; // 获取(原生）dom 高
  const offsetTop = shareContent.offsetTop; // 元素距离顶部的偏移量
  const canvas = document.createElement("canvas"); // 创建canvas 对象
  const context = canvas.getContext("2d");
  const scaleBy = getPixelRatio(context); // 获取像素密度的方法 (也可以采用自定义缩放比例)
  canvas.width = width * scaleBy; // 这里 由于绘制的dom 为固定宽度，居中，所以没有偏移
  canvas.height = (height + offsetTop) * scaleBy; // 注意高度问题，由于顶部有个距离所以要加上顶部的距离，解决图像高度偏移问题
  context.scale(scaleBy, scaleBy);
  const opts = {
    // allowTaint: true, // 允许加载跨域的图片 （使用这个会报错）
    useCORS: true, // 允许加载跨域图片
    tainttest: true, // 检测每张图片都已经加载完成
    scale: scaleBy, // 添加的scale 参数
    canvas: canvas, // 自定义 canvas
    // logging: true, // 日志开关，发布的时候记得改成false
    width: width, // dom 原始宽度
    height: height // dom 原始高度
  };
  html2canvas(shareContent, opts).then(function(canvas) {
    var context = canvas.getContext("2d");
    // 【重要】关闭抗锯齿
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    //添加属性
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
  // 获取设备的pixel ratio
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
  var year = now.getFullYear(); //年
  var month = now.getMonth() + 1; //月
  var day = now.getDate(); //日
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