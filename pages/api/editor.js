import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const input = req.body.input;

  try {
    const response = await openai.createEdit({
      model: "text-davinci-edit-001",
      input: input,
      instruction: "Fix the spelling mistakes",
      temperature: 0.7,
      n: 5,
    });
    res
      .status(200)
      .json({ status: "success", result: response.data.choices[0].text });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ status: "failed" });
  }
}
