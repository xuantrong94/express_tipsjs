const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
	static createKeyToken = async ({ userId, publicKey }) => {
		console.log(
			'::: ~ KeyTokenService ~ createKeyToken= ~ publicKey:',
			publicKey
		)
		try {
			// const publicKeyString = publicKey.export().toString()
			const publicKeyString = publicKey.toString()

			const tokens = await keyTokenModel.create({
				userId,
				publicKey,
			})
			console.log('::: ~ KeyTokenService ~ crateKeyToken= ~ tokens:', tokens)
			return tokens ? tokens.publicKey : null
		} catch (error) {
			return {
				code: 'xxx',
				message: error.message,
				status: 'error',
			}
		}
	}
}

module.exports = KeyTokenService
