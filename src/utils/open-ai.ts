import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// export async function geminiAI(description: string) {
//   const response = await model.generateContent({
//     messages: [
//       {
//         role: "system",
//         content:
//           "I need help writing about the description I provided. Suggest some ideas about the story unfolding or resume writing if resume details are provided.",
//       },
//       {
//         role: "user",
//         content: JSON.stringify({
//           description: [description],
//         }),
//       },
//     ],
//   });

//   const messageContent = response.data.choices[0].message?.content;

//   if (messageContent) {
//     return messageContent;
//   }
// }


export async function geminiAI(description: string) {
  const prompt = `
  I need help writing about the description I provided. Suggest some ideas about the story unfolding or resume writing if resume details are provided.
    Description: ${description}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();

    return text;
  }

  catch (error) {
    console.error("Error generating content with Gemini API:", error);
    return null;
  }
}