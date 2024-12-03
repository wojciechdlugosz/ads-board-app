const validateAds = (title, content, date, location, seller, price, fileType) => {
	price = Number(price)

	if (
		title &&
		content &&
		date &&
		location &&
		seller &&
		price &&
		['image/png', 'image/jpeg', 'image/gif', 'unknown'].includes(fileType) &&
		typeof title === 'string' &&
		typeof content === 'string' &&
		typeof date === 'string' &&
		typeof location === 'string' &&
		typeof seller === 'string' &&
		typeof price === 'number' &&
		title.length < 50 &&
		title.length > 10 &&
		content.length > 20 &&
		content.length < 1000
	) {
		return true
	}
}

module.exports = validateAds