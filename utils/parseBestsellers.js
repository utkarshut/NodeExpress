function parseBestsellers(content) {
    const pattern =
        /<div class="_cDEzb_p13n-sc-css-line-clamp-3_g3dy1">(?<name>.+?)<\/div>.*?src="(?<image_url>.+?)" class="a-dynamic-image p13n-sc-dynamic-image p13n-product-image" height="200px".+?<span class="a-icon-alt">(?<rating>.+?)<\/span>.+?<span class="a-size-small">(?<reviews>.+?)<\/span>.+?<span class="_cDEzb_p13n-sc-price_3mJ9Z">(?<price>.+?)<\/span>/gs;
    const matches = [...content.matchAll(pattern)];
    return matches.map((match) => ({
        name: match.groups.name.trim(),
        imageUrl: match.groups.image_url.trim(),
        rating: match.groups.rating.trim(),
        reviews: match.groups.reviews.trim(),
        price: match.groups.price.trim(),
    }));
}

module.exports = { parseBestsellers };
