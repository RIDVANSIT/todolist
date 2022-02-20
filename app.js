const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();
function eventListeners(){
  form.addEventListener("submit",addTodo);
  document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
  secondCardBody.addEventListener("click",deleteTodo);
  filter.addEventListener("keyup",filterTodos);
  clearButton.addEventListener("click",clearAllTodos);

}
//todoları arayüzden temizleyen fonsiyon
function clearAllTodos(e){
if(confirm("tümünü silmeye mi niyetlendin?")){
while(todoList.firstElementChild != null){
  todoList.removeChild(todoList.firstElementChild);
}
localStorage.removeItem("todos");
}


}
//todoları filtreleyen func
function filterTodos(e){
const filterValue = e.target.value.toLowerCase();
const listItems =document.querySelectorAll(".list-group-item");
listItems.forEach(function(listItem){
const text = listItem.textContent.toLowerCase();
if(text.indexOf(filterValue) === -1 ){
//bulamadı
listItem.setAttribute("style","display: none !important");
}
else{
  listItem.setAttribute("style","display : block");
}
});
}
//todoyu arayüzden silen func
function deleteTodo(e){
if(e.target.className==="fa fa-remove"){
  e.target.parentElement.parentElement.remove();
  deleteTodoFromStorage( e.target.parentElement.parentElement.textContent);
  showAlert("success","todo başarıyla silindi...")
}

}
//todoyu storagedan silen fonksiyon

function deleteTodoFromStorage(deletetodo){
  let todos = getTodosfromStorage();
  todos.forEach(function(todo,index){
    if(todo === deletetodo ){
      todos.splice(index,1);//bu fonk arrayden degeri siliyor.
    }

  });
  localStorage.setItem("todos",JSON.stringify(todos));


}



//sayfa yüklendiğinde local storagedan veri yükleyen func
function loadAllTodosToUI(){
  let todos = getTodosfromStorage();
  todos.forEach(function(todo) {
    addTodoToUI(todo);
  });
}
//todo ekleyen func
function addTodo(e){

const newTodo = todoInput.value.trim();
if(newTodo=== ""){
  showAlert("danger","allahaşkına şuraya birşey yaz be!");
 

}
else{
  
  addTodoToUI(newTodo);
  showAlert("success","eyvallah ya altı üstü bi şeyler yazacaksın :)");
  addtodoToStorage(newTodo);
}



  e.preventDefault();
}
//local storage eleman ekleme
function getTodosfromStorage(){
  let todos ;
  if(localStorage.getItem("todos")===null){
    todos = [];
  }
  else{
    todos = JSON.parse(localStorage.getItem("todos"));}
  return todos;
  }
function addtodoToStorage(newTodo){

let todos = getTodosfromStorage();
todos.push(newTodo);
localStorage.setItem("todos",JSON.stringify(todos));

}








//bilgilendirme fonksiyonu
function showAlert(type,message){
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`
  alert.textContent = message;
  firstCardBody.appendChild(alert);
//alert gösterim süresi için setTimeout() func.
  setTimeout(function(){
    alert.remove();
  },1000);



}

function addTodoToUI(newTodo){
  // <li class="list-group-item d-flex justify-content-between">
  //                           Todo 1
  //                           <a href = "#" class ="delete-item">
  //                               <i class = "fa fa-remove"></i>
  //                           </a>

  //                       </li>
//list item oluşturma
const listItem = document.createElement("li");


//link oluşturma
const link = document.createElement("a");
link.className="delete-item";
link.href= "#";
link.innerHTML = "<i class = 'fa fa-remove'></i>";

//list item özellikleri
listItem.className= "list-group-item d-flex justify-content-between";
listItem.appendChild(document.createTextNode(newTodo));
listItem.appendChild(link);
//bu oluşturulan list itemi (yani <ul> altına) todoliste eklemek:
todoList.appendChild(listItem);
todoInput.value = ""


}