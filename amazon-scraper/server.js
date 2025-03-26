import express from "express";
import axios from "axios";
import cors from "cors";
//import { JSDOM } from "jsdom";

const app = express();
const port = 3000;

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
  }));
// api key do scrapperAPI
const APIKEY = "59d881e0fb2cf70eeeb34414ad0272ac";
const scrapeFromWeb = async (keyword) => {
    try{
        const url= `https://api.scraperapi.com/structured/amazon/search?api_key=${APIKEY}&query=${encodeURIComponent(keyword)}&tld=com&page=1`;
        //const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
        const response = await axios.get(url);
        // const dom = new JSDOM(response.data);
        // const document = dom.window.document
    
        // const products = [...document.querySelectorAll('.s-main-slot .s-result-item')].map(item => {
        //     const title = item.querySelector('h2') ? item.querySelector('h2').textContent : 'No title';
        //     const rating = item.querySelector('.a-icon-alt') ? item.querySelector('.a-icon-alt').textContent : 'No rating';
        //     const reviews = item.querySelector('.a-size-base') ? item.querySelector('.a-size-base').textContent : 'No reviews';
        //     const imageUrl = item.querySelector('img') ? item.querySelector('img').src : 'No image';
      
        //     return { title, rating, reviews, imageUrl };
        //   });
        const products = response.data.results.map(item => ({
            title: item.name,
            price: item.price,
            rating: item.stars,
            reviews: item.total_reviews,
            imageUrl: item.image||'No image'

        }))

        return products;
    }catch (error) {
        console.error('Error during scraping:', error);
        throw new Error('Error during scraping function');
    }
    
}



app.get("/api/scrape", async (req, res) => {

    const keyword = req.query.keyword;
    if(!keyword) {
        return res.status(400).json({ error: "Keyword is required" });
    }
    try {
        const items = await scrapeFromWeb(keyword);
        res.json(items);
    } catch (error) {
        return res.status(500).json({ error: "Failed to scrape data" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});