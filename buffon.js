const svg = document.getElementById("svg_grid");

const lineWidth = 100;
const needleLength = 100;

let numCrossed = 0;
let numTotal = 0;

function createTable(tableData) {
  var table =document.getElementById("table_results")
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
}

function deleteTable(){
  var table = document.getElementById("table_results");
  var tableBody = table.childNodes;
  if (tableBody.length > 0)
    table.removeChild(tableBody[0]);
}

function runSimulation(){
  const numSimulations = document.getElementById("num_simulations").value;
  const maxWidth =  document.getElementById("svg_div").offsetWidth;
  const maxHeight = document.getElementById("svg_div").offsetHeight;

  for (let i = 0; i < numSimulations; i++){
    // Randomly select a point for center of needle and angle
    let randX = Math.random() * (maxWidth - needleLength) + needleLength / 2;
    let randY = Math.random() * (maxHeight - needleLength) + needleLength / 2;
    let randAngle = Math.PI * (Math.random() - 0.5);

    const x1 = randX + Math.cos(randAngle + Math.PI) * needleLength / 2;
    const y1 = randY + Math.sin(randAngle + Math.PI) * needleLength / 2;

    const x2 = randX + Math.cos(randAngle) * needleLength / 2;
    const y2 = randY + Math.sin(randAngle) * needleLength / 2;

    if (Math.ceil(x1 / lineWidth) < x2 / lineWidth)
      numCrossed++;

    numTotal++;

    let needle = document.createElementNS("http://www.w3.org/2000/svg",'line');
  	needle.setAttribute('x1',x1);
  	needle.setAttribute('x2',x2);
  	needle.setAttribute('y1',y1);
    needle.setAttribute('y2',y2);
    needle.setAttribute('stroke-width',2);
    needle.setAttribute('stroke','black');
  	svg.appendChild(needle);
  }

  const probCrossing = numCrossed / numTotal;
  const estimatedPi = 2 * needleLength / (lineWidth * probCrossing);

  var results = [
    ["Number of Lines Crossed", numCrossed],
    ["Total Number of Needles", numTotal],
    ["Estimate for Pi", estimatedPi.toFixed(15)]
  ];
  deleteTable();
  createTable(results);
}
