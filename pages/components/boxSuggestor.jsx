import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const BoxSuggestor = () => {

    const [input, setInput] = useState("Enter a life event");
    const [result, setResult] = useState("");

    const generateIdea = async () => {
        setResult("Thinking...");
        const response = await fetch(`http://localhost:3000/api/generator`, {
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
                <div className="input-section">
                    <FloatingLabel
                    controlId="inquiry"
                    label="Suggest a caption for:"
                    className="mb-3 event-input"
                    >
                        <Form.Control 
                        type="text"
                        value={input}
                        onChange={(evt)=>setInput(input => input = evt.target.value)} />
                    </FloatingLabel>
                    <Button variant="dark" className="generate-btn" onClick={generateIdea}>Generate</Button>
                </div>
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