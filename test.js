const { Document } = require("./");

const document = new Document({
    provider: "microsoft"
});

console.log(document.toSSML(true));