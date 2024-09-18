const { CategoryConstants, StatusConstants } = require('./constants')
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL);
const { Schema, } = mongoose;

const ProfileSchema = new Schema({
    image: String,
    name: String,
    username: {
        type:String,
        required:[true,"Please specify a username"]
    },
    userId: {
        type:String,
        required:[true,"Please specify a user id"]
    }

})
const ProjectSchema = new Schema({
    name: String,
    projectPicture: String,
    admin: {
        type:String,
        required:[true,"Please specify an admin"]
    },
    contributors: {
        type:Array,
        required:[true,"Please specify contributors"]
    }

})

const SecondFeedbackReplies = new Schema({
    content: String,
    replyingTo: String,
    user: {
        image: String,
        name: String,
        username: String
    }
}, {
    timestamps: true
})

const FeedbackReplies = new Schema({
    content: String,
    replyingTo: String,
    user: {
        image: String,
        name: String,
        username: String
    },
    replies: {
        type: [SecondFeedbackReplies]
    }
}, {
    timestamps: true
})

const FeedbackComments = new Schema({
    content: String,
    user: {
        image: String,
        name: String,
        username: String
    },
    replies: {
        type: [FeedbackReplies]
    }
}, {
    timestamps: true
});

const FeedbackSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Please specify a feedback title']
    },
    category: {
        type: Number,
        required: [true, 'Please specify a feedback category'],
        default: CategoryConstants.FEATURE
    },
    status: {
        type: String,
        required: [true, 'Please specify a feedback status'],
        enum: [StatusConstants.PLANNED, StatusConstants.IN_PROGRESS, StatusConstants.LIVE],
        default: StatusConstants.PLANNED
    },
    description: {
        type: String,
        default: ''
    },
    upvotes: {
        type: Number,
        default: 0
    },
    comments: [FeedbackComments]
}, {
    timestamps: true
});

exports.FeedbacksModel = mongoose.model('Feedback', FeedbackSchema);
exports.CommentsModel = mongoose.model('Comment', FeedbackComments);
exports.RepliesModel = mongoose.model('Reply', FeedbackReplies);
exports.SecondRepliesModel = mongoose.model('SecondReply', SecondFeedbackReplies);
exports.UserProfileModel = mongoose.model('UserProfile', ProfileSchema);
exports.ProjectModel = mongoose.model('Projects', ProjectSchema);


