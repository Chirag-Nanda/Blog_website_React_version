import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Body from "./Body";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./CreatePost";
import PostBody from "./PostBody";
import Post from "./Post";
import EditPost from "./EditPost";
function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path='/' element={
                    <main>
                        <Header />
                        <Body />
                        <Footer />
                    </main>

                } />

                <Route path={'/login'} element={
                    <main>
                        <Header />
                        <Login />
                        <Footer />
                    </main>
                } />

                <Route path={'/register'} element={
                    <main>
                        <Header />
                        <Register />
                        <Footer />
                    </main>
                } />

                <Route path={'/create'} element={
                    <main>
                        <Header />
                        <CreatePost />
                        <Footer />
                    </main>
                } />



                <Route path={'/posts/:id'} element={
                    <main>
                        <Header />
                        <PostBody />
                        <Footer />
                    </main>
                } />
                
                <Route path={'/edit/:id'} element={
                    <main>
                        <Header />
                        <EditPost/>
                        <Footer />
                    </main>
                } />


            </Routes>



        </UserContextProvider>);

}

export default App;