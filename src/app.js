import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { appActions } from './actions';

// initialize app
const app = express();
app.use(bodyParser.json());

// serve static frontend
const publicPath = path.join(__dirname, '../public/');
app.use(express.static(publicPath));

// Add dispatcher
app.post('/api/dispatch', async (req, res, next) => {
	const { action: actionName, payload } = req.body;
	console.log(req.body);
	try {
		const dispatch = (action, payload) => {
			return appActions[action]({ req, res, next, dispatch }, payload);
		};
		const responseBody = await dispatch(actionName, payload);
		res.json(responseBody);
	} catch (error) {
		console.error(error);
		const statusCode = error.status || 400;
		res.status(statusCode).send({
			error: error
		});
	}
});

// Run server
const port = process.env.PORT || 8080;
app.listen(port, _ => console.log(`Listening on port ${port}`));
