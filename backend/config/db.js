const mongoose = require('mongoose');

const connectDB = async ()=>{
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }
        
        const connectionInstance = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n✅ MongoDB connected! DB Host: ${connectionInstance.connection.host}`)

    } catch (error) {
        console.error(`\n❌ MongoDB Connection Error: ${error.message}`)
        if (error.message.includes('whitelist')) {
            console.error('\n📝 To fix this:')
            console.error('1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com/')
            console.error('2. Navigate to Network Access (Security → Network Access)')
            console.error('3. Click "Add IP Address"')
            console.error('4. Click "Add Current IP Address" or add 0.0.0.0/0 for development (less secure)')
            console.error('5. Wait a few minutes for changes to propagate\n')
        }
        process.exit(1)
    }
}

module.exports = connectDB