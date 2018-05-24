VK.init({
    apiId: 6488367
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 6);
    });
}

auth().then(() => console.log('ok'));


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
// function getCurrentZone(from) {
//     do {
//         if (from.classList.contains('drop-zone')) {
//             return from;
//         }
//     } while (from = from.parentElement);
//
//     return null;
// }