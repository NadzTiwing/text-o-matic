import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  const configuration = new Configuration({
    organization: "org-RRIO5p5DImv2Xii3Mdhc6YQR",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const input = req.body.input;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(input),
      max_tokens: 25,
      temperature: 0.7,
    });
    res
      .status(200)
      .json({ status: "success", result: response.data.choices[0].text });
  } catch (err) {
    console.log("Error: " + err);
    res.status(500).json({ status: "failed" });
  }
}

function generatePrompt(event) {
  return `Suggest a good caption for the ${event}
    Event: Coffee date
    Caption: Coffee and conversation - the perfect way to start the day!, All they do is drink coffee, coffee, coffee.
    Event: Birthday party
    Caption: Today, we celebrate me, Cheers to a day as special as me, I didn't choose this birthday, this birthday chose me
    Event: Party
    Caption: All I want is good music, great friends, bright lights and late nights, Life is made by some little beautiful moment like this, Twinkle, Twinkle little star … Sign me up to the nearest bar
    Event: Beach
    Caption: Seas the day, Happiness comes in waves, The beach is calling and I must go, All you need is a good dose of vitamin sea
    Event: ${event}
    Suggestion:`;
}
