import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cards = (props) => {


    const { name, price } = props.tickets;


    return (
        <Col >
            <Card className=' bg-info text-white' style={{ width: '250px' }}>

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                       <b> ৳ : </b> {price}
                    </Card.Text>
                    <br></br>
                    <Link to={'/book'}>
                        <Button variant="success" >Book now</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>

    );
};

export default Cards;