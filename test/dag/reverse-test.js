const tape = require("tape"),
  fs = require("fs"),
  d3_dag = require("../../");

const square = JSON.parse(fs.readFileSync("test/data/square.json"))

tape("dagReverse() invariant is true for square", test => {
  const dag = d3_dag.dagStratify()(square);
  const copy = d3_dag.dagReverse(d3_dag.dagReverse(d3_dag.dagCopy(dag)));
  test.ok(d3_dag.dagEqual(dag, copy));
  test.end();
});

tape("dagReverse() inverse parent/child loading", test => {
  const strat = d3_dag.dagStratify()(square);
  const rhier = d3_dag.dagReverse(d3_dag.dagHierarchy()
    .children(d => d.parentIds.map(i => square[parseInt(i)]))
    (...square.filter(d => d.id === "3")));
  test.ok(d3_dag.dagEqual(strat, rhier));
  test.end();
});