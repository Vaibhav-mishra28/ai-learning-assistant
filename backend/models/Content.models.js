const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    //Content data 
    text:{
        type: String,
        required: true,
        trim: true,
    },
    contentType:{
        type: String,
        required: true,
        enum: ['text', 'pdf', 'url'],
        default: 'text',
    },
    //optional title
    title:{
        type: String,
        trim: true,
        default: 'Untitled',
    },

    //AI generated summary (optional can be generated later)
    summary:{
        type: String,
        default: null
    },
    summaryLength:{
        type:String,
        enum:['short', 'medium', 'detailed'],
        default:null
    },
    //for future use: original file name or URL
    source:{
        type:String,
        default: null
    }
},
{
    timestamps: true //adds createdAt and updatedAt automatically
}
);

//Index for faster queries 
contentSchema.index({createdAt: -1});

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;