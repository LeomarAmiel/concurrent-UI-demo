import React, { useState, Suspense } from "react";
import "./App.css";
import { fetchProfileData } from "./fakeApi";

const initialResource = fetchProfileData();

function App() {
    const [resource, setResouce] = React.useState(initialResource);
    return (
        <div>
            <button
                onClick={() => {
                    setResouce(fetchProfileData());
                }}
            >
                Next
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
