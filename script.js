let digits = [];
let starting = true;
let selectedFont = 'Times';
let selectedColor = '#000000';

go = () => {
  if (!starting) {
    let temp = [];
    const children = $('#digits')[0].children;
    for (child of children) { temp.push(child.value); }
    if (digits.join('') !== temp.join('')) {
      id(temp);
      $('#test')[0].innerText = temp.join('');
      if ($('.backgrounds')[0].childElementCount > 0) {
        $('.backgrounds').remove();
        bgs = 0;
        const div = document.createElement('div');
        div.setAttribute('class', 'backgrounds');
        document.body.prepend(div);
      }
    }
  }
  else {
    const children = $('#digits')[0].children;
    for (child of children) { digits.push(child.value); }
    id(digits);
    $('#test')[0].innerText = digits.join('');
  }
  cancel();
}

testfont = (f) => {
  selectedFont = f;
  $('#test')[0].style.fontFamily = selectedFont;
}

testcolor = (c) => {
  selectedColor = c;
  $('#test')[0].style.color = selectedColor;
}

addText = () => {
  const dig = $('#test')[0].innerText.split('');

  const div = document.createElement('div');
  div.setAttribute('class', 'letters');
  div.style.width = '100%';
  div.style.height = '100%';
  div.style.display = 'flex';
  div.style.textAlign = 'center';
  div.style.alignItems = 'center';
  div.style.position = 'absolute';

  for (let i = 0; i < dig.length; i++) {
    const l = document.createElement('text');
    l.setAttribute('class', 'letter');
    l.setAttribute('id', `_${i}`)
    l.style.width = String(100 / nums) + '%';
    l.style.fontFamily = selectedFont;
    l.style.color = selectedColor;
    l.innerText = dig[i];
    div.appendChild(l);
  }
  $('#letterbox').append(div);
}

gogogo = () => {
  $('.overlay3').css('visibility', 'hidden');
  id(digits);
}

cancel = () => {
  $('.overlay2').css('visibility', 'hidden');
  $('#cancel')[0].style.visibility = 'hidden';
}

let nums = 1;

pm = (x) => {
  const n = $('#digits')[0].childElementCount;
  if (x === 'p' && n < 5) {
    const inp = document.createElement('input');
    inp.setAttribute('type', 'number');
    inp.setAttribute('min', 0);
    inp.setAttribute('max', 9);
    inp.setAttribute('value', 0);
    $('#digits')[0].appendChild(inp);
    nums++;
  }
  else if (x === 'm' && n > 1) {
    $('#digits')[0].lastChild.remove();
    nums--;
  }
}

edit = (x) => {
  $('.overlay2').css('visibility', 'visible');
  $('#enthead')[0].innerText = 'Edit digits below.';
  $('#sub')[0].value = 'Update Digits';
  if (starting) {
    $('#editme')[0].remove();
    $('#cancel')[0].innerHTML += ('<br>');
    $('#cancel')[0].insertAdjacentHTML('beforebegin', '<br>');
    $('#cancel')[0].style.visibility = 'visible';
  }
  else { $('#cancel')[0].style.visibility = 'visible'; }
  if (x) { starting = false; }
}

settings = () => $('.overlay4').css('visibility', 'visible')

unhide = () => {
  if ($('p text').css('color') === 'rgb(38, 38, 38)') {
    $('p text').css('color', '#FFFAF0');
    $('#unhide')[0].value = 'Show hidden letters';
  }
  else {
    $('p text').css('color', '#262626');
    $('#unhide')[0].value = 'Hide letters';
  }
}

id = (digits) => {
  $('.letter').remove();

  for (let i = 0; i < digits.length; i++) {
    const l = document.createElement('text');
    l.setAttribute('class', 'letter');
    l.setAttribute('id', `_${i}`)
    l.style.width = String(100 / nums) + '%';
    l.style.fontFamily = selectedFont;
    l.style.color = selectedColor;
    l.innerText = digits[i];
    $('.letters')[0].appendChild(l);
  }
}

let bgs = 0;

background = (src = null) => {
  if (src === null) {
    const file = $('#custombg')[0];
    const fileName = file.files[0].name;
    const ext = fileName.slice(-4);
    if (ext !== '.jpg' && ext !== '.png') { alert('Please upload a .jpg or .png'); }
    src = window.URL.createObjectURL(file.files[0]);
  }

  const img = document.createElement('img');
  img.setAttribute('src', src);
  $('.backgrounds').prepend(img);

  bgs++;
  $('.backgrounds img').css('opacity', String(100 / bgs) + '%');
}
