window.limit = function (fn, wait, isImmediated, isDebounced) {
    let timer: number | null
    let context: any
    let args: Array<any>
    //独立出执行函数，有利于复用和代码整洁性
    function exec() {
        let execFn = new Function();
        if (isImmediated) {
            fn.apply(context, args)
            execFn = function () {
                timer = null
            }
        } else {
            execFn = function () {
                fn.apply(context, args)
                timer = null
            }
        }
        timer = setTimeout(execFn, wait)
    }
    return function () {
        //保存函数执行上下文
        //context = this
        //保存函数执行时参数
        args = [].slice.call(arguments)
        if (!timer) {
            exec()
        } else {  //定时器已存在           
            if (isDebounced) {  //防抖
                clearTimeout(timer)
                exec()
            }
        }
    }
}
//$ selector
window.$ = function (arg) { return document.querySelector(arg) };

//url query params
window.urlQuery = function (key) {
    var params = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&#]*)/gi,
        (m, key, value): any => {
            params[key] = value;
        }
    );
    return params[key];
}





