import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Cards = (props) => {


    const { name, price } = props.tickets;


    return (
        <Col >
            <Card className='bg-warning' style={{ width: '18rem' }}>

                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                        tk: {price}
                    </Card.Text>
                    <Link to={'/book'}>
                        <Button variant="primary" >Book now</Button>
                    </Link>
                </Card.Body>
            </Card>
        </Col>

    );
};

export default Cards;