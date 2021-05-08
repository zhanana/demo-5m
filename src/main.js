// 新增网址，使用jquery，在最后一个li标签前使用insertBefore方法插入；
const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)

const hashMap = xObject ||  [
    { logo:'M',logoType:'text',url:'https://developer.mozilla.org/zh-CN/'} ,
    { logo:'B',logoType:'text',url:'https://www.bilibili.com/'} ,
    { logo:'G',logoType:'text',url:'https://www.google.com.hk/'} 
]
// 简化显示的网址信息函数
const simplifyUrl = (url)=>{
    return url.replace('https://','')
    .replace('http://' ,'')
    .replace('www.','')
    .replace(/\/.*/,'')//正则表达式删除/后面的内容
}
const render = ()=>{
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index)=>{
        const $li = $(`<li>
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                    <svg class="icon-D" aria-hidden="true">
                        <use xlink:href="#icon-Close"></use>
                    </svg>
                    </div>
                </div>
        </li>`).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡
            console.log(hashMap)
            hashMap.splice(index,1)
            render()
        })
    })
}


render()


$('.addButton')
    .on('click',()=>{
        let url = window.prompt('请问你想新增的网址是什么？')
        if(url.indexOf('http')!== 0 ) {
            url = 'https://'+url
        }
        console.log(url)
        hashMap.push({
            logo:simplifyUrl(url)[0].toUpperCase(),
            logoType:"text",
            url:url
        })
        render()
    });
    window.onbeforeunload = ()=>{
        const string = JSON.stringify(hashMap)
        localStorage.setItem('x',string)
    }
    $(document).on('keypress',(e)=>{
        const {key} = e
        for (let i=0; i<hashMap.length;i++){
            if (hashMap[i].logo.toLowerCase() === key){
                window.open(hashMap[i].url)
            }
        }
    })