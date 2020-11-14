const express = require("express"),
  router = express.Router(),
  dataFactory = require("../controller/dataFactory");

router
  .route('/save')
  .get(dataFactory.uploadData);

router
  .route('/fetch')
  .get(dataFactory.fetchData);
  
module.exports = router;
