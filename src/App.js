import React, { useState, useTransition, Suspense } from "react";
import "./App.css";
import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

function App() {
    const [resource, setResouce] = useState(initialResource);
    const [startTransition, isPending] = useTransition({ timeoutMs: 1000 });
    return (
        <div>
            <button
                disabled={isPending}
                onClick={() =>
                    startTransition(() => {
                        setResouce(fetchProfileData());
                    })
                }
            >
                {isPending ? "Loading" : "Next"}
            </button>
            <div className="App">test</div>
            <ProfilePage resource={resource} />
        </div>
    );
}

function ProfilePage({ resource }) {
    return (
        <Suspense fallback={<h1>Loading bebi...</h1>}>
            <ProfileDetails resource={resource} />
            <Suspense fallback={<h1>Loading posts...</h1>}>
                <ProfilePosts resource={resource} />
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
            {posts.map((post, index) => (
                <p key={post.character + index}>{post.quote}</p>
            ))}
        </div>
    );
}

export default App;
