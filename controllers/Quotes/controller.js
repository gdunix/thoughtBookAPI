
import actions from './actions';
import { sendResponse } from '../utils';

export const update_quote = async (req, res) => {
    const _id = req.params.quoteId;
    if (_id) {
      const result = await actions.updateQuote(_id, req.body.text);

      return sendResponse(res, result);
    } else {
      return res.status(500).send('No id provided');
    }
  };
