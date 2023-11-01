import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Sign_img from "./Sign_img";
import {NavLink} from 'react-router-dom'

const Home = () => {
  const [inpval, setInpval] = useState({
    name: "",
    email: "",
    date: "",
    password: "",
  });
  const [data, setdata] = useState([])
  console.log(inpval);

  const getData = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    //console.log(value,name);
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addData = (e) => {
    e.preventDefault();

    const { name, email, date, password } = inpval;
    if (name === "") {
      alert("Name field is required");
    } else if (email === "") {
      alert("Email field is required");
    } else if (!email.includes("@")) {
      alert("plz enter valid email id");
    } else if (date === "") {
      alert("Date field is required");
    } else if (password === "") {
      alert("Pasword field is required");
    } else if (password.length < 5) {
      alert("Pasword length greater five ");
    } else {
      console.log("Data added successfully");
      localStorage.setItem("useryoutube", JSON.stringify([...data,inpval]));
    }
  };

  return (
    <div className="container mt-3">
      <section className="d-flex justify-content-between">
        <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
          <h3 className="text-center col-lg-6 ">Sign Up</h3>
          <Form>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicName">
            <Form.Label >Email address</Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={getData}
                placeholder="Enter Your Name"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                onChange={getData}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              
              <Form.Control type="date" name="date" onChange={getData} />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">
              <Form.Control
                type="password"
                name="password"
                onChange={getData}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicButton">
              <Button
                variant="primary"
                className="col-lg-6"
                onClick={addData}
                style={{ background: "rgb(67, 185, 127)", width: "100%" }}
                type="submit"
              >
                Submit
              </Button>
            </Form.Group>

            <Form.Group className="mb-3 col-lg-6" controlId="formBasicButton">
              <p>
                Already Have an Account <span><NavLink to="/Login">SignIN</NavLink></span>
              </p>
            </Form.Group>
          </Form>
        </div>
        <Sign_img />
      </section>
    </div>
  );
};

export default Home;
