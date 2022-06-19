function* bankAccount() {
    let balance = 0;
    while (balance >= 0) {
        balance += yield balance;
    }
    return "bankrupt!";
}

let account = bankAccount();
console.log(account.next());

console.log(account.next(50));
console.log(account.next(-10));
console.log(account.next(-60));
