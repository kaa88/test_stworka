const arr = [
  [1665, 0],
  [947, 90],
  [557, 0],
  [1300, 90],
  [2225, 180],
  [2239, 270],
];

const convertLength = (length = 0) => length / 10;
const round = (num = 0) => Math.round(num * 100) / 100;

const getPointCoords = (prevX = 0, prevY = 0, length = 0, angle = 0) => {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * length + prevX;
  const y = Math.sin(rad) * length + prevY;
  return [round(x), round(y)];
};

const points = [[0, 0]]; // first coord already set
arr.forEach((item) => {
  points.push(
    getPointCoords(
      points[points.length - 1][0],
      points[points.length - 1][1],
      convertLength(item[0]),
      item[1]
    )
  );
});

////// demo print
const getCssCoords = (points = []) => {
  return points
    .map((point) =>
      point.map((coord) => (coord ? coord + "px" : "0")).join(" ")
    )
    .join(", ");
};
const getStringCoords = (points = []) => [].concat(...points).join(" ");

const newP = document.createElement("p");
newP.innerText = getStringCoords(points);
document.body.appendChild(newP);

const newField = document.createElement("div");
newField.style.background = "orange";
newField.style.width = "300px";
newField.style.height = "300px";
newField.style.clipPath = `polygon(${getCssCoords(points)})`;
document.body.appendChild(newField);
