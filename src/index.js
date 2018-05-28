import './foundation.js';
import './foundation.css';

const plus = require('./img/plus.svg');
const vkModule = require('./js/vk');
const filter = require('./js/filter');
const friendTemplate = require('./friend-template.hbs');

const initialZone = document.querySelector('#initial-zone');
const filteredZone = document.querySelector('#filtered-zone');
const initialList = document.querySelector('#initial-list');
const filteredList = document.querySelector('#filtered-list');
const zoneWrapper = document.querySelector('#zone-wrapper');
const saveButton = document.querySelector('#save-button');
const initialInput = document.querySelector('#initial-input');
const filteredInput = document.querySelector('#filtered-input');
const hiddenItemClass = 'c-friends__item_hidden';

let vkFriends;
let friends;
let filteredFriends;
let currentDrag;

filter.load();

(async() => {
    try {
        const getVkFriends = await vkModule.friends();

        vkFriends = getVkFriends.items;

        renderLists();

        zoneWrapper.addEventListener('click', moveHandler);
        saveButton.addEventListener('click', saveHandler);

        filteredInput.addEventListener('keyup', refreshList);
        initialInput.addEventListener('keyup', refreshList);

    }
    catch (e) {
        console.error(e);
    }
})();

function moveHandler(e) {
    e.preventDefault();
    const target = e.target;

    if (!target.classList.contains('c-friends__button')) {
        return;
    }

    const zone = target.closest('.c-friends-zone');

    if (!zone) {
        return;
    }
    if (zone === initialZone) {
        moveFriend(target, 'initial');
    } else if (zone === filteredZone) {
        moveFriend(target, 'filtered');
    }
}

function saveHandler(e) {
    localStorage.filteredUsers = JSON.stringify(filter.ids());
    console.dir(filter.ids);
    console.dir(localStorage.filteredUsers);
}

function moveFriend(link, from) {
    const node = link.closest('[data-user]');
    filter.move(node.dataset.user, from);
    if (from === 'initial') {
        filteredList.appendChild(node);
    } else {
        initialList.appendChild(node);
    }
    //renderLists();
}

function renderLists() {
    let html = friendTemplate({
        friends: vkFriends.filter(filter.isInitial),
        plus: plus,
    });

    initialList.innerHTML = html;

    html = friendTemplate({
        friends: vkFriends.filter(filter.isFiltered),
        plus: plus,
    });

    filteredList.innerHTML = html;
}


function refreshList(e) {
    const target = e.target;
    let list = null;

    if (target === initialInput) {
        list = initialList;
    } else if (target === filteredInput) {
        list = filteredList;
    } else {
        return;
    }

    const chunk = target.value;
    const children = [...list.children];

    children.forEach(item => {
        const userId = item.dataset.user;
        const user = vkFriends.find(u => u.id == userId);

        if (filter.isMatching(user, chunk) || chunk === '') {
            item.classList.remove(hiddenItemClass);
        } else {
            item.classList.add(hiddenItemClass);
        }
    });
}

document.addEventListener('dragstart', (e) => {
    const node = e.target;
    if (!node.classList.contains('c-friends__item')) {
        return;
    }
    const zone = getCurrentZone(node);

    if (zone) {
        currentDrag = {startZone: zone, node: node};
    }
});

document.addEventListener('dragover', (e) => {
    e.preventDefault();
});

document.addEventListener('drop', (e) => {
    if (!currentDrag) {
        return;
    }
    e.preventDefault();

    const zone = getCurrentZone(e.target);

    if (!zone || currentDrag.startZone === zone) {
        return;
    }
    const subElement = currentDrag.node.firstElementChild;

    if (currentDrag.startZone === initialList) {
        moveFriend(subElement, 'initial');
    } else if (currentDrag.startZone === filteredList) {
        moveFriend(subElement, 'filtered');
    }
    currentDrag = null;
});


const getCurrentZone = node =>
    node.closest('.c-friends__list');

// let counter = 0;
// let currentDrag;
// let slot = createSlot();
//
// document.addEventListener('click', e = > {
//     if (e.target.classList.contains('new-item')
// )
// {
//     const newItem = createItem();
//     const zone = getCurrentZone(e.target);
//
//     zone.insertBefore(newItem, zone.lastElementChild)
// }
// })
// ;
//
// document.addEventListener('dragstart', (e) = > {
//     const zone = getCurrentZone(e.target);
//
// if (zone) {
//     currentDrag = {startZone: zone, node: e.target};
// }
// })
// ;
//
// document.addEventListener('dragover', (e) = > {
//     const zone = getCurrentZone(e.target);
// let X = e.offsetX;
//
// if (zone) {
//     e.preventDefault();
//
//     currentDrag.node.classList.add('hidden-item');
//
//     if (e.target.classList.contains('item')) {
//
//         const width = e.target.getBoundingClientRect().width;
//
//         console.log(e.offsetX, width);
//         if (X <= width / 2) {
//             zone.insertBefore(slot, e.target)
//         } else {
//             zone.insertBefore(slot, e.target.nextElementSibling)
//         }
//     } else {
//         zone.insertBefore(slot, zone.lastElementChild);
//     }
// }
// })
// ;
//
// document.addEventListener('drop', (e) = > {
//     if (currentDrag) {
//         const zone = getCurrentZone(e.target);
//
//         e.preventDefault();
//
//         if (zone && currentDrag.startZone !== zone) {
//             if (e.target.classList.contains('item')) {
//                 zone.insertBefore(currentDrag.node, e.target.nextElementSibling);
//             } else {
//                 zone.insertBefore(currentDrag.node, zone.lastElementChild);
//             }
//         }
//         currentDrag.node.classList.remove('hidden-item');
//         zone.removeChild(slot);
//         currentDrag = null;
//     }
// }
// )
// ;
//
// function createItem() {
//     const newDiv = document.createElement('div');
//
//     newDiv.textContent = counter++;
//     newDiv.classList.add('item');
//     newDiv.draggable = true;
//
//     return newDiv;
// }
//
// function createSlot() {
//     const newDiv = document.createElement('div');
//
//     newDiv.classList.add('slot');
//
//     return newDiv;
// }
//