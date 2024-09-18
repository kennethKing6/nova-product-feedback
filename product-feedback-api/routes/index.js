var express = require('express');
const { StatusConstants } = require('../database/constants');
const { FeedbacksModel, UserProfileModel, ProjectModel, } = require('../database/FeedbackSchema');
const { firebaseAuth } = require('../firebase/firebaseInit');
const { getUser } = require('../firebase/firebaseUtils');
const router = express.Router();
/** 
 * Feedback apis
 */
router.post('/create-feedback', async (req, res, next) => {
  const { body, query, params } = req;
  const { title, description, category } = body;

  const feedbackDatabase = new FeedbacksModel({
    title: title,
    category: category,
    description: description
  })
  try {
    await feedbackDatabase.save()
    res.json({
      status: 200,
      message: 'successful'
    })
  } catch (err) {
    res.status(400)
    res.json({
      message: 'Could not create a new feedback',
      status: 400
    })
  }
})

router.get('/list-feedback', async (req, res, next) => {
  try {
    const result = await FeedbacksModel.find({})

    res.status(200),
      res.json(result)
  } catch (err) {
    res.status(400)
    res.json({
      message: 'No FeedbacksModel'
    })
  }
})

router.post('/update-feedback', async (req, res, next) => {
  const { feedbackId, title, description, category, status } = req.body;
  try {
    const result = await FeedbacksModel.updateOne({ _id: feedbackId }, {
      title: title,
      description: description,
      category: category,
      status: status
    })

    res.status(200);
    res.json({
      message: "successful",
      result
    })
  } catch (err) {
    res.status(400)
    res.json({
      message: 'No FeedbacksModel',
      err
    })
  }
})

router.post('/delete-feedback', async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = body
    await FeedbacksModel.deleteOne({ _id: id })

    res.status(200);
    res.json({
      message: 'Successful',
    })
  } catch (err) {
    res.status(400)
    res.json({
      message: 'failed'
    })
  }
})

router.get('/feedback-by-status', async (req, res, next) => {
  try {
    const planned = await FeedbacksModel.find({
      status: StatusConstants.PLANNED
    })
    const inProgress = await FeedbacksModel.find({
      status: StatusConstants.IN_PROGRESS
    })

    const live = await FeedbacksModel.find({
      status: StatusConstants.LIVE
    })

    res.status(200);
    res.json({
      message: 'Successful',
      FeedbacksModelByStatus: {
        planned: planned,
        inProgress: inProgress,
        live: live
      }
    })
  } catch (err) {
    res.status(400)
    res.json({
      message: 'failed',
      err
    })
  }
})

/**
 * Upvotes apis
 */
router.get('/most-upvotes', async (req, res) => {

  try {

    const results = await FeedbacksModel.find({}).sort({ upvotes: -1 })



    res.status(200);
    res.json({
      message: 'Successful',
      mostUpvotes: results
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed',
      ...err
    })
  }
})
router.get('/least-upvotes', async (req, res) => {

  try {
    const results = await FeedbacksModel.find({}).sort({ upvotes: 1 })

    res.status(200);
    res.json({
      message: 'Successful',
      leastUpvotes: results
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed'
    })
  }
})

/** Comments api */
router.post('/post-comment', async (req, res) => {
  const { body } = req;
  const { id, content, user } = body

  try {

    const newPost = {
      content: content,
      user: user
    }
    // await FeedbacksModel.comments.push(newPost)
    // await FeedbacksModel.bulkSave()
    await FeedbacksModel.updateOne({ _id: id }, {
      "$push": { comments: newPost }
    })

    res.status(200);
    res.json({
      message: 'Successful',
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed'
    })
  }
})

router.get('/most-comments', async (req, res) => {

  try {

    const results = await FeedbacksModel.find({})

    const mostComments = results.sort((a, b) => b.comments.length - a.comments.length)

    res.status(200);
    res.json({
      message: 'Successful',
      mostComments: mostComments
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed',
      ...err
    })
  }
})
router.get('/least-comments', async (req, res) => {

  try {
    const results = await FeedbacksModel.find({})
    const leastComments = results.sort((a, b) => a.comments.length - b.comments.length)
    res.status(200);
    res.json({
      message: 'Successful',
      leastComments: leastComments
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed'
    })
  }
})
router.post('/list-comments', async (req, res) => {
  const { body } = req;
  const { feedbackId } = body
  try {

    const result = await FeedbacksModel.find({ _id: feedbackId })
    const { comments } = result[0];


    res.status(200);
    res.json({
      message: 'Successful',
      comments: comments
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed'
    })
  }
})

router.post('/post-level-one-reply', async (req, res) => {
  const { body } = req;
  const { feedbackCommentId, content, user, replyingTo } = body
  try {
    const repliesModel = {
      content: content,
      user: user,
      replyingTo: replyingTo
    }



    const result = await FeedbacksModel.updateOne({ "comments._id": { $in: [feedbackCommentId] } }, {
      "$push": { "comments.$.replies": repliesModel }
    })

    res.status(200);
    res.json({
      message: 'Successful',
      result
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed',
      ...err
    })
  }
})

router.post('/post-level-two-reply', async (req, res) => {
  const { body } = req;
  const { content, user, replyingTo, levelOneReplyID } = body
  try {
    const secondRepliesModel = {
      content: content,
      replyingTo: replyingTo,
      user: user
    }
    const result = await FeedbacksModel.updateOne({
      "comments.replies._id": { $eq: levelOneReplyID }
    }, {
      "$push": { "comments.$.replies.$[].replies": secondRepliesModel }
    }, (err, raw) => {
      console.log('post-level-two-reply', err)
    })

    res.status(200);
    res.json({
      message: 'Successful',
      result
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed',
      ...err
    })
  }
})

router.post("/list-feedback-by-category", async (req, res) => {

  const { body } = req;
  const { categoryID } = body
  try {
    const result = await FeedbacksModel.find({ category: categoryID }).sort({ updatedAt: -1 })
    res.status(200);
    res.json({
      message: 'Successful',
      feedbackByCategory: result
    })
  } catch (err) {
    res.status(400);
    res.json({
      message: 'failed',
      ...err
    })
  }

})

//Profile Apis
router.post("/create-user-profile", async (req, res) => {
  const { body, headers } = req;
  const { authToken } = headers;
  const user = await getUser(authToken)
  if (user) {
    const { username, name = '', profilePicture = '' } = body
    const userProfile = new UserProfileModel({
      userId: user,
      username: username,
      image: profilePicture,
      name: name
    })
    try {
      await userProfile.save()
      res.json({
        message: 'Successful',
      })
    } catch (err) {
      res.status(400);
      res.json({
        message: 'failed'
      })
      await firebaseAuth.deleteUser(user)

    }
  } else {
    res.status(401)
    res.send({
      message: "unauthorized"
    })
  }
})
router.post("/get-user-profile", async (req, res) => {
  const { authToken } = headers;
  const user = await getUser(authToken)
  if (user) {
    const userProfile = await UserProfileModel.find({ userId: user })
    try {
      await userProfile.save()
      res.json({
        message: 'Successful',
        userProfile: userProfile
      })
    } catch (err) {
      res.status(400);
      res.json({
        message: 'failed'
      })
    }
  } else {
    res.status(401)
    res.send({
      message: "unauthorized"
    })
  }
})
//Project Apis

router.post("/create-project", async (req, res) => {
  const {headers} = req
  const { token:authToken } = headers;


  const { body } = req
  const { email, projectName,contributors } = body

  const userID = await getUser(authToken)


  if (userID) {
    const projectModel = new ProjectModel({
      admin: email,
      contributors: contributors,
      name: projectName,
      projectPicture: "",
      userId: userID,
    })
    try {
      await projectModel.save()
      res.json({
        message: 'Successful',
      })
    } catch (err) {
      console.log('err',err)
      res.status(400);
      res.json({
        message: 'failed'
      })
    }
  } else {
    res.status(401)
    res.send({
      message: "unauthorized"
    })
  }
})

router.get("/list-projects", async (req, res) => {
  const {headers} = req

  const { token:authToken,email } = headers;

  const userID = await getUser(authToken)

  if (userID) {
    const userProfile = await ProjectModel.find({ contributors: email })
    try {

      res.json({
        message: 'Successful',
        projects: userProfile
      })
    } catch (err) {
      res.status(400);
      res.json({
        message: 'failed'
      })
    }
  } else {
    res.status(401)
    res.send({
      message: "unauthorized"
    })
  }
})


router.post("/add-contributors", async (req, res) => {
  const { token:authToken } = headers;


  const { body } = req
  const { email, admin } = body

  const userID = await getUser(authToken)

  if (userID) {

    const result = await ProjectModel.updateOne({
      admin: email,
      userId: userID
    }, {
      $push: { contributors: email }
    })

    try {
      res.json({
        message: 'Successful',
      })
    } catch (err) {
      res.status(400);
      res.json({
        message: 'failed'
      })
    }
  } else {
    res.status(401)
    res.send({
      message: "unauthorized"
    })
  }
})

module.exports = router;
