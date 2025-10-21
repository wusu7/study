const promiseTest = function () {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(100);
        }, 1000);
        resolve(200);
        }, 2000);
        resolve(300);

promiseTest().then((res) => {
    console.log(res);
});
}
