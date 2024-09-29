import styled from "styled-components";
import{Container} from "react-bootstrap"
import ModalComponent from "../Modal/Modal";

const Herocomponent = styled.header`
padding:5rem 0;
height: 60vh;

background-image: url("https://media.istockphoto.com/id/871203832/photo/doing-his-research-to-get-top-marks.jpg?b=1&s=170667a&w=0&k=20&c=eiOC9k88JQ3-rdDKt37wFj6tULIP5S-9ojKijxbJA74=");
background-size:cover;
background-position:center
`
const HeaderContainer = styled.div `
background-color: rgb(5, 148, 112);
padding: 2rem;
color: white;
width:30.5rem;
`;

const Heading = styled.h1`
font-size: 5rem;
`
const SubHeading = styled.h3`
margin: 4rem 0;
font-weight : 300;
`




const Hero = ()=>{
return(
<Herocomponent>
<Container>
<HeaderContainer>
<Heading>Feed your mind with the best</Heading>
<SubHeading>Grow, learn and be successful by reading some of the top articles written by top individuals
</SubHeading>
<ModalComponent 
text="Signup" variant="primary" isSignupFlow={true} />
<ModalComponent 
text="login" variant="danger" isSignupFlow={false}/>
</HeaderContainer>

</Container>
</Herocomponent>
);

}

export default Hero;