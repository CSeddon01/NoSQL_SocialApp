const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtsById,
    createThoughts,
    updateThoughts,
    deleteThoughts
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

  // api/thoughts/<userId>/<thoughtsId> - update for reactions 
// router
//   .route('/:userId/:thoughtsId')
//   .get(getThoughtsById)
//   .put(updateThoughts)
//   .delete(deleteThoughts);

module.exports = router;