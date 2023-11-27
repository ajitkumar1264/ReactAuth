import React, { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Home.css";

function Home() {
  const nav = useNavigate();
  const [name, setname] = useState("no Name");

  const CurrentUser = async () => {
    await fetch("http://localhost:4000/auth/getUser", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": " application/json; charset=utf-8",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.IsToken) {
          setname(res.token.email);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    CurrentUser();
  }, []);

  return (
    <>
      <div className="con1">
        <div className="con2">
          <h2>Home</h2>
          <h1>{name}</h1>
          <div className="con3">
            <button
              onClick={() => {
                nav("/Register");
              }}
            >
              Register
            </button>
            <br />
            <br />
            <br />
            <button
              onClick={() => {
                if(cookie.get("JsonwebToken"))
                {
                  alert("currently you are loggedIn")
                }else{
                  nav("/login");
                }
               
              }}
            >
              Login
            </button>
            <br />
            <br />
            <br />
            <button
              onClick={() => {
                Cookies.remove("JsonwebToken");
                alert('logout successfully!');
                nav("/")
              }}
            >
              Logout
            </button>
            <br />
            <br />
            <br />
            <button
              onClick={() => {
                CurrentUser();
              }}
            >
              getUser
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
