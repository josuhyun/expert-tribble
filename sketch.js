let slider;
//시계
let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
//소리
let osc, playing, freq, amp;

function setup() {
  let cnv=createCanvas(400,400);
  noFill();
    colorMode(HSB);
 slider = createSlider(0, 255,100);
  slider.position(400 , 10);
 slider.style('width', '80px');
   stroke(255);
//시계
  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius ;

  cx = width / 2;
  cy = height / 2;
//소리
  cnv.mousePressed(playOscillator);
  osc = new p5.Oscillator('sine');
}

function draw() {
 //
  let val = slider.value();
   background(val, 100, 100, 1);
  // background(0);
  // background(255);
  let t = map(val, 0, 100, -3, 3);
  curveTightness(t);
  beginShape();
    curveVertex(10, 450);
 curveVertex(400, 200);//마지막 선
 // curveVertex(20,val);
  // curveVertex(val,200);
  curveVertex(0, 200);//첫번재 선
 curveVertex(200, 20);
 endShape();
  //<시계>
  // 시계 배경 그리기
  noStroke();
  fill(0, 0, 0);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(val, 100, 100, 1);
  ellipse(cx, cy, clockDiameter, clockDiameter);

  // sin()과 cos()의 각도는 3시 정각에서 시작;
  // HALF_PI를 뺄셈하여 상단에서부터 시작하도록 설정
  let s = map(second(), val, 60, 0, TWO_PI) + HALF_PI;
  let m = map(minute() + norm(second(), 0, val), 0, val, 0, TWO_PI) + HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, val, 0, TWO_PI * 2) + HALF_PI;

  // 시계침들 그리기
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // 분침 그리기
  strokeWeight(2);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += 6) {
    let angle = radians(a);
    let x = cx + cos(angle) * secondsRadius;
    let y = cy + sin(angle) * secondsRadius;
    vertex(x, y);
  }
  endShape();
  //소리
  freq = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
if (playing) {
    // smooth the transitions by 0.1 seconds
    osc.freq(freq, 0.1);
    osc.amp(amp, 0.1);
  }
}


function playOscillator() {
  // starting an oscillator on a user gesture will enable audio
  // in browsers that have a strict autoplay policy.
  // See also: userStartAudio();
  osc.start();
  playing = true;
}


  