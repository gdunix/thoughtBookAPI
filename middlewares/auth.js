import * as utils from '../utils';

export default (req, res, next) => {
    try {
        const bearerHeader = req.headers['authorization'];
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            utils.verifyToken(bearerToken, err => {
                if (err) {
                    return res.status(403).json({ message: 'Invalid token' });
                }
            });
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}