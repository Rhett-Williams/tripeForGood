import { zodResponseFormat } from "openai/helpers/zod";
import OpenAI from "openai";
import { z } from "zod";



const response = z.object({
  accomodation: z.object({
    hotel: z.string(),
    reason: z.string(),
    url: z.string(),
    displayImageUrl: z.string(),
  }),
  activites: z.object({
    hotel: z.string(),
    reason: z.string(),
    url: z.string(),
    displayImageUrl: z.string(),
  }),
});


export const handleGammin = async (location) => {
    const promt =
  `please search for and get me a list of sustainable and ecologically ethical holiday ideas for ${location}. please include specific activities, with specific companies, for example, fjordtours.com offers ice fishing. please also provide details on why this activity is sustainable and ethical. with details about why it is sustainable. please also include the plans for accomodation. an example JSON response is as follows:{"accomodation":{"hotel":"H70 Hotell Molde","reason":"This eco-certified hotel is centrally located and uses renewable energy sources. They also offer bike rentals and have a focus on local, seasonal food. (Check availability and rates online)"},"activities":{"activity":"Hiking with Bergen Base Camp","description":"Explore the stunning trails around Bergen with a company committed to "leave no trace" principles. They offer guided hikes with experienced leaders","url":"https://www.bergenbasecamp.no/en/home"}}';`
    const openai = new OpenAI({
        apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
        dangerouslyAllowBrowser: true
      });
      
      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          {
            role: "user",
            content: promt,
          },
        ],
        response_format: zodResponseFormat(response, "event"),
      });
      return completion.choices[0].message.parsed
}