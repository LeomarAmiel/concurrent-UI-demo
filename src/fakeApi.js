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

export function fetchProfileData(userId) {
    let userPromise = fetchUser(userId);
    let postsPromise = fetchPosts(userId);
    return {
        user: wrapPromise(userPromise),
        posts: wrapPromise(postsPromise)
    };
}
