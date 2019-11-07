function fetchUser() {
    return fetch("https://randomuser.me/api")
        .then(res => res.json())
        .then(value => value.results[0]);
}

function fetchPosts() {
    return fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=3").then(
        res => {
            const promise = new Promise(function(resolve, reject) {
                setTimeout(() => {
                    resolve(res.json());
                }, 500);
            });
            return promise;
        }
    );
}

function fetcSwansonQuotes() {
    return fetch("http://ron-swanson-quotes.herokuapp.com/v2/quotes/3").then(
        res => {
            const promise = new Promise(function(resolve, reject) {
                setTimeout(() => {
                    resolve(res.json());
                }, 3500);
            });
            return promise;
        }
    );
}


function wrapPromise(promise) {
    let status = "pending";
    let result;
    let suspender = promise.then(
        r => {
            status = "success";
            result = r;
        },
        e => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

export function fetchProfileData() {
    let userPromise = fetchUser();
    let postsPromise = fetchPosts();
    let swansonPromise = fetcSwansonQuotes();
    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise),
        swansonQuotes: wrapPromise(swansonPromise),
    };
}
