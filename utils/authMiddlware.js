const authMiddlware = (req, res, next) => {
	if (req.session.login) {
		next();
	} else {
		res.status(401).send({ message: 'you are not authorized' });
	}
};

module.exports = authMiddlware;