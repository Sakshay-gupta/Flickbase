const express = require('express')
const router = express.Router();
const articleController = require('../controllers/articleController')
const auth = require('../middleware/auth')
const { addArticleValidator } = require('../middleware/validation');


router.post('/',auth('createAny', 'articles'),addArticleValidator, articleController.createArticle)

router.route('/article/:id')
.get(auth('readAny', 'articles'), articleController.getArticleById)
.patch(auth('updateAny', 'articles'), articleController.updateArticleById)
.delete(auth('deleteAny', 'articles'), articleController.deleteArticleById)

router.get('/user/article/:id', articleController.getUserArticleById)

router.route('/all')
.get(articleController.getAllArticle) // NOT GONNA USE, IT WAS JUST TO SHOW HOW TO
// WORK WITH QUERY REQ
.post(articleController.getMoreArticles)

router.post('/admin/paginate', auth('readAny', 'articles'), articleController.adminPaginate)
module.exports = router