let players = {};
let queue = [];

function send(receiver, msg) {
    queue.push([receiver, msg]);
}

function sleep () {
    return new Promise((res) => setTimeout(res, 200));
}

async function run() {
    while (queue.length) {
        const [receiver, msg] = queue.shift();
        players[receiver].next(msg);
        await sleep();
    }
}

function* ping() {
    while (true) {
        const n = yield;
        console.log('ping', n);
        send('pong', n + 1);
    }
}

function* pong() {
    while (true) {
        const n = yield;
        console.log('pong', n);
        send('ping', n + 1);
    }
}

players.ping = ping();
players.pong = pong();

send('ping', 'Start ping');
send('pong', 'Start pong');

console.log();
send('ping', 0);
run();
