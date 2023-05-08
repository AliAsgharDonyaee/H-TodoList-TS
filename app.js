var addTodo = document.getElementById("addTodo");
var addText = document.getElementById("addText");
var todoList = document.getElementById("todoLists");
var checkBtn = document.getElementById("checkBtn");
var randomColor = function () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
addTodo.addEventListener("click", fAddTodo);
todoList.addEventListener("click", fBtns);
document.addEventListener("DOMContentLoaded", getTodos);
function fAddTodo(e) {
    e.preventDefault();
    if (addText.value === "") {
        alert("please add todo");
    }
    else {
        var parent_1 = document.getElementById("todoLists");
        var craeteTag = document.createElement("div");
        craeteTag.setAttribute("id", "todo");
        var color = randomColor();
        craeteTag.className = "rounded-xl border bg-[".concat(color, "] p-2 w-auto h-96");
        var todo = " \n                <div id=\"checkedBox\" class=\"relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center\">\n                    <i id=\"fa-check\" class=\"fa-solid fa-check text-white\"></i>\n                </div>\n                <div id=\"textTodo\" class=\"w-full h-[90%]\">\n                   <textarea id=\"textTodoArea\" class=\"bg-inherit w-full h-full\" cols=\"100%\" row=\"100%\" disabled> ".concat(addText.value, "</textarea>\n                </div>\n                <div id=\"box\" class=\"shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400\">\n                    <div id=\"checkBox\" class=\"group\">\n                        <button id=\"checkBtn btn\" class=\"transition-all group-hover:text-indigo-500\">\n                            <i id=\"fa-check\" class=\"fa-solid fa-check\"></i>\n                        </button>\n                    </div>\n                    <div id=\"editBox\" class=\"group\">\n                        <button id=\"editBtn btn\" class=\"transition-all group-hover:text-indigo-500\">\n                            <i id=\"fa-edit\" class=\"fa-solid fa-edit\"></i>\n                        </button>\n                    </div>\n                    <div id=\"deleteBoxn\" class=\"group\">\n                        <button id=\"trashBtn btn\" class=\"transition-al group-hover:text-red-500\">\n                            <i id=\"fa-trash\" class=\"fa-solid fa-trash\"></i>\n                        </button>\n                    </div>\n                </div>");
        parent_1.appendChild(craeteTag);
        craeteTag.innerHTML = todo;
        saveTodos(addText.value);
        addText.value = "";
    }
}
function fBtns(e) {
    var id = e.target;
    var findParent = id.parentNode.parentNode.parentNode.parentNode;
    var findIcon = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
    var editTexts = findParent.childNodes[0].parentNode.children[1].children[0].value;
    switch (id.id) {
        case "fa-trash":
            findParent.remove();
            removeLocalTodo(findParent);
            break;
        case "fa-edit":
            //todo: enable textarea
            var todoArea_1 = findParent.childNodes[0].parentNode.children[1].children[0];
            todoArea_1.disabled = false;
            todoArea_1.style.backgroundColor = "#FFF";
            todoArea_1.focus();
            //todo:  change icon edit when onClick editIcon
            var findIcons = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
            fChangeIcon(findIcon, "id", "fa-circle-check", "fa-sharp fa-solid fa-circle-check text-lime-500");
            //todo: change value textarea when onClick icon checked
            var i = document.getElementById("fa-circle-check");
            i.addEventListener("click", editText);
            function editText() {
                var textTodoArea = document.getElementById("textTodoArea");
                textTodoArea.disabled = true;
                todoArea_1.style.backgroundColor = "inherit";
                textTodoArea.innerHTML = editTexts;
            }
            break;
        case "fa-check":
            var checkedBox = findParent.childNodes[0].nextSibling;
            checkedBox.style.backgroundColor = "#84cc16";
            break;
        case "fa-circle-check":
            fChangeIcon(findIcon, "id", "fa-edit", "fa-solid fa-edit");
            break;
    }
    function fChangeIcon(findIcon, id, setAT, className) {
        var findParentBtn = findParent.childNodes[0].parentNode.children[2].children[1].children[0];
        findIcon.remove();
        var createIcon = document.createElement("i");
        createIcon.setAttribute(id, setAT);
        createIcon.className = className;
        findParentBtn.appendChild(createIcon);
    }
}
addEventListener("DOMContentLoaded", function () {
    localStorage.getItem("todos");
});
function saveTodos(todo) {
    var savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.push(todo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
}
function getTodos() {
    var savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    savedTodos.forEach(function (to) {
        var parent = document.getElementById("todoLists");
        var craeteTag = document.createElement("div");
        craeteTag.setAttribute("id", "todo");
        craeteTag.className = "rounded-xl border bg-[".concat(randomColor(), "] p-2 w-auto h-96");
        var todo = " \n                <div id=\"checkedBox\" class=\"relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center\">\n                    <i id=\"fa-check\" class=\"fa-solid fa-check text-white\"></i>\n                </div>\n                <div id=\"textTodo\" class=\"w-full h-[90%]\">\n                   <textarea id=\"textTodoArea\" class=\"bg-inherit w-full h-full\" cols=\"100%\" row=\"100%\" disabled> ".concat(to, "</textarea>\n                </div>\n                <div id=\"box\" class=\"shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400\">\n                    <div id=\"checkBox\" class=\"group\">\n                        <button id=\"checkBtn btn\" class=\"transition-all group-hover:text-indigo-500\">\n                            <i id=\"fa-check\" class=\"fa-solid fa-check\"></i>\n                        </button>\n                    </div>\n                    <div id=\"editBox\" class=\"group\">\n                        <button id=\"editBtn btn\" class=\"transition-all group-hover:text-indigo-500\">\n                            <i id=\"fa-edit\" class=\"fa-solid fa-edit\"></i>\n                        </button>\n                    </div>\n                    <div id=\"deleteBoxn\" class=\"group\">\n                        <button id=\"trashBtn btn\" class=\"transition-al group-hover:text-red-500\">\n                            <i id=\"fa-trash\" class=\"fa-solid fa-trash\"></i>\n                        </button>\n                    </div>\n                </div>");
        parent.appendChild(craeteTag);
        craeteTag.innerHTML = todo;
    });
}
function removeLocalTodo(todo) {
    var savedTodos = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
    var ff = savedTodos.filter(function (t) {
        t !== todo.children[1].innerText;
    });
    localStorage.setItem("todos", JSON.stringify(ff));
}
