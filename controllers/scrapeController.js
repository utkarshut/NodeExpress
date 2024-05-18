const axios = require('axios');
const cheerio = require('cheerio');
const { parseBestsellers } = require('../utils/parseBestsellers');

const scrape = async (req, res) => {
    try {
        const { data } = await axios.get('https://www.amazon.in/gp/bestsellers', {
            headers: {
                'User-Agent': 'Mozilla/5.0'
            }
        });
        const $ = cheerio.load(data);
        const items = [];
        $('.zg-item-immersion').each((index, element) => {
            const name = $(element).find('.p13n-sc-truncate').text().trim();
            const imageUrl = $(element).find('img').attr('src');
            const rating = $(element).find('.a-icon-alt').text().trim();
            const reviews = $(element).find('.a-size-small').text().trim();
            const price = $(element).find('.p13n-sc-price').text().trim();
            items.push({ name, imageUrl, rating, reviews, price });
        });
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while scraping the data');
    }
};

module.exports = { scrape };
