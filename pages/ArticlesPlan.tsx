import {Container} from "react-bootstrap";
import{useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Card, Button} from "react-bootstrap"

const CardsContainer = styled.div`

display: flex;
height: 75vh;
align-items: center;
justify-content: center;
`;

const CardHeader = styled.div`
height: 30rem;
background-color: blue;
display: flex;
align-items : center;
justify-content: center
`;

const PriceCircle = styled.div`
border:0.7rem solid white;
width: 12.5rem;
height: 12.3rem;
border-radius:50%;
display: flex;
align-items : center;
justify-content: center;
box-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19, 0.342)
`;

const PriceText = styled.p`
font-size: 3rem;
color : white;
text-shadow: 0.1rem 0.1rem 1rem rgba(19,20,19, 0.342)
`



const ArticlesPlan = () =>{

    const [prices, setPrices]  = useState<any[]>([]);
   
    useEffect(()=>{
        fetchPrices();
},[]);

const fetchPrices = async () =>{
const{data:response}  = await axios.get("http://localhost:8080/subs/prices");
setPrices(response.data);
}

const createsession = async (priceId:string) =>{
    const {data: response} = await axios.post("http://localhost:8080/subs/session",
    {
    priceId,
    }
    
    );
    
    window.location.href = response.url;
    };

const backgroundColors : any = {
    Basic : "rgb(104, 219, 104)",
    Standard : "red",
    Premium : "yellow"
}


return(<Container>
    <CardsContainer>
        
{prices.map((price: any)=>{
    return(
<Card style={{width: "14rem", height: "13rem", marginRight: "2rem"}}>
<CardHeader style={{backgroundColor: backgroundColors[price.nickname]}}
    >

    <PriceCircle>
    <PriceText> 
        ${price.unit_amount/100}
        </PriceText>
  </PriceCircle>
</CardHeader>

<Card.Body> 
<Card.Title style={{fontSize: "2rem"}}>{price.nickname}
<Button variant="primary" className="mt-2" onClick={() =>createsession(price.id)}>
    Buy now</Button>
</Card.Title>

</Card.Body>

</Card>


    );  
})}
        
    </CardsContainer>
</Container>
);
};

export default ArticlesPlan;