import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import ticketsImg from '../Result/tickets 3.png'
import './Search.css'
const Search = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const handleBlur = (event) => {
        if (event.target.name === 'from') {
            setFrom(event.target.value)

        }
        if (event.target.name === 'to') {
            setTo(event.target.value)

        }
    }
    const onSearch = () => {
        setForm(
            <div className="p-2" id='fullContainer'>
                <div className="row bg-light p-2 m-2">
                    <div className="col-md-4">
                        <img src={ticketsImg} alt="" />
                    </div>
                    <div className="col-md-4">
                        Ticket 1
                    </div>
                    <div className="col-md-4">
                        $67
                    </div>
                </div>
                <div className="row bg-light p-2 m-2">
                    <div className="col-md-4">
                        <img src={ticketsImg} alt="" />
                    </div>
                    <div className="col-md-4">
                        Ticket 2
                    </div>
                    <div className="col-md-4">
                        $85
                    </div>
                </div>
                <div className="row bg-light p-2 m-2">
                    <div className="col-md-4">
                        <img src={ticketsImg} alt="" />
                    </div>
                    <div className="col-md-4">
                        Ticket 3
                    </div>
                    <div className="col-md-4">
                        $100
                    </div>
                </div>
            </div>
        )
    }
    const [form, setForm] = useState(
        <Form>
            <h6>Pick From</h6>
            <Form.Control onBlur={handleBlur} type="text" name='from' placeholder=" input here..." required /> <br />
            <h6>Pick To</h6>
            <Form.Control onBlur={handleBlur} type="text" name='to' placeholder=" input here..." required /> <br />
            <Button onClick={onSearch} variant="primary" size="lg" block> Search</Button>
        </Form>
    )
    return (
        <div className='container'>
            <hr />
            <div className="row">

                <div className="col-md-4 p-5">
                    <div className='container p-2' id='destination'>
                        From:  {from} <br />
                       To :  {to}
                    </div>
                    {form}
                </div>
                <div className="col-md-8">
                   
                </div>
            </div>
        </div>
    );
};

export default Search;