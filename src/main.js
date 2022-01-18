const $ul = $('.mainContent > ul')
const $dataList = $('.dataList')
const $add = $('.plus')
let dataList = JSON.parse(localStorage.getItem('data')) || [
    { src: "https://www.baidu.com//favicon.ico", text: "baidu.com" },
    { src: "https://www.bilibili.com/favicon.ico", text: "bilibili.com" },
    { src: "https://xiedaimala.com//favicon.ico", text: "xiedaimala.com" },
    { src: "https://developer.mozilla.org/favicon.ico", text: "developer.mozilla.org" },
    { src: "https://gitee.com/favicon.ico", text: "gitee.com" },
]

//初始化数据
function append() {
    let list = []
    for (let key in dataList) {
        let li = $(`
    <li title="${dataList[key].text}">
        <div class="logo">
            <img src="${dataList[key].src}">
        </div>
        <div class="text">${dataList[key].text}</div>
        <span class="span" title="${dataList[key].text}">
            <svg class="icon">
                <use xlink:href="#icon-cha"></use>
            </svg>
        </span>
    </li>
    `)
        list.push(li)
    }
    $ul.prepend(list)//添加到ul里面
}

//添加li标签
append()

//获取添加的li
let liList = $(".mainContent > ul >li:not('.plus')")
//点击跳转
$dataList.on('click', "li:not('.plus')", function (e) {
    const dataList = JSON.parse(localStorage.getItem('data'))
    for (let i = 0; i < liList.length; i++) {
        if (e.currentTarget === liList[i]) {
            let url = $(liList[i]).children()[1].innerText
            if (url.indexOf("https://") === -1) {
                url = "https://" + url
            }
            open(url, "_self")
        }

    }
})
//添加网址
$add.on('click', function (e) {
    let url2 = prompt("请输入你的网址")
    if (url2.indexOf("https://") === -1) {
        alert("请输入网址例如：https://www.baidu.com")
    } else {
        const src = url2 + "/favicon.ico"
        const text = url2.replace("https://", " ").replace("/", " ")
        const dali = $(
            `
            <li title="${text}">
                <div class="logo">
                    <img src="${src}">
                </div>
                <div class="text">${text}</div>
                <span class="span" title="${text}" >
                    <svg class="icon">
                        <use xlink:href="#icon-cha"></use>
                    </svg>
                </span>
            </li>
        `)
        const data = {
            src: src,
            text: text
        }
        let pan
        for (let i = 0; i < dataList.length; i++) {
            const text1 = String(dataList[i].text)
            const text2 = String(data.text)
            if (text2.indexOf(text1) != -1) {
                pan = true
                break
            } else {
                pan = false
            }
        }
        if (pan) {
            alert("这个网址已经添加过")

        } else {
            $add.before(dali)
            dataList.push(data)
            alert("添加网址" + data.text + "成功")
            localStorage.setItem('data', JSON.stringify(dataList))
        }
    }
    liList = $(".mainContent > ul >li:not('.plus')")

})

//删除
$ul.on('click', "span", function (e) {
    e.stopPropagation() // 阻止冒泡
    for (let i = 0; i < liList.length; i++) {
        if (this.title === liList[i].title) {
            liList[i].remove()
            dataList.splice(i, 1)
        }
    }
    localStorage.setItem('data', JSON.stringify(dataList))
})