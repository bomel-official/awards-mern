const {Router} = require('express')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const Award = require('../models/Award')
const User = require('../models/User')

const multer  = require('multer')
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
const upload = multer({storage}).single('image')

const router = Router()


router.post(
    '/create',
    [
        auth,
        upload,
        check('contestName', 'Поле должно быть заполнено').exists(),
        check('contestDate', 'Поле должно быть заполнено').exists(),
        check('contestCity', 'Поле должно быть заполнено').exists(),
        check('contestPlace', 'Поле должно быть заполнено').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty() || !req.file) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Все поля должны быть заполнены'
                })
            }

            const {contestName, contestDate, contestCity, contestPlace} = req.body

            const user = await User.findOne({_id: req.user.userId})

            const award = new Award({
                contestName,
                contestDate,
                contestCity,
                contestPlace,
                imagePath: config.get('baseUrl') + "/" + req.file.path,
                owner: req.user.userId,
                ownerFullname: user.name + ' ' + user.surname,
                ownerCity: user.city,
                ownerClass: user.classNumber + ' ' + user.classLetter + ' (' + user.classProfile + ')'
            })
            await award.save()

            await User.updateOne({_id: req.user.userId}, {
                $push: { awards: award.id },
                awardsLength: user.awards.length + 1
            })

            res.status(201).json({ awardId: award.id })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/d/:id',
    async (req, res) => {
        try {
            const award = await Award.findById(req.params.id)
            res.json(award)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/list/:userId/:limit',
    async (req, res) => {
        try {
            const userId = req.params.userId
            const limit = parseInt(req.params.limit)
            let awards

            if (userId === 'none') {
                awards = await Award.find().sort('-date')
            } else {
                awards = await Award.find({ owner: userId }).sort('-date')
            }

            if (limit) {
                awards = awards.slice(0, limit)
            }

            res.json(awards)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

module.exports = router