let digits = [];
let numDigs = 0;
let starting = true;
let selectedFont = 'Times';
let selectedColor = '#000000';
let selectedOpacity = '100%';

go = () => {
  // first time?
  if (starting) {
    // get all inputted digits
    const children = $('#digits')[0].children;
    // and count them up
    for (child of children) {
      digits.push(child.value);
      numDigs++;
    }
    // display them!
    id(digits);
    // and set tester text
    $('#test')[0].innerText = digits.join('');
  }
  // if editing
  else {
    let temp = [];
    let tempLen = 0;
    // consider new digits?
    const children = $('#digits')[0].children;
    for (child of children) {
      temp.push(child.value);
      tempLen++;
    }
    // if digits have been edited
    if (digits.join('') !== temp.join('') || $('#_0')[0].children.length > 1 || $('#_0')[0].children[0].style.fontFamily !== selectedFont) {
      // remove divs
      for (let i = 0; i < numDigs; i++) {
        $(`#_${i}`).remove();
      }
      numDigs = tempLen;
      digits = temp;
      // update digits!
      id(digits);
      // and tester text
      $('#test')[0].innerText = temp.join('');
      // if backgrounds
      if ($('.backgrounds')[0].childElementCount > 0) {
        // remove them and refresh div
        $('.backgrounds').remove();
        bgs = 0;
        const div = document.createElement('div');
        div.setAttribute('class', 'backgrounds');
        document.body.prepend(div);
      }
    }
  }
  // close window
  cancel();
}

// update font of tester text
testfont = (f) => {
  selectedFont = f;
  $('#test')[0].style.fontFamily = selectedFont;
}

// update color of tester text
testcolor = (c) => {
  selectedColor = c;
  $('#test')[0].style.color = selectedColor;
}

testopacity = (o) => {
  selectedOpacity = o;
  $('#test')[0].style.opacity = selectedOpacity;
}

// make and return a text element with a digit
makeDigit = (d) => {
  const l = document.createElement('text');
  l.setAttribute('class', 'letter');
  l.style.width = String(100 / nums) + '%';
  l.style.height = 'calc(100% - 100px)';
  l.style.display = 'flex';
  l.style.justifyContent = 'center';
  l.style.alignItems = 'center';
  l.style.position = 'fixed';
  l.style.top = '50px';
  l.style.fontFamily = selectedFont;
  l.style.color = selectedColor;
  l.style.opacity = selectedOpacity;
  l.innerText = d;
  return l;
}

// add a layer with chosen style
addText = () => {
  const dig = $('#test')[0].innerText.split('');
  for (let i = 0; i < numDigs; i++) { $(`#_${i}`).append(makeDigit(dig[i])); }
}

// initial text display
id = (digits) => {
  // create a div for each digit
  for (let i = 0; i < numDigs; i++) {
    const div = document.createElement('div');
    div.setAttribute('id', `_${i}`);
    div.style.width = String(100 / nums) + '%';
    div.style.height = '100%';

    makeDigit(digits[i])
    div.appendChild(makeDigit(digits[i]));

    $('.letters')[0].appendChild(div);
  }
}

// close window and GO!
gogogo = () => {
  $('.overlay3').css('visibility', 'hidden');
  id(digits);
}

// close window and hide button div
cancel = () => {
  $('.overlay2').css('visibility', 'hidden');
  $('#cancel')[0].style.visibility = 'hidden';
}

// number of digits inputted
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

let bgs = 0;

background = (src = null) => {
  if (src === null) {
    const file = $('#custombg')[0];
    const fileName = file.files[0].name;
    const ext = fileName.slice(-4);
    // if (ext !== '.jpg' && ext !== '.png') { alert('Please upload a .jpg or .png'); }
    src = window.URL.createObjectURL(file.files[0]);
  }

  const img = document.createElement('img');
  img.setAttribute('src', src);
  $('.backgrounds').prepend(img);

  bgs++;
  $('.backgrounds img').css('opacity', String(100 / bgs) + '%');
}
