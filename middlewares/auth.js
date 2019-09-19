import * as utils from '../utils';

export default (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            console.log(bearerHeader)
            const v = utils.verifyToken(bearerToken, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
                console.log(user)
            });
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}