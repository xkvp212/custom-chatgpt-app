// dotenv config
const { OpenAI } = require("openai");
require("dotenv").config();
const express = require("express");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;
// POST request endpoint
app.post("/ask", async (req, res) => {
    // get prompt question from request
    const prompt= req.body.prompt;
    
    try{
        if(prompt == null) {
            throw new error("No prompt provided");
        }
        // triggers OpenAI completion
        const response = await openai.completions.create({
            model: "text-davinci-003",
            prompt,
            max_tokens: 70, // max text response characters
        });
        //retreives the completion text from the response
        const completion= response.choices[0].text;
        //return result
        return res.status(200).json({
            success:true,
            message:completion,
        });
    } catch( error) {
        console.log(error.message);
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));

