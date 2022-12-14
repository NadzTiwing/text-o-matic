import { React, useState} from 'react';
import HTMLHead from './components/header';
import Form from 'react-bootstrap/Form';
import BoxSuggestor from './components/boxSuggestor';
import BoxChecker from './components/boxChecker';

export default function Home() {
  const [selected, setSelected] = useState("suggestion");

  return (
    <>
      <HTMLHead/>
      <div className="home-wrapper">
        <header> 
          <h4 id="app-title">Text-O-Matic</h4>
          <p>AI-Powered Text Generator</p>
        </header>
        <article>
          <Form.Select aria-label="tool-selection" onChange={(evt) => setSelected(selected => selected=evt.target.value)}>
            <option value="suggestion">Caption Generator</option>
            <option value="checker">Spell Checker</option>
          </Form.Select>
          { selected === "suggestion" ? <BoxSuggestor/> : <BoxChecker/> }
        </article>
      </div>
    </>
  )
}
