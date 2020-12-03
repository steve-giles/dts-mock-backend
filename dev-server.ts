/**
 * Mock backend server for testing assignments.
 */
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import {templates} from "./sample-data/templates";

const port = 8080;

const app = express();

function latency(
  _req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  setTimeout(() => next(), Math.random() * 1500);
}

app.use(latency);
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.post('/template', (req, res) => {
    const request = req.body;

    if (request.templateKey === 'badname') {
        res.sendStatus(400);
        return;
    }

    const response = {
        templateId: '123456'
    }
    res.json(response);
});

/**
 * Get a template
 */
app.get('/template/:docType/:templateKey', (req, res) => {
    if (req.params.templateKey === 'bad') {
        res.send(null);
        res.sendStatus(404);
        return;
    }

    res.sendFile('/dev/HomeCEU/mock-backend/sample-data/template.html');
});

/**
 * Render a certificate
 */
app.get('/render/:docType/:templateKey/:dataKey', (req, res) => {
    console.log(req);

    res.sendFile('/dev/HomeCEU/mock-backend/sample-data/certificate.html');
});

/**
 * Get templates
 *
 */
app.get('/template', (req, res) => {

    console.log(req.query);
    // let result = templates;
    //
    // const query = req.query;

    // if (query && query.hasOwnProperty('filter')) {
    //
    //     const filter = query.filter;
    //     if (filter && filter.hasOwnProperty('type')) {
    //         const type = JSON.parse(JSON.stringify(filter)).type;
    //         result.items = result.items.filter(template => template.docType === type);
    //     }
    //     else if (filter && filter.hasOwnProperty('filter')) {
    //
    //     }
    //     else if (filter && filter.hasOwnProperty('filter')) {
    //
    //     }
    // }
  res.json(templates);
});

app.listen(port, () => console.log(`Dev Server listening on port ${port}!`));
