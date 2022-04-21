function AddAudio() {
    var lenkb = drumconfig.Keyboard.length
    var audiostr = ""
    for (var i = 0; i < lenkb; i++) {
        var filename = drumconfig.Filename[i]

        //编写鼓音频的HTML文档
        var audiopart = "<audio id=\"" + filename + "\">";
        audiopart += "<source src=\"" + "drum/" + filename + "\""
        audiopart += " type=\"audio/wav\"/></audio>"

        audiostr += audiopart
    }
    document.getElementById("Audio").innerHTML = audiostr
}

function InitializeKeyboard() {
    var KBPosition = GUIconfig.Keyboards.KBPosition
    var Scale = GUIconfig.Keyboards.Scale
    var kbstr = ""
    var kbabspos = document.getElementById("Keyboard").getBoundingClientRect()
    var kbapleft = kbabspos.left
    var kbaptop = kbabspos.top

    for (key in KBPosition) {
        var relp = KBPosition[key]
        var x = relp[0] * Scale + 20 + kbapleft;
        var y = relp[1] * Scale + 10 + kbaptop;
        var kbid = "Keyboard-" + key
        var engid = "Eng-" + key
        var chnid = "Chn-" + key
        var charidx = drumconfig.EnglishName.indexOf(key)
        var Chnchar = ""
        var keyclass = "SilentKeyboard"
        var Engclass = "EnglishCharacterNoChinese"
        if (charidx != -1) {
            Chnchar = drumconfig.ChineseName[charidx]
            Engclass = "EnglishCharacter"
        }

        //键盘元素
        kbpart = "<div class=\"" + keyclass + "\" id=\"" + kbid
        kbpart += "\" style=\"position:absolute;left:" + x + "px;top:" + y + "px\" "
        kbpart += "onmousedown=\"ResponseMouseDown()\" onmouseup=\"ResponseMouseUp()\">"

        // 英语字符元素
        kbpart += "<span id=\"" + engid + "\" class = \"" + Engclass + "\">" + key + "</span>"

        // 汉语字符
        kbpart += "<span id=\"" + chnid + "\" class=\"ChineseCharacter\">" + Chnchar + "</span>"
        kbpart += "</div>\n"

        // 放到document中
        kbstr += kbpart
    }
    document.getElementById("Keyboard").innerHTML = kbstr
}

function ActivateColor(alphabet) {
    //输入相应的字母，颜色
    var keyid = "Keyboard-" + alphabet
    var engid = "Eng-" + alphabet
    var chnid = "Chn-" + alphabet
    document.getElementById(chnid).className = "ActivatedChineseCharacter"
    document.getElementById(engid).className = "ActivatedEnglishCharacter"
    document.getElementById(keyid).className = "ActivatedKeyboard"
}


function DeactivateColor(alphabet) {
    // 输入字母表
    var keyid = "Keyboard-" + alphabet
    var engid = "Eng-" + alphabet
    var chnid = "Chn-" + alphabet
    document.getElementById(chnid).className = "ChineseCharacter"
    document.getElementById(engid).className = "EnglishCharacter"
    document.getElementById(keyid).className = "SilentKeyboard"
}

function ActivateMusic(eventindex) {
    // 播放音乐
    var audioname = drumconfig.Filename[eventindex]
    var audio = document.getElementById(audioname)
    var volume = drumconfig.VolumeScale[eventindex]
    audio.volume = volume * 0.4
    if (!audio.ended) {
        audio.currentTime = 0
    } 
    audio.play()
}

function DeactivateMusic(eventindex) {
    // 停止或重放音频
    var audioname = drumconfig.Filename[eventindex]
    var audio = document.getElementById(audioname)
    var is_continuous = drumconfig.Continuity[eventindex]
    if (is_continuous == 1) {
        audio.pause()
        audio.currentTime = 0
    }
}

function ResponseMouseDown(e) {
    var ev = e || window.event
    var objid = ev.target.id || evt.srcElement.id
    var alphabet = objid[objid.length - 1]
    var eventindex = drumconfig.EnglishName.indexOf(alphabet)
    if (eventindex != -1) {
        ActivateMusic(eventindex)
        ActivateColor(alphabet)
    }
}

function ResponseMouseUp(e) {
    var ev = e || window.event
    var objid = ev.target.id || evt.srcElement.id
    var alphabet = objid[objid.length - 1]
    var eventindex = drumconfig.EnglishName.indexOf(alphabet)
    if (eventindex != -1) {
        DeactivateMusic(eventindex)
        DeactivateColor(alphabet)
    }
}

function ResponseKeyDown(e) {
    var ev = e || window.event
    var eventindex = drumconfig.Keyboard.indexOf(ev.keyCode)
    if (eventindex != -1) {
        ActivateMusic(eventindex)
        var alphabet = drumconfig.EnglishName[eventindex]
        ActivateColor(alphabet)
    }
}

function ResponseKeyUp(e) {
    ev = e || window.event
    var eventindex = drumconfig.Keyboard.indexOf(ev.keyCode)
    if (eventindex != -1) {
        DeactivateMusic(eventindex)
        var alphabet = drumconfig.EnglishName[eventindex]
        DeactivateColor(alphabet)
    }
}

InitializeKeyboard()
AddAudio()
document.onkeydown = ResponseKeyDown
document.onkeyup = ResponseKeyUp

// 自动适应键盘位置
window.addEventListener("resize", function(e) {
    InitializeKeyboard()
})