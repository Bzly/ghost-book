/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable max-len */

const ghostConditions = {
  'Banshee': ['EMF Level 5', 'Fingerprints', 'Freezing Temperatures'],
  'Demon': ['Spirit Box', 'Ghost Writing', 'Freezing Temperatures'],
  'Jinn': ['Spirit Box', 'Ghost Orb', 'EMF Level 5'],
  'Mare': ['Spirit Box', 'Ghost Orb', 'Freezing Temperatures'],
  'Oni': ['EMF Level 5', 'Spirit Box', 'Ghost Writing'],
  'Phantom': ['EMF Level 5', 'Ghost Orb', 'Freezing Temperatures'],
  'Poltergeist': ['Spirit Box', 'Fingerprints', 'Ghost Orb'],
  'Revenant': ['EMF Level 5', 'Fingerprints', 'Ghost Writing'],
  'Shade': ['EMF Level 5', 'Ghost Orb', 'Ghost Writing'],
  'Spirit': ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
  'Wraith': ['Fingerprints', 'Freezing Temperatures', 'Spirit Box'],
  'Yurei': ['Ghost Orb', 'Ghost Writing', 'Freezing Temperatures'],
};

const possibleEvidence = [
  'Freezing Temperatures',
  'EMF Level 5',
  'Spirit Box',
  'Ghost Orb',
  'Fingerprints',
  'Ghost Writing',
];

const ghostInformation = {
  'Banshee': {
    'description': 'Banshees are a natural hunter and will attack anything. They will stalk prey one at a time until going for the kill.',
    'strength': 'Banshees will only target one person at a time.',
    'weakness': 'Banshees fear the Crucifix and will be less aggressive when near one.',
  },
  'Demon': {
    'description': 'Demons are one of the worst ghosts you can encounter; they can attack without reason.',
    'strength': 'Demons will attack more often then any other ghost.',
    'weakness': 'Asking a Demon successful questions on a Ouija board won’t lower the users sanity.',
  },
  'Jinn': {
    'description': 'Jinn are territorial ghosts that will attack when threatened. They can travel at significant speed.',
    'strength': 'Jinn will travel at a faster speed if their victim is far away.',
    'weakness': 'Turning off the location\'s power source will prevent Jinn from using their ability',
  },
  'Mare': {
    'description': 'Mares are the source of all nightmares, making them most powerful in the dark.',
    'strength': 'Mares will have an increased chance to attack in the dark.',
    'weakness': 'Turning the lights on around Mares will lower their chance to attack.',
  },
  'Oni': {
    'description': 'Oni are a cousin to the Demon and possess the extreme strength. They become more active around their prey.',
    'strength': 'Oni are more active when people are nearby and have been seen moving objects at great speed.',
    'weakness': 'Being more active will make Oni easier to find and identify.',
  },
  'Phantom': {
    'description': 'Phantoms are ghosts that can possess the living, most commonly summoned by a Ouija board. They can induce fear into those around them.',
    'strength': 'Looking at Phantoms will considerably drop your sanity.',
    'weakness': 'Taking a photo of Phantoms will make them temporarily disappear (if not hunting).',
  },
  'Poltergeist': {
    'description': 'Poltergeists — also known as noisy ghosts — can manipulate objects around them to spread fear into their prey.',
    'strength': 'Poltergeists can throw lots of objects at once.',
    'weakness': 'Poltergeists are almost ineffective in an empty room.',
  },
  'Revenant': {
    'description': 'Revenants are slow but violent ghosts that attack indiscriminately. They travel at a high speed when hunting.',
    'strength': 'Revenants will travel significantly faster when hunting a victim.',
    'weakness': 'Hiding from Revenants will cause them to move very slowly.',
  },
  'Shade': {
    'description': 'Shades are known to be shy ghosts. They will stop all paranormal activity if there are multiple people nearby.',
    'strength': 'Being shy means the ghost will be harder to find',
    'weakness': 'Shades will not enter hunting mode if there are multiple people nearby.',
  },
  'Spirit': {
    'description': 'Spirits are the most common ghost; however they are still very dangerous. Usually discovered after an unexplained death.',
    'strength': 'Spirits have no special strength.',
    'weakness': 'Using smudge sticks on Spirits will stop them attacking for a long period of time.',
  },
  'Wraith': {
    'description': 'Wraiths are one of the most dangerous ghosts. They are the only ghost-type that has the ability of flight, and can travel through walls.',
    'strength': 'Wraiths almost never touch the ground meaning it can’t be tracked by footsteps.',
    'weakness': 'Wraiths have a toxic reaction to salt.',
  },
  'Yurei': {
    'description': 'Yurei have usually returned to the physical world for the purpose of revenge or hatred.',
    'strength': 'Yurei have been known to have a stronger effect on sanity.',
    'weakness': 'Smudging the room of a Yurei will cause it to not wander around the location for a long time.',
  },
};

const input = window.document.createElement('div');
input.setAttribute('class', 'inputs');
document.body.getElementsByClassName('helptext')[0].before(input);

const results = window.document.createElement('div');
results.setAttribute('class', 'results');
document.body.appendChild(results);

let evidence = [];
let ruledOut = [];

function ghosties(evidence, ruledOut) {
  const possibleGhosts = [];
  for (const ghost in ghostConditions) {
    if (Object.prototype.hasOwnProperty.call(ghostConditions, ghost)) {
      let i = 0;

      ghostConditions[ghost].forEach((condition) => {
        i = i + evidence.includes(condition);
        i = i - ruledOut.includes(condition);
        // console.log([ghost, condition, evidence.includes(condition)])
      });

      if (i === evidence.length) {
        possibleGhosts.push(ghost);
      }
    }
  }
  return possibleGhosts;
}

function deleteFromArray(value, array) {
  const idx = array.indexOf(value);
  idx != -1 && array.splice(idx, 1);
}

function inputOnclickFactory(buttonName) {
  return (event) => {
    /*
    Mutate `evidence` and `ruledOut` based on info from this event and which button was clicked
    And then trigger a redraw of the UI.
    */
    console.log(event, buttonName);
    event.preventDefault();
    event.stopImmediatePropagation();

    // mutate evidence and ruledOut

    if (event.which == 1) {
      if (!evidence.includes(buttonName)) {
        evidence.push(buttonName);
      } else {
        deleteFromArray(buttonName, evidence);
      }
      deleteFromArray(buttonName, ruledOut);
    } else if (event.which == 3) {
      if (!ruledOut.includes(buttonName)) {
        ruledOut.push(buttonName);
      } else {
        deleteFromArray(buttonName, ruledOut);
      }
      deleteFromArray(buttonName, evidence);
    }

    // redraw UI
    writeHTML(renderOutput(evidence, ruledOut), results);
    mount(renderInput(possibleEvidence, evidence, ruledOut), input);

    return false;
  };
}

function string2element(s) {
  parent = document.createElement('div');
  parent.innerHTML = s;
  return parent.firstElementChild;
}

function renderInput(possibleEvidence, evidence, ruledOut) {
  frag = document.createDocumentFragment();

  possibleEvidence.forEach((poss) => {
    let status = '';
    if (evidence.includes(poss)) {
      status = 'found';
    } else if (ruledOut.includes(poss)) {
      status = 'ruledOut';
    };

    const div = string2element(`
      <div class="input ${status}">
        <img class="input_icon" src="img/${poss}.svg"></img>
        <label class="input_label">${poss}</label>
      </div>
    `);
    const f = inputOnclickFactory(poss);
    div.onclick = f;
    div.oncontextmenu = f;
    frag.appendChild(div);
  });
  return frag;
}

function renderOutput(evidence, ruledOut) {
  return ghosties(evidence, ruledOut).map((name) => {
    const gi = ghostInformation[name];
    const gc = ghostConditions[name];
    let er = gc.filter((n) => !evidence.includes(n)).join(', ');

    if (er.length === 0) {
      er = 'You got it!';
    }

    return `
    <div class=ghost>
      <h2>${name}</h2>
      <p class="ghost_evidence">Evidence: ${er}</p>
      <p class="ghost_description">${gi.description}</p>
      <p class="ghost_strength">${gi.strength}</p>
      <p class="ghost_weakness">${gi.weakness}</p>
    </div>`;
  }).join('');
}

function writeHTML(output, element) {
  element.innerHTML = output;
}

function mount(frag, mountpoint) {
  mountpoint.innerHTML = '';
  mountpoint.appendChild(frag);
}

writeHTML(renderOutput(evidence, ruledOut), results);
mount(renderInput(possibleEvidence, evidence, ruledOut), input);
