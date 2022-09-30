// ex. 1
// Promise['Method'] -> ~ all that always returns either it's success or error
// [ 'success', 'error' ]

//Promise.allSettled() - returns an array with the outcome of each promise, no matter if it succeded or failed, which is different from Promise.all where it's going to return the array with results only when all promises succeed

Promise.all([
    Promise.resolve("Works!"),
    Promise.resolve("Everything ok"),
    Promise.reject("Error"),
])
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

Promise.allSettled([
    Promise.resolve("Works!"),
    Promise.resolve("Everything ok"),
    Promise.reject("Error"),
]).then((res) => console.log(res));

// ex. 2
// differences between  Promise.race()  VS  Promise.any();
// with words / examples
const waitOneSec = new Promise((resolve, reject) => {
    setTimeout(resolve("Done!"), 1000);
});

const waitHalfSecSucces = new Promise((resolve, reject) => {
    setTimeout(resolve("Works!"), 500);
});

const waitFifthSecError = new Promise((resolve, reject) => {
    setTimeout(reject("Promise rejects!"), 200);
});

//Returns a promise when one of the promises provided, resolves or rejects
Promise.race([waitFifthSecError, waitHalfSecSucces, waitOneSec])
    .then((res) => console.log(res))
    .catch((error) => console.log(error));

//Returns a promise when the first succeeds
Promise.any([waitOneSec, waitFifthSecError, waitHalfSecSucces])
    .then((res) => console.log(res))
    .catch((error) => console.log("All promises rejected"));

// ex. 3
// add error handling for fetch (based on statuses, ok property)

// fetch('https://jsonplaceholder.typicode.com/post')
//   .then(res => {
//          here should go the logic
//   })

fetch("https://jsonplaceholder.typicode.com/post").then((res) => {
    if (!res.ok) {
        if (res.status >= 400 && res.status < 500) {
            console.log("Client error detected");
        } else if (res.status >= 500) console.log("Server error detected");
        return;
    }
    console.log("No error detected");
});

// ex. 4
// write a promisify function,
// like a wrapper for other functions

// you should pass a callback to it, and arguments to that callback

// const promisify = (functionAsCallback, ...argsToFunction) => {

//      your code should go here

// }

// it should return a promise, so you can call .then on this function
// const promisifiedFunction = promisify(someAsyncFunction, [args])
// .then(result => {
//   console.log(result)
// })

const promisify = (functionAsCallback, ...argsToFunction) => {
    return new Promise((resolve, reject) => {
        try {
            resolve(functionAsCallback(...argsToFunction));
        } catch (error) {
            reject(error);
        }
    });
};

const getSomePosts = async (link, number) => {
    const data = await fetch(link);
    const posts = await data.json();
    return posts.slice(0, number);
};
const promisifiedSum = promisify(
    getSomePosts,
    "https://jsonplaceholder.typicode.com/posts",
    10
);
promisifiedSum.then((v) => console.log(v)).catch((error) => console.log(error));
