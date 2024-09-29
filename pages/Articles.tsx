import {Container} from "react-bootstrap";
import axios from "axios"
import {useEffect , useState} from "react";
import styled from "styled-components";
// import ReactDOM from 'react-dom';
// import React from "react";
import {Link} from "react-router-dom";



interface Article{
    id: string;
    title:string;
    imageUrl:string;
    content: string;
    
    }
const CardsContainer = styled.div`
padding: 4rem 0;
display: flex
`
const Card = styled.div`
height: 50rem;
width: 50%;
box-shadow:0.1rem 0.1rem 0.1rem rgba(0,0,0,0.2);
padding: 5rem;
border-radius:3rem;
margin-right:5rem
`
const Header = styled.h2`
margin-top: 1rem;
font-size: 1.5rem
`;
const Image = styled.img`
width: 100%;
height: 30rem;
border-size: 2.5rem;
`;


const NoArticlesContainer = styled.div`

display: flex;
align-items: center;
justify-content: center;
padding: 20rem 0;
flex-direction: column;

& a {
font-size: 2rem 0;
text-decoration:none

}
`
const ErrorHeader = styled.h2`

font-size: 3rem
`

const Content = styled.p``



const Articles =  ()=>{
    const [articles, setArticles]  =useState<Article[]>([]);

    
    useEffect(()=>{
        fetchArticles();
},[]);

const fetchArticles = async () =>{

    
    const {data:response} = await axios.get("http://localhost:8080/articles")
    setArticles(response);
}

return (<Container> 
    {articles.length ? (
     <CardsContainer>
        
{articles.map((article)=>(
<Card key={article.id}>
    <Image src={article.imageUrl} />
<Header>{article.title}</Header>
<Content>{article.content}</Content>
</Card>
    ))}
    
     </CardsContainer>   
    ) : ( 
        <NoArticlesContainer>
            <ErrorHeader>You dont have access yet

            </ErrorHeader>

            <Link to="/article-plans"> Buy a plan</Link>
        </NoArticlesContainer>
    )}
     </Container>
);

}; 
export default Articles

