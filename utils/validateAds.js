const validateAds = (title, text, date, location, seller, price, fileType) => {
	price = Number(price);

	if (
		title &&
		text &&
		date &&
		location &&
		seller &&
		price &&
		['image/png', 'image/jpeg', 'image/gif'].includes(fileType) &&
		typeof title === 'string' &&
		typeof text === 'string' &&
		typeof date === 'string' &&
		typeof location === 'string' &&
		typeof seller === 'string' &&
		typeof price === 'number' &&
		title.length < 50 &&
		title.length > 10 &&
		text.length > 20 &&
		text.length < 1000
	) {
		return true
	}
};
module.exports = validateAds;