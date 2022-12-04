import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { server } from './../utils';

const BoxSuggestor = () => {

    const [input, setInput] = useState("");
    const [result, setResult] = useState("");

    const generateIdea = async () => {
        if(!input) {
            alert("Please enter something.");
            return;
        }
        setResult("Thinking...");
        setTimeout(()=>{
            setResult(result => result+=".");
        },[1000]);

        const response = await fetch(`${server}/api/generator`, {
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
            <Card.Title>Caption Generator</Card.Title>
            <Card.Body>
                <InputGroup className="mb-3">
                    <Form.Control
                    placeholder="Enter a life event"
                    aria-label="Event"
                    aria-describedby="event-input"
                    value={input}
                    onChange={(evt)=>setInput(input => input = evt.target.value)}
                    />
                    <Button variant="dark" onClick={generateIdea}>Generate</Button>
                </InputGroup>
                <FloatingLabel controlId="input" label="Generated Text">
                    <Form.Control
                    as="textarea"
                    style={{ height: '100px' }}
                    row={3}
                    value={result}
                    onChange={(evt)=>setResult(result => result =evt.target.value)}
                    />
                </FloatingLabel>
            </Card.Body>
        </Card>
    );
}

export default BoxSuggestor;