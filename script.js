let digits = [];
let numDigs = 0;
let starting = true;

let STYLES = {
  selectedFont: 'Barlow',
  selectedColor: 'rgb(0,0,0)',
  selectedOpacity: '100%',

  'hasChanged': () => {
    const c = $('#_0')[0].children[0].style;
    return (c.fontFamily !== STYLES.selectedFont || `${c.opacity * 100}%` !== STYLES.selectedOpacity || c.color !== STYLES.selectedColor)
  },

  'testfont': (f) => {
    STYLES.selectedFont = f;
    $('#test')[0].style.fontFamily = STYLES.selectedFont;
  },

  'testcolor': (c) => {
    STYLES.selectedColor = c;
    $('#test')[0].style.color = STYLES.selectedColor;
  },

  'testopacity': (o) => {
    STYLES.selectedOpacity = o;
    $('#test')[0].style.opacity = STYLES.selectedOpacity;
  }
}

// on load, add all 25 backgrounds
$(() => {
  for (let i = 0; i < 25; i++) {
    const img = document.createElement('img');
    img.setAttribute('class', 'thumb');
    img.setAttribute('onclick', 'background(this.src)');
    img.setAttribute('src', `backgrounds/${i}.jpg`);

    $('#pics').append(img);
  }
})

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
    // add background colors to dropdown menu
    const tabs = $('#colors')[0].children;
    for (tab of tabs) { tab.style.backgroundColor = tab.value; }
    // show instruction modal
    $('.overlay3').css('visibility', 'visible');
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
    if (digits.join('') !== temp.join('') || $('#_0')[0].children.length > 1 || STYLES.hasChanged()) {
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

// make and return a text element with a digit
makeDigit = (d) => {
  const l = document.createElement('text');
  l.setAttribute('class', 'letter');
  l.style.width = String(100 / nums) + '%';
  l.style.height = 'calc(100% - 165px)';
  l.style.display = 'flex';
  l.style.justifyContent = 'center';
  l.style.alignItems = 'center';
  l.style.position = 'fixed';
  l.style.top = '65px';
  l.style.fontFamily = STYLES.selectedFont;
  l.style.color = STYLES.selectedColor;
  l.style.opacity = STYLES.selectedOpacity;
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
  // hide instruction modal
  $('.overlay3').css('visibility', 'hidden');
  // and set tester text
  $('#test')[0].innerText = digits.join('');
  // display digits!
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
  $('#enthead')[0].innerText = 'Edit digits.';
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
    src = window.URL.createObjectURL(file.files[0]);
  }

  const img = document.createElement('img');
  img.setAttribute('src', src);
  $('.backgrounds').prepend(img);

  bgs++;
  $('.backgrounds img').css('opacity', String(100 / bgs) + '%');
}
