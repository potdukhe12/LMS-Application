import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Sign_img from "./Sign_img";
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",

    password: "",
  });
  const [data, setdata] = useState([]);
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

    const getuserArr = localStorage.getItem("useryoutube");
    console.log(getuserArr);

    const { email, password } = inpval;
    if (email === "") 
    {
      alert("Email field is required");
    } else if (!email.includes("@")) {
      alert("plz enter valid email id");
    } else if (password === "") {
      alert("Pasword field is required");
    } else if (password.length < 5) {
      alert("Pasword length greater five ");
    } else {
        if(getuserArr && getuserArr.length){
            const userdata=() => JSON.parse(getuserArr);
            const userlogin = userdata((el,k)=>{
                return el.email === email && el.password === password
            });

            if(userlogin.length === 0){
                alert("Invalid Details");
            }
            else{
                console.log("User Login successfully");
                localStorage.setItem("user_login", JSON.stringify(userlogin))
                history("/details")
            }
            
        }
    }
  };
  return (
    <div className="container mt-3">
      <section className="d-flex justify-content-between">
        <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
          <h3 className="text-center col-lg-6 ">Sign IN</h3>
          <Form>
            <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">
              <Form.Control
                type="email"
                name="email"
                onChange={getData}
                placeholder="Enter email"
              />
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
                Don't Have an Account?
                {/* <span><NavLink to="/Home">SignUp</NavLink></span> */}
              </p>
            </Form.Group>
          </Form>
        </div>
        <Sign_img />
      </section>
    </div>
  );
};

export default Login;


// import React, { useState } from 'react'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
// import Sign_img from './Sign_img'
// import { useNavigate } from 'react-router-dom'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Login = () => {

//     const history = useNavigate();

//     const [inpval, setInpval] = useState({
//         email: "",
//         password: ""
//     })

//     const [data, setData] = useState([]);
//     console.log(inpval);

//     const getdata = (e) => {
//         // console.log(e.target.value);


//         const { value, name } = e.target;
//         // console.log(value,name);


//         setInpval(() => {
//             return {
//                 ...inpval,
//                 [name]: value
//             }
//         })

//     }

//     const addData = (e) => {
//         e.preventDefault();

//         const getuserArr = localStorage.getItem("useryoutube");
//         console.log(getuserArr);

//         const { email, password } = inpval;
//         if (email === "") {
//             toast.error('email field is requred', {
//                 position: "top-center",
//             });
//         } else if (!email.includes("@")) {
//             toast.error('plz enter valid email addres', {
//                 position: "top-center",
//             });
//         } else if (password === "") {
//             toast.error('password field is requred', {
//                 position: "top-center",
//             });
//         } else if (password.length < 5) {
//             toast.error('password length greater five', {
//                 position: "top-center",
//             });
//         } else {

//             if (getuserArr && getuserArr.length) {
//                 const userdata = JSON.parse(getuserArr);
//                 const userlogin = userdata.filter((el, k) => {
//                     return el.email === email && el.password === password
//                 });

//                 if (userlogin.length === 0) {
//                     alert("invalid details")
//                 } else {
//                     console.log("user login succesfulyy");

//                     localStorage.setItem("user_login", JSON.stringify(userlogin))

//                     history("/details")
//                 }
//             }
//         }

//     }

//     return (
//         <>
//             <div className="container mt-3">
//                 <section className='d-flex justify-content-between'>
//                     <div className="left_data mt-3 p-3" style={{ width: "100%" }}>
//                         <h3 className='text-center col-lg-6'>Sign IN</h3>
//                         <Form >

//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicEmail">

//                                 <Form.Control type="email" name='email' onChange={getdata} placeholder="Enter email" />
//                             </Form.Group>

//                             <Form.Group className="mb-3 col-lg-6" controlId="formBasicPassword">

//                                 <Form.Control type="password" name='password' onChange={getdata} placeholder="Password" />
//                             </Form.Group>
//                             <Button variant="primary" className='col-lg-6' onClick={addData} style={{ background: "rgb(67, 185, 127)" }} type="submit">
//                                 Submit
//                             </Button>
//                         </Form>
//                         <p className='mt-3'>Already Have an Account <span>SignIn</span> </p>
//                     </div>
//                     <Sign_img />
//                 </section>
//                 <ToastContainer />
//             </div>
//         </>
//     )
// }

// export default Login