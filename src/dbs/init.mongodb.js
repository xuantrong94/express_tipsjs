const { default: mongoose } = require('mongoose')
const { countConnect } = require('../helpers/check.connect')

const connectString = `mongodb+srv://nxuantrong3112:trong1234@mycluster.j59yckg.mongodb.net/shopDEV?retryWrites=true&w=majority&appName=MyCluster`

class Database {
	constructor(db) {
		this.connect()
	}
	connect(type = 'mongodb') {
		if (true) {
			mongoose.set('debug', true)
			mongoose.set('debug', { color: true })
		}
		mongoose
      .connect(connectString, {
        maxPoolSize: 50
      })
			.then((_) => {
				console.log('Connected to MongoDB shopDEV successfully PRO')
				// countConnect()
			})
			.catch((error) => console.log('Connect to MongoDB failed', error))
	}
	static getInstance() {
		if (!Database.instance) {
			Database.instance = new Database(mongoose)
		}
		return Database.instance
	}
}

const instanceMongodb = Database.getInstance()

module.exports = instanceMongodb
