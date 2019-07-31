const {parser} = require("../dist/index")
const {fileTests} = require("lezer-generator/dist/test.js")

let fs = require("fs"), path = require("path")
let caseDir = __dirname

for (let file of fs.readdirSync(caseDir)) {
  if (!/\.txt$/.test(file)) continue
  let name = /^[^\.]*/.exec(file)[0]
  describe(name, () => {
    for (let {name, run} of fileTests(fs.readFileSync(path.join(caseDir, file), "utf8"), file))
      it(name, () => run(parser))
  })
}
