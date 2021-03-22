import React, { useState } from 'react';
import { Row } from 'react-bootstrap';
import ticketsData from '../../fakeData/fakeData';
import Cards from '../Cards/Cards';

const Tickets = () => {

    const [tickets,setTickets] =useState(ticketsData)

    return (
    <div className=" p-5">
        <Row>
        {
            tickets.map(tickets=> <Cards tickets ={tickets}></Cards> )
        }
        </Row>
    </div>
    );
};

export default Tickets;