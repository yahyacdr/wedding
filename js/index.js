let slider_cntnr = document.querySelector('main .slider-cntnr')
let imgs = slider_cntnr.querySelector('.imgs')
let dts = slider_cntnr.querySelectorAll('.dt')
dts = Array.from(dts)
let indicators = slider_cntnr.querySelectorAll('svg')
indicators = Array.from(indicators)
let radios = document.querySelectorAll('.attend .radio-div')
radios = Array.from(radios)
let name_input = document.getElementById('guest')
let cmnt_input = document.getElementById('cmnt')
let form_btn = document.querySelector('.form .btn')
let cmnts = document.querySelector('.cmnts-cntnr > .cmnts')
let dts_cntnr = document.querySelector('.cmnts-cntnr .dts-cntnr .dts')
let dots = Array.from(dts_cntnr.children)


let pause_cmnt = false
function sld_img() {
    let sld_amnt = -window.innerWidth + 30
    if (window.matchMedia("(min-width: 480px)").matches) {
        sld_amnt = -420
    }
    let i = a = 0;
    arrow_clicked = false
    dts[0].style.setProperty('animation-name', 'clr_sld')

    setInterval(function () {
        if (pause_cmnt === false) {
            imgs.style.setProperty('transition', '1s')
            imgs.style.setProperty('transform', `translateX(${sld_amnt * i}px)`)
            dts[a].style.setProperty('animation-name', 'clr_sld')

            for (let j = 0; j < dts.length; j++) {
                if (a !== j) {
                    dts[j].style.setProperty('animation-name', '')
                }
            }
            dts.forEach((dt, k) => {
                dt.addEventListener('click', function () {
                    i = a = k
                    dt.style.setProperty('animation-name', 'clr_sld')
                    imgs.style.setProperty('transition', '1s')
                    imgs.style.setProperty('transform', `translateX(${sld_amnt * i}px)`)
                    for (let j = 0; j < dts.length; j++) {
                        if (k !== j) {
                            dts[j].style.setProperty('animation-name', '')
                        }
                    }
                })
            })
            indicators.forEach(function (ind, f) {

            })
            indicators[0].onclick = function () {
                arrow_clicked = true
                if (i > 0 && a > 0) {
                    i--
                    a--
                }
                console.log('arrow-left ' + i, a)
                imgs.style.setProperty('transition', '1s')
                imgs.style.setProperty('transform', `translateX(${sld_amnt * i}px)`)
                dts[a].style.setProperty('animation-name', 'clr_sld')
                for (let j = 0; j < dts.length; j++) {
                    if (a !== j) {
                        dts[j].style.setProperty('animation-name', '')
                    }
                }
            }
            indicators[1].onclick = function () {
                arrow_clicked = true
                i++
                a++
                console.log('arrow-right ' + i)
                imgs.style.setProperty('transition', '1s')
                imgs.style.setProperty('transform', `translateX(${sld_amnt * i}px)`)
                dts[a].style.setProperty('animation-name', 'clr_sld')
                for (let j = 0; j < dts.length; j++) {
                    if (a !== j) {
                        dts[j].style.setProperty('animation-name', '')
                    }
                }
            }

            if (arrow_clicked === false) {
                i++;
                a++;
            }
            arrow_clicked = false
            if (i === dts.length + 2) {
                console.log('ht ' + i)
                i = a = 0
                re_order()
                imgs.style.setProperty("transition", '0s')
                imgs.style.setProperty('transform', `translateX(${sld_amnt * 0}px)`)
            }
            if (a === dts.length || i === dts.length + 1) {
                a = 0
            }
        }
    }, 3000)
}
sld_img()
slider_cntnr.onmouseenter = function (e) {
    dts.forEach((dt) => dt.style.setProperty('animation-play-state', 'paused'))
    pause_cmnt = true
}
slider_cntnr.onmouseleave = function () {
    dts.forEach((dt) => dt.style.setProperty('animation-play-state', 'running'))
    pause_cmnt = false
}

function re_order() {
    let img = imgs.querySelectorAll('.view')
    img.forEach((cmnt) => {
        imgs.appendChild(cmnt)
        cmnt.classList.remove('view')
        for (let i = 0; i < imgs.children.length - (imgs.children.length / 2); i++) {
            imgs.children[i].classList.add('view')
        }
    })
}

radios.forEach((rad, i) => {
    rad.onclick = function () {

        if (rad.classList.contains('yes-div')) {
            radios[i + 1].classList.remove('active')
            radios[i].classList.add('active')
        }
        else if (rad.classList.contains('no-div')) {
            radios[i - 1].classList.remove('active')
            radios[i].classList.add('active')
        }
    }
})

let attend = false

let cmnt_arr = dts_arr = []
let cmnts_html, dts_cmnt, name, cmnt
let duplicate = clicked = false
form_btn.addEventListener('click', function () {
    if (name_input.value === '') {
        name_input.classList.add('active')
    } else {
        name_input.classList.remove('active')
    }
    if (cmnt_input.value === '') {
        cmnt_input.classList.add('active')
    } else {
        cmnt_input.classList.remove('active')
    }
    if (radios[0].classList.contains('active')) {
        attend = true
    } else if (radios[1].classList.contains('active')) {
        attend = false
    }
    if (name_input.value !== '' && cmnt_input.value !== ''
        && cmnts.children.length < 5) {
        if (name_input.value === name && cmnt_input.value === cmnt) {
            duplicate = true
        } else {
            duplicate = false
        }
        name = name_input.value
        cmnt = cmnt_input.value
        if (attend) {
            cmnts_html = `<div class='cmnt-form cmnt-form${cmnts.children.length + 1}'>
            
            <h1 class="name font-cormorant-700">⭐ ${name_input.value} ⭐</h1>
            <div class="☁ font-cormorant-700">
                тілегі:
            </div>
            <div class="cmnt">
                <p class="cmnt-p font-nunito">${cmnt_input.value}</p>
            </div>
    
            </div>`
        } else {
            cmnts_html = `<div class='cmnt-form cmnt-form${cmnts.children.length + 1}'>
            
            <h1 class="name font-cormorant-700">${name_input.value}</h1>
            <div class="☁ font-cormorant-700">
                тілегі:
            </div>
            <div class="cmnt">
                <p class="cmnt-p font-nunito">${cmnt_input.value}</p>
            </div>
    
            </div>`
        }
        if (duplicate === false) {
            cmnt_arr.push(cmnts_html)
            cmnts.innerHTML += `${cmnt_arr[cmnt_arr.length - 1]}`
        }

    }
})

function sld_cmnt() {
    let sld_amnt = -window.innerWidth
    if (window.matchMedia("(min-width: 480px)").matches) {
        sld_amnt = -450
    }
    let o = w = 0;
    dots[0].style.setProperty('animation-name', 'clr_sld')

    setInterval(function () {
        if (pause_cmnt === false) {
            cmnts.style.setProperty('transition', '.8s')
            cmnts.style.setProperty('transform', `translateX(${sld_amnt * o}px)`)
            dots[w].style.setProperty('animation-name', 'clr_sld')

            for (let j = 0; j < dots.length; j++) {
                if (w !== j) {
                    dots[j].style.setProperty('animation-name', '')
                }
            }
            dots.forEach((dt, k) => {
                dt.addEventListener('click', function () {
                    o = w = k
                    dt.style.setProperty('animation-name', 'clr_sld')
                    cmnts.style.setProperty('transition', '1s')
                    cmnts.style.setProperty('transform', `translateX(${sld_amnt * o}px)`)
                    for (let j = 0; j < dots.length; j++) {
                        if (k !== j) {
                            dots[j].style.setProperty('animation-name', '')
                        }
                    }
                })
            })

            o++;
            w++;

            if (o === cmnts.children.length) {
                o = w = 0
                re_order_cmnt()
                cmnts.style.setProperty("transition", '0s')
                cmnts.style.setProperty('transform', `translateX(${sld_amnt * 0}px)`)
            }
            if (w === cmnts.children.length - 1 || o === cmnts.children.length + 1) {
                w = 0
            }
        }
    }, 3000)
}
sld_cmnt()

function re_order_cmnt() {
    let cmnt = cmnts.querySelectorAll('.view')
    console.log(cmnt)
    cmnt.forEach((cmnt) => {
        cmnts.appendChild(cmnt)
        cmnt.classList.remove('view')
        for (let i = 0; i < cmnts.children.length - (cmnts.children.length / 2); i++) {
            cmnts.children[i].classList.add('view')
        }
    })
}