const key = 'pk.eyJ1IjoiYXR0aWN1cy1tIiwiYSI6ImNrbTB0MHZ3NDBwNTcyb3FzbjZ4MDh6ajEifQ.ZGkGB4NTu0dN2YR2X4BGag';

const options = {
  lat: 39.3292,
  lng: -82.1013,
  zoom: 11,
  style:'mapbox://styles/atticus-m/ckm2gxi7ean7317opnz4hqe5f',
  pitch: 0,
};

const mappa = new Mappa('MapboxGL', key);

let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);

  parks = loadTable('parks.csv', 'csv', 'header');
  
  img = createImg('https://www.usnews.com/dims4/USNEWS/bb996bf/17177859217/thumbnail/256x256/quality/85/?url=https%3A%2F%2Fmedia.beam.usnews.com%2F8d%2F8f3c53319d560b2f4139af68c9a77c%2Fcollege-photo_28775.jpg');
  
  img.hide();
  


}

// The draw loop is fully functional but we are not using it for now.
function draw() {
  clear();
  
  //noFill();
  
  stroke(0);
  
  strokeWeight(3);
  
  const zoom = myMap.zoom();
  
  const athens = myMap.latLngToPixel(39.3292,-82.1013);
 
  ellipse(athens.x,athens.y,10 * zoom,10 * zoom);
  
  if(dist(athens.x,athens.y,mouseX,mouseY)< (zoom * 10)/2){

    
    textSize(32);
    
    noFill();
    
    text("this is Athens", athens.x, athens.y);
  
    image(img, athens.x, athens.y, 200, 200);
    
    fill(0,100); 
  }else{
    
    fill(255,100);
  }
  
  for(let i = 0; i < parks.getRowCount();i++){
    
    const latitude = Number(parks.getString(i, 'Latitude'));
    
    const longitude = Number(parks.getString(i, 'Longitude'));
    
    const pos = myMap.latLngToPixel(latitude, longitude);
    
    let place = parks.getString(i, 'Park Name');
    
    var size = parks.getString(i, 'Acres');
    
    size = map(size, 5000, 9000000, 1, 50) + myMap.zoom();
    
    ellipse(pos.x, pos.y, size, size);
    
    if (dist(pos.x, pos.y, mouseX, mouseY) < size){
      textSize(32);
      text(place, pos.x, pos.y);
    }
  }
  
  print(zoom);

}





$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


