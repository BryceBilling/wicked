const html2canvas = require("html2canvas");

function printDiv() {
  html2canvas(document.querySelector("#main")).then((canvas) => {
    document.body.appendChild(canvas);
    var canvasImg = canvas.toDataURL("image/jpg");
    downloadURI(canvasImg, "THF Report.png");
  });
}

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

el("print-btn").addEventListener("click", function () {
  printDiv();
});
