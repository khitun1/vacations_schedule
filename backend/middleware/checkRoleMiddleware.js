const jwt = require('jsonwebtoken');

module.exports = () => {
    return (req, res, next) => {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.authorization.split(' ')[1];
            if(!token) {
                return res.status(401).send("Пользователь не авторизован");
            }
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            if (decoded.is_admin !== true) {
                return res.status(403).send("Нет доступа");
            }
            req.user = decoded;
            next();
        } catch (e) {
            return res.status(401).send("Пользователь не авторизован");
        }
    }
}