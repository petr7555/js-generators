function* listener() {
    console.log("listening...");
    while (true) {
        const msg = yield;
        console.log('heard:', msg);
    }
}

const l = listener();
l.next('Are you there?');
// value is discarded, same as `l.next()`

// listening...
l.next('How about now?');
// heard: How about now?
l.next('blah blah');
// heard: blah blah
