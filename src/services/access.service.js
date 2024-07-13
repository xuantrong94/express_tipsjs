class AccessServices {
	static signUp = async () => {
		try {
		} catch (error) {
			return {
				code: 'xxx',
				message: error.message,
				status: 'error',
			}
		}
	}
}

module.exports = AccessServices
