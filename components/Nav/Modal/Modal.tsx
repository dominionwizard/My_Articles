import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import axios from "axios"
import styled from "styled-components"
import {useState, useContext} from "react";
import {useNavigate} from "react-router-dom"
import { UserContext } from "../../../context";

interface ModalProps{
    text:string
    variant:"primary" | "secondary" | "danger"
    isSignupFlow:boolean
}


const ErrorMessage = styled.p`
color:red
`
const ModalComponent = ({text, variant, isSignupFlow}:ModalProps)=>{
const [show, setShow] = useState(false)
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [errorMsg, setErrorMsg] = useState("")

const handleClose = ()=>setShow(false)
const handleShow = ()=>setShow(true)
const navigate = useNavigate()
const [state, setState] = useContext(UserContext)

const handleClick = async () =>{
let response;

if(isSignupFlow){

    const {data:signUpData} = await axios.post("http://localhost:8080/auth/signup", {
    
email,
password
  

});

// console.log(response)
response = signUpData
}else{
     const {data:logInData} = await axios.post("http://localhost:8080/auth/login", {
        email,
        password
        
     });
 response= logInData
  }
//   display an error on the screen if any

if(response.errors.length){
return setErrorMsg (response.errors[0].msg)
}

setState({
data:{
    id: response.data.user.id,
    email: response.data.email,
    stripeCustomerId:response.data.user.stripeCustomerId
},
loading: false,
error: null

});
localStorage.setItem("token", response.data.token);
axios.defaults.headers.common["authorization"] = `Beare ${response.data.token}`
navigate ("/articles");
};

return(
<>
<Button 
onClick={handleShow} 
variant= {variant} size="lg" style={{marginRight:"1rem", padding:"0.5rem, 5rem"}}>
    {text}
    </Button>

<Modal show={show} onHide={handleClose}>
<Modal.Header>
<Modal.Title>{text}</Modal.Title>

</Modal.Header>
<Modal.Body>

{errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}

   <InputGroup className="mb-3">
   <InputGroup.Text>Email</InputGroup.Text>
       <FormControl
       type="email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
   </InputGroup> 

   <InputGroup className="mb-3">
   <InputGroup.Text>Password</InputGroup.Text>
       <FormControl
       type="password"  value={password} onChange = {(e) => setPassword(e.target.value)}/>
   </InputGroup>
</Modal.Body>
<Modal.Footer>

    <Button variant="secondary" onClick={handleClose}>Close</Button>
    <Button variant="primsry" onClick={handleClick}>{text}</Button>
</Modal.Footer>

</Modal>
</>

)

}

export default ModalComponent