const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const auth = require('../middleware/auth.middleware')
const User = require('../models/User')
const Award = require('../models/Award')

const router = Router()

const multer  = require('multer')
const storage = multer.diskStorage({ // notice you are calling the multer.diskStorage() method here, not multer()
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});
const upload = multer({storage}).single('avatar')

router.get(
    '/d/:id',
    async (req, res) => {
        try {
            const user = await User.findById(req.params.id)
            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.get(
    '/list/:sort/:limit',
    async (req, res) => {
        try {
            const sort = req.params.sort
            const limit = parseInt(req.params.limit)
            let users

            if (sort === 'default') {
                users = await User.find({ avatarPath: { $exists: true }, awardsLength: { $ne: 0 ,$exists: true  } }).sort(sort)
            } else {
                users = await User.find({ avatarPath: { $exists: true }, awardsLength: { $ne: 0, $exists: true } })
            }

            if (limit) {
                users = users.slice(0, limit)
            }

            res.json(users)
        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длинна паролья 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректные данные'
                })
            }

            const {email, password, rememberMe} = req.body

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({ email, password: hashedPassword })

            await user.save()

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: rememberMe ? '30d' : '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post(
    '/edit',
    [
        auth,
        upload,
        check('email', 'Некорректный email').isEmail(),
        check('name', 'Поле должно быть заполнено').exists(),
        check('surname', 'Поле должно быть заполнено').exists(),
        check('city', 'Поле должно быть заполнено').exists(),
        check('school', 'Поле должно быть заполнено').exists(),
        check('classNumber', 'Поле должно быть заполнено').exists(),
        check('classLetter', 'Поле должно быть заполнено').exists(),
        check('classProfile', 'Поле должно быть заполнено').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            const user = await User.findById(req.user.userId)

            if (!errors.isEmpty() || (!req.file && !user.avatarPath)) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Все поля должны быть заполнены'
                })
            }

            const {email, name, surname, city, school, classNumber, classLetter, classProfile} = req.body

            if(req.file) {
                await User.updateOne({_id: req.user.userId}, {
                    email,
                    name,
                    surname,
                    city,
                    school,
                    classNumber,
                    classLetter,
                    classProfile,
                    avatarPath: config.get('baseUrl') + "/" + req.file.path,
                })
            } else {
                await User.updateOne({_id: req.user.userId}, {
                    email,
                    name,
                    surname,
                    city,
                    school,
                    classNumber,
                    classLetter,
                    classProfile
                })
            }

            await Award.updateMany({owner: req.user.userId}, {
                ownerFullname: name + ' ' + surname,
                ownerCity: city,
                ownerClass: classNumber + ' ' + classLetter + ' (' + classProfile + ')'
            })

            res.status(201).json({ userId: req.user.userId })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)

router.post(
    '/login',
    [
        check('email', 'Введите корректный email').isEmail(),
        check('password', 'Введите пароль').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некорректный данные при входе в систему'
                })
            }

            const {email, password, rememberMe} = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Неверный пароль или email' })
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return res.status(400).json({ message: 'Неверный пароль или email' })
            }

            const token = jwt.sign(
                { userId: user.id },
                config.get('jwtSecret'),
                { expiresIn: rememberMe ? '30d' : '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
        }
    }
)


module.exports = router
