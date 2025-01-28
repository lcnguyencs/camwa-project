import jwt from 'jsonwebtoken';
//for creating a test token
const testTokenController = {
    getTestToken: (req, res) => {
        const { id, role} = req.body;
        const token = jwt.sign(
            { id, role },
            '1234',
            { expiresIn: '7d' }
        );
        res.json({ token });
    }
};

export default testTokenController;
