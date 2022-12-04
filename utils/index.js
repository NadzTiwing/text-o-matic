import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
export const openai = new OpenAIApi(configuration);

export const server =
  process.env.NODE_ENV === "production"
    ? "https://textomatic.vercel.app"
    : "http://localhost:3000";

export function generatePrompt(event) {
  return `Suggest a good caption for the ${event}
      Event: Coffee date
      Caption: Coffee and conversation - the perfect way to start the day!, All they do is drink coffee, coffee, coffee.
      Event: Birthday party
      Caption: Today, we celebrate me, Cheers to a day as special as me, I didn't choose this birthday, this birthday chose me
      Event: Party
      Caption: All I want is good music, great friends, bright lights and late nights, Life is made by some little beautiful moment like this, Twinkle, Twinkle little star … Sign me up to the nearest bar
      Event: Beach Party
      Caption: Seas the day, Happiness comes in waves, The beach is calling and I must go, All you need is a good dose of vitamin sea
      Event: Wedding
      Caption: This day was as perfect as this photo, To love, laughter, and their happily ever after, The best thing to hold onto in life is each other
      Event: Date
      Caption: Best thing that's ever happened to me, Every day, I love you more, One smile can't change the world, but your smile changes mine
      Event: Food
      Caption: Live, love, eat., To live a full life, you have to fill your stomach first., Dear diet, things just aren't looking good for the both of us. It's not me, it's you. You're too much work. You're boring and I can't stop cheating on you., Eat right, exercise, die anyway
      Event: ${event}
      Event: Hiking
      Caption: Leaf all your worries behind, Nature is cheaper than therapy., Hoping this trail leads somewhere., Hiking: the best way to avoid people
      Suggestion:`;
}
