const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')

const RoleShop = {
	ADMIN: 'admin',
	MANAGER: 'manager',
	CUSTOMER: 'customer',
	SHOP: 'shop',
	WRIER: 'writer',
}

class AccessServices {
	static signUp = async ({ name, password, email }) => {
		try {
			// step 1: check if email already exists
			const holderShop = await shopModel.findOne({ email }).lean()
			if (holderShop) {
				return {
					code: 'ccc',
					message: 'Email already exists',
					status: 'error',
				}
			}
			console.log('step 1 done')
			// step 2: create new shop instance and save to db with hashed password
			const hashedPassword = await bcrypt.hash(password, 10)

			const newShop = await shopModel.create({
				name,
				email,
				password: hashedPassword,
				roles: [RoleShop.SHOP],
			})
			console.log('step 2 done')
			// step 3: create private and public key for shop instance and save to db
			if (newShop) {
				const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
					modulusLength: 2048,
					publicKeyEncoding: {
						type: 'spki',
						format: 'pem',
					},
					privateKeyEncoding: {
						type: 'pkcs8',
						format: 'pem',
					},
				})

				// step 4: create key token for shop instance and save to db
				const publicKeyString = await KeyTokenService.createKeyToken({
					userId: newShop._id,
					publicKey,
				})

				if (!publicKeyString) {
					return {
						code: 'eee',
						message: 'Create key token failed',
						status: 'error',
					}
				}

				const tokens = await createTokenPair(
					{ userId: newShop._id },
					publicKeyString,
					privateKey
				)
				console.log(`Create key token success: ${tokens}`)

				return {
					code: 201,
					message: 'Sign up successfully',
					status: 'success',
					metadata: {
						shop: newShop,
						tokens,
					},
				}
			}

			return {
				code: 'ddd',
				message: 'Create new shop failed',
				status: 'error',
			}
		} catch (error) {
			return {
				code: 'fff',
				message: error.message,
				status: 'error',
			}
		}
	}
}

module.exports = AccessServices
