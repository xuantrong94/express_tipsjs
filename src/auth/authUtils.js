const JWT = require('jsonwebtoken')
const createTokenPair = async (payload, publicKey, privateKey) => {
	try {
		const accessToken = await JWT.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '1 day',
		})

		const refreshToken = await JWT.sign(payload, privateKey, {
			algorithm: 'RS256',
			expiresIn: '7 days',
		})

		JWT.verify(accessToken, publicKey, (err, decode) => {
			if (err) {
				console.error('Invalid Access Token:', err)
				return {
					decode: decode,
					code: 'aaa',
					message: 'Invalid Access Token',
					status: 'error',
				}
			}
		})

		return {
			accessToken,
			refreshToken,
		}
	} catch (error) {
		return {
			code: 'bbb',
			message: error.message,
			status: 'error',
		}
	}
}

module.exports = {
	createTokenPair,
}
