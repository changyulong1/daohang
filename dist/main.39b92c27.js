// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $ul = $('.mainContent > ul');
var $dataList = $('.dataList');
var $puls = $('.plus');
var dataList = JSON.parse(localStorage.getItem('x')) || [{
  src: "https://www.baidu.com//favicon.ico",
  text: "baidu.com"
}, {
  src: "https://www.bilibili.com/favicon.ico",
  text: "bilibili.com"
}, {
  src: "https://xiedaimala.com//favicon.ico",
  text: "xiedaimala.com"
}, {
  src: "https://developer.mozilla.org/favicon.ico",
  text: "developer.mozilla.org"
}, {
  src: "https://gitee.com/favicon.ico",
  text: "www.gitee.com"
}]; //初始化数据

var list = [];

for (var key in dataList) {
  var li = $("\n    <li title=\"".concat(dataList[key].text, "\">\n        <div class=\"logo\">\n            <img src=\"").concat(dataList[key].src, "\">\n        </div>\n        <div class=\"text\">").concat(dataList[key].text, "</div>\n        <span class=\"span\" title=\"").concat(dataList[key].text, "\">\n            <svg class=\"icon\">\n                <use xlink:href=\"#icon-cha\"></use>\n            </svg>\n        </span>\n    </li>\n    "));
  list.push(li);
}

$ul.prepend(list); //添加到ul里面
//获取添加的li

var liList = $(".mainContent > ul >li:not('.plus')"); //点击跳转

$dataList.on('click', "li:not('.plus')", function (e) {
  for (var i = 0; i < liList.length; i++) {
    if (e.currentTarget === liList[i]) {
      var url = $(liList[i]).children()[1].innerText;

      if (url.indexOf("https://") === -1) {
        url = "https://" + url;
      }

      open(url, "_self");
    }
  }
}); //添加网址

$puls.on('click', function (e) {
  var url2 = prompt("请输入你的网址");

  if (url2.indexOf("https://") === -1) {
    console.log(6);
    alert("请输入网址例如：https://www.baidu.com");
  } else {
    var src = url2 + "/favicon.ico";
    var text = url2.replace("https://www.", "").replace("/", "");
    var dali = $("\n            <li title=\"".concat(text, "\">\n                <div class=\"logo\">\n                    <img src=\"").concat(src, "\">\n                </div>\n                <div class=\"text\">").concat(text, "</div>\n                <span class=\"span\" title=\"").concat(text, "\" >\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-cha\"></use>\n                    </svg>\n                </span>\n            </li>\n        "));
    $puls.before(dali);
    dataList.push({
      src: src,
      text: text
    });
    localStorage.setItem('x', JSON.stringify(dataList));
  }
}); //删除

liList.on('click', "span", function (e) {
  e.stopPropagation(); // 阻止冒泡

  for (var i = 0; i < liList.length; i++) {
    if (this.title === liList[i].title) {
      console.log(liList[i]);
      liList[i].remove();
      dataList.splice(i, 1);
      console.log(dataList);
    }
  }

  localStorage.setItem('x', JSON.stringify(dataList));
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.39b92c27.js.map