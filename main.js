// 1: при натисканні на кнопку "send" додати значення з поля введення в масив
// 2: при натисканні на кнопку "show" відобразити значення масиву в консолі
// 3: лише у випадку, якщо значення не є порожнім
//(не може бути пробілів або інших пробільних знаків) додати до масиву
// 5: очистити поле введення після збереження даних
//6: відобразити всі повідомлення у списку (ul)

// Виконати ще одне завдання:
// ЗАВДАННЯ 5:
//+ біля елементів списку пододавати кнопки для видалення із списку,
//+  реалізувати функціонал цієї кнопки.
//+ЗАВДАННЯ 6:елементи зі списку можуть бути вибрані, або не вибрані - відображати
//+ за допомогою зміни background-color.
//+  В масиві з має зберігатися інформація про те, які вибрані, які ні(або окреме поле boolean, або 
// зберігати в окремому масиві)

const messages = [];
const form = document.forms.rootForm;
const btnShowArray = document.getElementById('btnShowArray');

//масив для зберігання які вибрані
const messagesClick = [];
const btnShowArrayClick = document.getElementById('btnShowArrayClick'); 
btnShowArrayClick.style.display = 'none';

function changeColorAfterClick() {
    const listMessages = document.getElementById('listMessages');
    listMessages.addEventListener('click', (event) => {
        const clickedItem = event.target;
        const index = Array.from(listMessages.children).indexOf(clickedItem);
        if (index !== -1) {           
            clickedItem.style.backgroundColor = 'red';
            btnShowArrayClick.style.display = 'inline';
            if (!messagesClick.includes(index)) {
                messagesClick.push(index);
            }
        }
    });
}

function changeColorAfterDBLClick() {
    const listMessages = document.getElementById('listMessages');
    listMessages.addEventListener('dblclick', (event) => {
        const clickedItem = event.target;
        const index = Array.from(listMessages.children).indexOf(clickedItem);
        if (index !== -1) {
            clickedItem.style.backgroundColor = '';
        }
    });
}

function createDeleteButton(li) {
    const btnDelete = document.createElement('button');
    btnDelete.style.marginLeft = "10px";
    btnDelete.innerText = 'Delete';
    btnDelete.addEventListener('click', () => {
        const index = Array.from(listMessages.children).indexOf(li);
        if (index !== -1) {
            messages.splice(index, 1);
            li.remove();
            if (messages.length === 0) {
                btnDelete.style.display = 'none';
            }
        }
    });
    return btnDelete;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = e.target.elements.message.value.trim();
    if (v !== "") {
        messages.push(v);
        const li = document.createElement('li');
        li.innerText = v;
        const btnDelete = createDeleteButton(li);
        li.appendChild(btnDelete); // Добавляем кнопку удаления к каждой строке
        btnDelete.style.display = 'inline';
        listMessages.append(li);
        //zmina color
        changeColorAfterClick();
        changeColorAfterDBLClick();
    }
    e.target.reset();
});
btnShowArray.addEventListener('click', () => {
    console.log(messages);
})

btnShowArrayClick.addEventListener('click', () => {
    console.log("index of array was click", messagesClick);
})


