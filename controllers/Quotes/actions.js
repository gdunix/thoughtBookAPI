import Quote from '../../models/quoteModel';

const updateQuote = async (_id, text) => {
    try {
        const quote = await Quote.findOne({ _id });
        if (quote) {
            quote.text = text
            await quote.save();
            return { status: 200, data: quote };
        } else {
            return { status: 404, message: 'Quote not found' };
        }
    } catch (err) {
        return { status: 500, message: 'Error occured' };
    }
};

const addQuote = async (text) => {
    try {
        let quote = new Quote();
        quote.text = text;
        await quote.save();
        return { status: 200, data: quote };
    } catch (err) {
        return { status: 500, message: 'Error occured' };
    }
};

export default {
    addQuote,
    updateQuote
}