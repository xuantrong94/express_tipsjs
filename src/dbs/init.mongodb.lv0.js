const { default: mongoose } = require('mongoose')

const connectString = `mongodb+srv://nxuantrong3112:trong1234@mycluster.j59yckg.mongodb.net/shopDEV?retryWrites=true&w=majority&appName=MyCluster`

mongoose
	.connect(connectString)
	.then((_) => console.log('Connected to MongoDB shopDEV successfully'))
	.catch((error) => console.log('Connect to MongoDB failed', error))

module.exports = mongoose
