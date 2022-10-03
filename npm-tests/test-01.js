//@ts-check
/**
 * run from root folder as : node ./npm-tests/test-01.js
 *
 * Using fs-extra write the following json (data) into a file (data.json)
 * Through the fastify server and with help from fs-extra read the json saved in "data.json" and print out the data.user in the html response as a list of names each being as <p>{name}</p>m ex : <p>John Doe</p><p>Lucita Esau</p>
 */

import fs from "fs-extra";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { fastify } from "fastify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = {
  error: false,
  users: [
    "John Doe",
    "Lucita Esau",
    "Thomas Friedman",
    "Norma Helms",
    "Amy Manning",
  ],
};

// write the json saving code here
const filePath = path.join(__dirname, "data.json");
fs.outputJSON(filePath, data, (err) => {
  if (err) return console.error(err);
  console.log("JSON written successfully with callbacks!");
});

const app = fastify({
  ignoreTrailingSlash: true,
  keepAliveTimeout: 65 * 1000,
});

app.get("/", async (request, reply) => {
  reply.header("Content-Type", "text/html; charset=utf-8");
  // read the json here and insert the list names into the html
  let users = [];
  await fs.readJSON(filePath, (err, data) => {
    if (err) return console.error(err);
    users = data.users;
    const page = `<html>
              <head>
                  <title>Wallethub Test</title>
              </head>
              <body>
                ${users.map((user) => `<p>${user}</p>`).join("")}
              </body>
          </html>`;

    reply.send(page);
  });
});

// server start
app.listen(8080, "0.0.0.0").then((address) => {
  console.log(`Server started at ${address}`);
});
