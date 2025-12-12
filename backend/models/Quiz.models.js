const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
    question:{
        type:String,
        required:true,
        trim: true,
    },
    options:{
        A:{type:String, required:true},
        B:{type:String, required:true},
        C:{type:String, required:true},
        D:{type:String, required:true},
    },
    correctAnswer:{
        type:String,
        required:true,
        enum:['A', 'B', 'C', 'D'],
    },
    explanation:{
        type:String,
        required:true,
        trim:true,
    }
}, {_id:false}); //Don't create separate _id for each question


const quizSchema = new mongoose.Schema({
    //referenced to the content this quiz was created from
    contentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Content',
        required:true,
    },

    //quiz questions array
    questions:{
        type:[questionSchema],
        required: true,
        validate:{
            validator: function(questions){
                return questions.length > 0;
            },
            message:'Quiz must have at least one question'
        },
    },
    //difficulty level
    difficulty:{
        type: String,
        enum:['easy', 'medium', 'hard'],
        default:'medium',
        required:true,
    },
    //no. of questions
    numQuestions:{
        type:Number,
        required:true,
        min:1,
        max:20
    },
    //quiz type (for future: mcq, true/false, flashcards)
    quizType:{
        type:String,
        enum:['mcq', 'truefalse', 'flashcard'],
        default:'mcq',
    },

    //track if quiz has been taken
    isTaken:{
        type:Boolean,
        default:false,
    },
},
{
    timestamps: true //adds createdAt and updatedAt automatically
});

quizSchema.index({contentId:1, createdAt:-1});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;
