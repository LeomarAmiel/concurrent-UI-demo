import React, { useState, useTransition, Suspense } from "react";
import "./App.css";
import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

function App() {
    const [resource, setResouce] = useState(initialResource);
    const [startTransition, isPending] = useTransition({ timeoutMs: 1000 });
    return (
        <div className="App">
            <button
                disabled={isPending}
                onClick={() =>
                    startTransition(() => {
                        setResouce(fetchProfileData());
                    })
                }
            >
                Next
            </button>
            {isPending ? spinner : null}
            <ProfilePage resource={resource} />
        </div>
    );
}

function ProfilePage({ resource }) {
    return (
        <Suspense fallback={<h1>Loading bebi...</h1>}>
            <ProfileDetails resource={resource} />
            <Suspense fallback={<h2>Loading posts...</h2>}>
                <ProfilePosts resource={resource} />
            </Suspense>
            <Suspense fallback={<h2>Loading quotes...</h2>}>
                <SwansonQuotes resource={resource} />
            </Suspense>
        </Suspense>
    );
}

function ProfileDetails({ resource }) {
    const user = resource.user.read();
    return (
        <h1>
            {user.name.first} {user.name.last}
        </h1>
    );
}

function ProfilePosts({ resource }) {
    const posts = resource.posts.read() || [];
    return (
        <div>
            <h2>Posts</h2>

            <div>
                {posts.map((post, index) => (
                    <p key={post.character + index}>{post.quote}</p>
                ))}
            </div>
        </div>
    );
}

function SwansonQuotes({ resource }) {
    const posts = resource.swansonQuotes.read() || [];
    return (
        <div>
            <h2>Quotes</h2>
            <div>
                {posts.map((post, index) => (
                    <p key={"swanson" + index}>{post}</p>
                ))}
            </div>
        </div>
    );
}

const spinner = (
    <span className="DelayedSpinner">
        <span>Loading</span>
    </span>
);

export default App;
