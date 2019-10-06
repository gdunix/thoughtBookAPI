export const sendResponse = (res, result) =>
    (result.status === 200) ? 
        res.json(result.data) : 
        res.status(result.status).send(result.message);