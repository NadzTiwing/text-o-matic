import { generatePrompt, openai } from "../../utils";

export default async function handler(req, res) {
  const input = req.body.input;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      max_tokens: 50,
      temperature: 0.8,
    });
    res
      .status(200)
      .json({ status: "success", result: response.data.choices[0].text });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ status: "failed" });
  }
}
