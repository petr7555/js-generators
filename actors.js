let players = {};
let queue = [];

function send(receiver, msg) {
    console.log(msg);
    queue.push([receiver, msg]);
}

function run() {
    while (queue.length) {
        const [receiver, msg] = queue.shift();
        players[receiver].next(msg);
    }
}

function* knocker() {
    const receiver = 'asker';

    send(receiver, 'knock knock');

    let question = yield;
    if (question !== 'who\'s there?') return;
    send(receiver, 'gene');

    question = yield;
    if (question !== 'gene who?') return;
    send(receiver, 'generator!');
}

function* asker() {
    const receiver = 'knocker';

    let knock = yield;
    if (knock !== 'knock knock') return;
    send(receiver, 'who\'s there?');

    let answer = yield;
    send(receiver, `${answer} who?`);
}

players.knocker = knocker();
players.asker = asker();

send('knocker', 'Start knocker');
send('asker', 'Start asker');
console.log();
run();
