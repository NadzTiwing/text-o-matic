import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { server } from '../../utils';

const BoxChecker = () => {

    const [input, setInput] = useState("Enter your text");
    const [result, setResult] = useState("");

    const showResult = async () => {
        if(!input) {
            alert("Please enter something.");
            return;
        }
        setResult("Checking...");
        setTimeout(()=>{
            setResult(result => result+=".");
        },[1000])

        const response = await fetch(`${server}/api/editor`, {
            method: "POST",
            body: JSON.stringify({ input }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const data = await response.json();
        if(data.status === "success") {
            setResult(data.result);
        } else setResult("Something wrong happened. Please try again");
        

    }

    return(
        <Card className="card-box">
            <Card.Title>Spell Checker</Card.Title>
            <Card.Body>
                <FloatingLabel controlId="input" label="Your input">
                    <Form.Control
                    as="textarea"
                    style={{ height: '300px' }}
                    value={input}
                    onChange={(evt)=>setInput(input => input =evt.target.value)}
                    />
                </FloatingLabel>
                <Button variant="dark" className="my-3" onClick={showResult}>Check</Button>
                <FloatingLabel controlId="input" label="Result">
                    <Form.Control
                    as="textarea"
                    style={{ height: '300px' }}
                    row={3}
                    value={result}
                    onChange={(evt)=>setResult(result => result =evt.target.value)}
                    />
                </FloatingLabel>
            </Card.Body>
        </Card>
    );
}

export default BoxChecker;