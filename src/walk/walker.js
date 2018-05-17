function getRandomIntInclusive(min, max) {
  // const minimum = Math.ceil(min);
  // const maximum = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getCheerfulness(doc) {
  const $cheerfulness = doc.getElementById('hru').innerHTML;
  return Number($cheerfulness.split(' ')[1].slice(0, -1));
}

function getDirectionById(id) {
  let direction;
  switch (id) {
    case 'd1':
      direction = 'north';
      break;
    case 'd3':
      direction = 'west';
      break;
    case 'd5':
      direction = 'east';
      break;
    case 'd7':
      direction = 'south';
      break;
  }
  return direction;
}

function getIdByDirection(direction) {
  let id;
  switch (direction) {
    case 'north':
      id = 'd1';
      break;
    case 'west':
      id = 'd3';
      break;
    case 'east':
      id = 'd5';
      break;
    case 'south':
      id = 'd7';
      break;
  }
  return id;
}

function directions(doc) {
  const availableDirections = [];
  for (let i = 1; i < 8; i += 2) {
    const $current = doc.getElementById(`d${i}`).childNodes[0];
    if ($current.title.length > 0) {
      const { id } = $current.parentElement;
      availableDirections.push(getDirectionById(id));
    }
  }
  console.log(availableDirections);
  return availableDirections;
}

function pick(doc) {
  const item = doc.getElementById('picks').querySelectorAll('tr td img')[0];
  if (item) {
    item.click();
    setTimeout(pick, getRandomIntInclusive(170, 280));
  }
}

function lookAround(doc) {
  const picks = doc.getElementById('picks').childNodes.length;
  if (picks > 0) pick(doc);
}

function randomWay(ways) {
  const random = getRandomIntInclusive(0, ways.length - 1);
  return ways[random];
}

function step(doc) {
  const ways = directions(doc);
  const id = getIdByDirection(randomWay(ways));
  doc.getElementById(id).childNodes[0].click();
}

function findCaptcha(doc) {
  const captcha = doc.getElementById('cod').style.display;
  return (captcha !== 'none');
}

function waitForStep(doc) {
  const field = doc.getElementById('title').getElementsByTagName('b')[0].textContent;
  console.log(field);
}

function walk(doc) {
  if (!findCaptcha(doc)) {
    const cheers = getCheerfulness(doc);
    if (cheers >= 5) {
      lookAround(doc);
      step(doc);
      const waitBeforeExecuting = getRandomIntInclusive(200, 1000);
      console.log(waitBeforeExecuting);
      waitForStep(doc);
      // setTimeout(walk(doc), waitBeforeExecuting);
    } else {
      const wait = (100 - cheers) * 1000;
      setTimeout(walk(doc), wait);
    }
  }
}

function walker() {
  const $location = document.getElementById('loc').contentWindow.document;
  const $noCombat = $location.getElementsByName('no_combat')[0].contentWindow.document;
  walk($noCombat);
}
walker();