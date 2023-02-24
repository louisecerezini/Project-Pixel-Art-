window.onload = function () {
  carregarLocalStorage();
  generatePixel();

  const pixelBoard = JSON.parse(localStorage.getItem("pixelBoard")); 
  if (pixelBoard && pixelBoard.length){
    for (i=0; i<pixelBoard.length; i+=1){
      const element = document.getElementById(pixelBoard[i].id);
      element.style.backgroundColor = pixelBoard[i].bgColor;
  
    }
  }

};

function getColor() {
  const colors = ['red', 'yellow', 'green','brown','gray','purple','blue','pink'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function shuffleColors() {
  const colors = [];
  const color1= getColor();
  colors.push(color1);
  let color2=getColor();
  while(color1=== color2) {
    color2=getColor();
  }
  
  colors.push(color2);
  
  let color3 = getColor();
  while(color1 ===color3 || color2===color3){
    color3=getColor(); 
  }

  colors.push(color3);

  salvarLocalStorage(colors);

  document.getElementById('color-1').style.backgroundColor = "black"; 
  document.getElementById('color-2').style.backgroundColor = colors[0];
  document.getElementById('color-3').style.backgroundColor = colors[1];
  document.getElementById('color-4').style.backgroundColor = colors[2];
}


function salvarLocalStorage(colors) {
  localStorage.setItem('colorPalette', JSON.stringify(colors));
}

function carregarLocalStorage() {
  const colors = JSON.parse(localStorage.getItem('colorPalette')); //buscando informacao no localStorage
  if (colors) {
    document.getElementById('color-1').style.backgroundColor = 'black';
    document.getElementById('color-2').style.backgroundColor = colors[0];
    document.getElementById('color-3').style.backgroundColor = colors[1];
    document.getElementById('color-4').style.backgroundColor = colors[2];
  }else{
    shuffleColors(); 
  }
}

function generatePixel() {
  const pixelBoard = document.getElementById('pixel-board');
  for (let i = 0; i < 5; i += 1) {
    const rowId = `pixelRow${i}`;
    pixelBoard.innerHTML += `<div class='pixelRow' id='${rowId}'></div>`;
    for (let j = 0; j < 5; j += 1) {
      const pixelRow = document.getElementById(rowId);
      const pixelId = `pixel-${i}-${j}`;
      pixelRow.innerHTML += `<div class='pixel' id='${pixelId}' onclick="paint('${pixelId}')"></div>`;
    }
  }
}

function paint(elementId) {
  const selected = document.getElementsByClassName('selected')[0];
  const bgColor = selected.style.backgroundColor;

  const pixelElement = document.getElementById(elementId);
  pixelElement.style.backgroundColor = bgColor;

  let pixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
  if (!(pixelBoard && pixelBoard.length) ){
    pixelBoard = [];
    pixelBoard.push({
      id: elementId,
      bgColor: bgColor,
    });
    localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
    return;
  } else {
    let elementFromBoard = pixelBoard.find((p) => p.id === elementId);
    if (elementFromBoard) {
      elementFromBoard.bgColor = bgColor;
    } else {
      pixelBoard.push({
        id: elementId,
        bgColor: bgColor,
      });
    }
    localStorage.setItem('pixelBoard', JSON.stringify(pixelBoard));
  }
}

function selectElement(elementId) {
  const colorPalette = document.getElementById('color-palette');
  for (i = 0; i < colorPalette.children.length; i += 1) {
    const node = colorPalette.children[i];
    node.classList.remove('selected');
  }
  const element = document.getElementById(elementId);
  element.classList.add('selected');
}

function clearColors() {
  const pixelElementsArray = document.getElementsByClassName('pixel');
  for (i = 0; i < pixelElementsArray.length; i += 1) {
    pixelElementsArray[i].style.backgroundColor = 'white';
  }
  localStorage.setItem('pixelBoard', JSON.stringify([]));
}
