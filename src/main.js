// 新增网址，使用jquery，在最后一个li标签前使用insertBefore方法插入；
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')

const hashMap = [
    { logo:'M',logoType:'text',url:'https://developer.mozilla.org/zh-CN/'} ,
    { logo:'./images/bilibili.png',logoType:'image',url:'https://www.bilibili.com/'} ,
    { logo:'G',logoType:'text',url:'https://www.google.com.hk/'} ,
]

hashMap.forEach(node=>{
    const $li = $(`<li>
        <a href="${node.url}">
            <div class="site">
                <div class="logo">${node.logo[0]}</div>
                <div class="link">${node.url}</div>
            </div>
        </a>    
    </li>`).insertBefore($lastLi)
})

$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请问你想新增的网址是什么？')
        if(url.indexOf('http')!== 0 ) {
            url = 'https://'+url
        }
        console.log(url)
        hashMap.push({
            logo:url[0],
            logoType:"text",
            url:url
        })
        $siteList.find('li:not(.last)').remove()
        hashMap.forEach(node=>{
            const $li = $(`<li>
                <a href="${node.url}">
                    <div class="site">
                        <div class="logo">${node.logo[0]}</div>
                        <div class="link">${node.url}</div>
                    </div>
                </a>    
            </li>`).insertBefore($lastLi)
        })
    })