// dotenv config
require("dotenv").config();
const express = require("express");
// import modules from OpenAI Library
const {configuration, OpenAIApi} = require("openai");

const app = express();
app.use(express.json());

const configuration = new configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

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
        const response = await openai.createCompletion({
            model:"text-davinci-003",
            prompt,
        });
        //retreives the completion text from the response
        const completion= response.data.choices[0].text;
        //return result
        return res.status(200).json({
            success:true,
            message:prompt,
        });
    } catch( error) {
        console.log(error.message);
    }
});

app.listen(port, () => console.log(`Server is running on port ${port}`));