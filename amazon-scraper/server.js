import express from "express";
import axios from "axios";
import { JSDOM } from "jsdom";

const app = express();
const port = 3000;

const scrapeFromWeb = async (keyword) => {
    const url = `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`;
    const response = await axios.get(url);
    const dom = new JSDOM(response.data);
    const products = dom.window.document.querySelectorAll(".s-main-slot .s-result-item");

    const items = [];
    products.forEach((product) => {
        const title = product.querySelector(".a-size-medium").textContent;
        const price = product.querySelector(".a-price-whole").textContent;
        const rating = item.querySelector('.a-icon-alt')?.textContent || 'No rating';
        const reviews = item.querySelector('.a-size-base')?.textContent || 'No reviews';
        const image = item.querySelector('.s-image')?.src || '';

        items.push({ title, price, reviews, rating, image });
    });

    return items;
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
    console.log(`Server is running on port ${port}`);
});