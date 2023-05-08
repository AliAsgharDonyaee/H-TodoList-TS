const addTodo = <HTMLButtonElement>document.getElementById("addTodo");
const addText = document.getElementById("addText") as HTMLInputElement;

const todoList = <HTMLElement>document.getElementById("todoLists");
const checkBtn = document.getElementById("checkBtn") as HTMLButtonElement;

const randomColor = ():string => {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

addTodo.addEventListener<"click">("click", fAddTodo);
todoList.addEventListener<"click">("click", fBtns);
document.addEventListener<"DOMContentLoaded">("DOMContentLoaded", getTodos);

function fAddTodo(e:any):void {
	e.preventDefault();
	if (addText.value === "") {
		alert("please add todo");
	} else {
		const parent = <HTMLElement>document.getElementById("todoLists");
		const craeteTag = <HTMLDivElement>document.createElement("div");
		craeteTag.setAttribute("id", `todo`);
		const color = randomColor();
		craeteTag.className = `rounded-xl border bg-[${color}] p-2 w-auto h-96` as string;
		const todo:string = ` 
                <div id="checkedBox" class="relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center">
                    <i id="fa-check" class="fa-solid fa-check text-white"></i>
                </div>
                <div id="textTodo" class="w-full h-[90%]">
                   <textarea id="textTodoArea" class="bg-inherit w-full h-full" cols="100%" row="100%" disabled> ${addText.value}</textarea>
                </div>
                <div id="box" class="shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400">
                    <div id="checkBox" class="group">
                        <button id="checkBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-check" class="fa-solid fa-check"></i>
                        </button>
                    </div>
                    <div id="editBox" class="group">
                        <button id="editBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-edit" class="fa-solid fa-edit"></i>
                        </button>
                    </div>
                    <div id="deleteBoxn" class="group">
                        <button id="trashBtn btn" class="transition-al group-hover:text-red-500">
                            <i id="fa-trash" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`;
		parent.appendChild(craeteTag);
		craeteTag.innerHTML = todo;

		saveTodos(addText.value);
		addText.value = "";
	}
}

function fBtns(e:any):void {
	const id:any = e.target;
	const findParent:any = id.parentNode.parentNode.parentNode.parentNode;
	const findIcon:any = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
	const editTexts:any = findParent.childNodes[0].parentNode.children[1].children[0].value;

	switch (id.id) {
		case "fa-trash":
			findParent.remove();
			removeLocalTodo(findParent);
			break;
		case "fa-edit":
			//todo: enable textarea
			const todoArea:any = findParent.childNodes[0].parentNode.children[1].children[0];
			todoArea.disabled = false;
			todoArea.style.backgroundColor = "#FFF";
			todoArea.focus();

			//todo:  change icon edit when onClick editIcon
			const findIcons:any = findParent.childNodes[0].parentNode.children[2].children[1].children[0].children[0];
			fChangeIcon(findIcon, "id", "fa-circle-check", `fa-sharp fa-solid fa-circle-check text-lime-500`);

			//todo: change value textarea when onClick icon checked
			const i = <HTMLElement>document.getElementById("fa-circle-check");
			i.addEventListener<"click">("click", editText);
			function editText():void {
				const textTodoArea:any = document.getElementById("textTodoArea");
				textTodoArea.disabled = true;
				todoArea.style.backgroundColor = "inherit";
				textTodoArea.innerHTML = <any>editTexts;
			}
			break;
		case "fa-check":
			const checkedBox = <any>findParent.childNodes[0].nextSibling;
			checkedBox.style.backgroundColor = "#84cc16";
			break;
		case "fa-circle-check":
			fChangeIcon(findIcon, "id", "fa-edit", `fa-solid fa-edit`);
			break;
	}
	function fChangeIcon(findIcon:any, id:string, setAT:string, className:string) {
		const findParentBtn = <any>findParent.childNodes[0].parentNode.children[2].children[1].children[0];
		findIcon.remove();
		const createIcon = <HTMLElement>document.createElement("i");
		createIcon.setAttribute(id, setAT);
		createIcon.className = <string>className;
		findParentBtn.appendChild(createIcon);
	}
}

addEventListener<'DOMContentLoaded'>("DOMContentLoaded", () => {
	localStorage.getItem("todos") as string | null;
});

function saveTodos(todo:string):void {
	let savedTodos:Storage = localStorage.getItem("todos") as string | null ? JSON.parse(localStorage.getItem("todos") as string) : [];
	savedTodos.push(todo);
	localStorage.setItem("todos", JSON.stringify(savedTodos));
}

function getTodos() {
	let savedTodos:Storage = localStorage.getItem("todos") as string | null  ? JSON.parse(localStorage.getItem("todos") as string) : [];
	savedTodos.forEach((to:string) => {
		const parent = <HTMLElement>document.getElementById("todoLists");
		const craeteTag = <HTMLDivElement>document.createElement("div");
		craeteTag.setAttribute("id", `todo`);
		craeteTag.className = `rounded-xl border bg-[${randomColor()}] p-2 w-auto h-96`;
		const todo = ` 
                <div id="checkedBox" class="relative right-5 bg-gray-300 rounded-full -mt-6 w-10 h-10 flex justify-center items-center">
                    <i id="fa-check" class="fa-solid fa-check text-white"></i>
                </div>
                <div id="textTodo" class="w-full h-[90%]">
                   <textarea id="textTodoArea" class="bg-inherit w-full h-full" cols="100%" row="100%" disabled> ${to}</textarea>
                </div>
                <div id="box" class="shadow-lg rounded-lg bg-white p-2 mt-2  mx-auto w-[80%] h-16 grid grid-cols-3 gap-2 justify-items-center items-center text-2xl text-gray-400">
                    <div id="checkBox" class="group">
                        <button id="checkBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-check" class="fa-solid fa-check"></i>
                        </button>
                    </div>
                    <div id="editBox" class="group">
                        <button id="editBtn btn" class="transition-all group-hover:text-indigo-500">
                            <i id="fa-edit" class="fa-solid fa-edit"></i>
                        </button>
                    </div>
                    <div id="deleteBoxn" class="group">
                        <button id="trashBtn btn" class="transition-al group-hover:text-red-500">
                            <i id="fa-trash" class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>`;
		parent.appendChild(craeteTag);
		craeteTag.innerHTML = todo;
	});
}

function removeLocalTodo(todo:any):void {
	let savedTodos: Storage = localStorage.getItem("todos") as string | null ? JSON.parse(localStorage.getItem("todos") as string) : [];
	const ff = savedTodos.filter((t:string) => {
		t !== todo.children[1].innerText;
	});
	localStorage.setItem("todos", JSON.stringify(ff));
}
