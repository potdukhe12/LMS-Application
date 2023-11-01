import React,{useEffect,useState} from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

const Details = () => {

    const [logindata, setLogindata] = useState([]);
    console.log(logindata);
    const history = useNavigate();

    const [show, setShow] = useState(false);
    
    var todayDate = new Date().toISOString().slice(0,10);
    //console.log(todayDate);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const Birthday =()=>{
       // console.log("OK");
        const getuser = localStorage.getItem("user_login");
        if(getuser && getuser.length){
            const user = JSON.parse(getuser);
            //console.log(user);
            setLogindata(user);

            const userbirth = logindata.map((el,k)=>{
                return el.date === todayDate
            });
            if(userbirth ){
                setTimeout(()=>{
                    console.log("OK");
                    handleShow();
                },3000)
            }

        }
    }
    const userlogout = () =>{
        localStorage.removeItem("user_login")
        history("/");
    }

    useEffect(() => {
        Birthday();
    }, [])
    return (
        <div>
            <>
           { 
           logindata.length===0 ?"error" :
           <>

            <h1>Details Page</h1>
            <h1>{logindata[0].name}</h1>
            <Button onClick={userlogout}>LogOut</Button>

            <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{logindata[0].name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Wish you many many happy return of the day</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
           </>
           }
            </>
        </div>
    )
}

export default Details
