// Write a detailed explanation with || steps || words how
// withVar / withLet function works and why did we get the expected result

const app = () => {
    const withVar = () => {
        for (var index = 0; index < 5; index += 1) {
            setTimeout(() => console.log(`var idx = ${index}`), 0);
            console.log(`var index withOutSetTimeOut = ${index}`);
        }
    };

    const withLet = () => {
        for (let index = 0; index < 5; index += 1) {
            setTimeout(() => console.log(`let index = ${index}`), 0);
            console.log(`let index withOutSetTimeOut = ${index}`);
        }
    };

    withVar();
    withLet();
};
setTimeout(app, 0);
/*
1. setTimeout function is called and sent to WEB APIs, after that it goes in the Callback Queue, but because the stack is empty the function is run without waiting
2. The app function is starting to run, and it calls first the withVar function, which consists of a loop where each cycle we call setTimeout, that goes to the WEB APIs and after that will wait in the Callback Queue. Also in for we have a console-log that are synchronous and will just run on the stack, so this 5 messages are going to be printed first showing the index from 0 to 4. In the Callback Queue we still have the 5 callbacks from setTimeout.
3. Next, the function withLet is going to be called, which has a similar structure as the previous one, the 5 setTimeouts will go as usual to WEB APIs,then will wait in queue, as for the console-logs, they will run now showing the index from 0 to 4
4. Now that the stack is free the callbacks in te queue will run one by one, starting with those from the withVar functions, here all 5 of them will show the index as 5, because the variable index was declared using the var keyword, which means all the callbacks have a closure to the same shared variable.
5. After the same 5 messages, the callbacks from withLet will run, this time because we used let to define the index, every function will have access to it's own index variable that will have the value of the index when its setTimeout was called

So in the end we will have this printed in console:
    -- console-logs from withVar:
    var index withOutSetTimeOut = 0
    var index withOutSetTimeOut = 1
    var index withOutSetTimeOut = 2
    var index withOutSetTimeOut = 3
    var index withOutSetTimeOut = 4
    -- console-logs from withLet:
    let index withOutSetTimeOut = 0
    let index withOutSetTimeOut = 1
    let index withOutSetTimeOut = 2
    let index withOutSetTimeOut = 3
    let index withOutSetTimeOut = 4
    -- console-logs from callbacks in setTimeout from withVar (with the index already 5)
    var idx = 5  
    var idx = 5  
    var idx = 5  
    var idx = 5  
    var idx = 5  
    -- console-logs from callbacks in setTimeout from withLet (each with its own index)
    let index = 0
    let index = 1
    let index = 2
    let index = 3
    let index = 4
*/
