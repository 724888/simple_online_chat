const EVENT_LIST = {
    NUM_PEOPLE: 'NUM_PEOPLE',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SPEAK: 'SPEAK',
    ERROR: 'ERROR',
    TOKEN: 'TOKEN'
};

const VIEW_LIST = [
    'loginView',
    'roomView'
];

const myUserdata = JSON.parse(localStorage.getItem('myUserdata')) || {uid: null, nick: null};

let token = localStorage.getItem('token');

// ----------------------------------- //

function changeView(viewname) {
    VIEW_LIST.forEach(v => {
        console.log(v !== viewname)
        if (v !== viewname) {
            document.getElementById('loginView').style.display = 'none'
        } else {
            document.getElementById(v).style.display = 'block'
        }
    })
}

(async () => {
    if (!token) {
        const res = await axios.get('token');
        token = res.data.token;
    }
    // 本地测试用。如果生产环节部署需修改为生产服务器ip地址
    const ws = new WebSocket(`ws://127.0.0.1:3000/?token=${token}`);

    ws.addEventListener('open', () => {
        ws.send(JSON.stringify({
            EVENT: EVENT_LIST.NUM_PEOPLE
        }))
    });

    ws.addEventListener('message', (event) => {
        try {
            console.log(event);
            const data = JSON.parse(event.data);
            switch (data.EVENT) {
                case EVENT_LIST.NUM_PEOPLE:
                    document.getElementById('numPeople').innerHTML = data.value;
                    break;
                case EVENT_LIST.LOGIN:
                    document.getElementById('userList'). innerHTML = '';
                    console.log(myUserdata)
                    if (myUserdata.nick !== data.value.nick) {
                        document.getElementById('numPeople').innerHTML = data.num;
                        data.userList.forEach(u => {
                            document.getElementById('userList'). innerHTML += `<li class="list-group-item">id：${u.uid} 昵称：${u.nick}</li>`
                        })
                    } else {
                        myUserdata.uid = data.value.uid;
                        changeView('roomView');
                        document.getElementById('numPeople').innerHTML = data.num;
                        document.getElementById('n').innerHTML = data.value.nick;
                        document.getElementById('i').innerHTML = data.value.uid;
                        data.userList.forEach(u => document.getElementById('userList'). innerHTML += `<li class="list-group-item">id：${u.uid} 昵称：${u.nick}</li>`)
                    }
                    break;
                case EVENT_LIST.LOGOUT:
                    document.getElementById('userList'). innerHTML = '';
                    document.getElementById('numPeople').innerHTML = data.num;
                    data.userList.forEach(u => document.getElementById('userList'). innerHTML += `<li class="list-group-item">id：${u.uid} 昵称：${u.nick}</li>`);
                    break;
                case EVENT_LIST.TOKEN:
                    token = data.value;
                    localStorage.setItem('token', token);
                    localStorage.setItem('myUserdata', JSON.stringify({
                        uid: data.uid,
                        nick: data.nick
                    }));
                    break;
                case EVENT_LIST.SPEAK:
                    if (data.user.uid === myUserdata.uid) {
                        document.getElementById('chat').innerHTML += `
                        <div class="col-md-12 me">
                        ${data.word}：我
                        </div>
                        `
                    }  else {
                        document.getElementById('chat').innerHTML += `
                        <div class="col-md-12 other">
                        ${data.user.nick}: ${data.word}
                    </div>
                        `
                    }
                    break;
                case EVENT_LIST.ERROR:
                    alert(data.value);
                    break;
            }
        } catch (e) {
            console.log(e)
        }
    });

    ws.addEventListener('close', () => {
        if (myUserdata.uid !== null && myUserdata.nick !== null) alert('您已断开与聊天室的连接')
    });

    // ------------------------------------- //

    // window.onbeforeunload = function () {
    //     ws.send(JSON.stringify({
    //         EVENT: EVENT_LIST.LOGOUT,
    //         user: myUserdata
    //     }));
    //     ws.close();
    // };

    document.getElementById('login').addEventListener('click', () => {
        if (ws.readyState === 1) {
            myUserdata.nick = document.getElementById('nick').value;
            ws.send(JSON.stringify({
                EVENT: EVENT_LIST.LOGIN,
                nick: document.getElementById('nick').value
            }))
        } else {
            alert('连接尚未建立');
        }
    });

    document.getElementById('speak').addEventListener('click', () => {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({
                EVENT: EVENT_LIST.SPEAK,
                user: myUserdata,
                word: document.getElementById('speakword').value
            }));
            document.getElementById('speakword').value = ''
        } else {
            alert('连接尚未建立');
            location.href = ''
        }
    })
})();

