const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughts-controller');

// get all thoughts and add thoughts  
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts)

//  /api/thoughts/<thoughtsId>
router
  .route('/:userId')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts)

  // api/thoughts//<thoughtsId>/<reaction
router
  .route('/:thoughtsId/:reaction')
  .post(addReaction)

router
  .route('/:thoughtsId/:reaction/:reactionId')
  .delete(deleteReaction);

module.exports = router;