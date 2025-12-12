const mongoose = require ("mongoose");

const answerSchema = new mongoose.Schema({
    questionIndex:{
        type: Number,
        required:true,
        min:0,
    },
    selectedAnswer:{
        type:String,
        enum:['A', 'B', 'C', 'D'],
        required: true,
    },
    isCorrect:{
        type:Boolean,
        required:true,
    },
    timeSpent:{
        type:Number, //in seconds
        default:0
    }
}, {_id:false});


const progressSchema = new mongoose.Schema({
    quizId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Quiz',
        required:true,
    },
    contentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Content',
        required:true
    },
    answers:{
        type:[answerSchema],
        required:true,
    },
    //score calculation
    score:{
        type:Number,
        required:true,
        min:0,
        max:100
    },
    //total ques
    totalQuestions:{
        type:Number,
        required:true,
        min:1
    },
    timeTaken:{
        type:Number,
        default:0,
        min:0,
    },
    completedAt:{
        type:Date,
        default: Date.now
    }
}, {
    timestamps:true //adds createdAt and updatedAt
});

//index for faster queries
progressSchema.index({quizId: 1, createdAt: -1});
progressSchema.index({contentId: 1});

//calculate score before saving
progressSchema.pre('save', async function(){
    if(this.answers && this.totalQuestions){
        this.correctAnswers = this.answers.filter(a=> a.isCorrect).length;
        this.score = Math.round((this.correctAnswers / this.totalQuestions)* 100);
    }
});

const Progress = mongoose.model('Progress', progressSchema);

module.exports = Progress;