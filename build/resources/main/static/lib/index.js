//URL和操作映射
var urlMap = {
    getToDoItemList: "/api/tasks",
    addNewToDoItemList: "/api/tasks",
    updateToDoItem: "/api/tasks/{id}",
    deleteToDoItemById: "/api/tasks/{id}",
    getToDoItemById: "/api/tasks/{id}"
};

var tableBody = document.getElementById("table");
var content = document.getElementById("content");
var toDoItemInput = document.getElementById("toDoItemContent");
var selectedId = -1;
var newContent = undefined;
var msg = document.getElementById("msg");

function insertIntoTableBody(toDoItem){
    var tr = document.createElement("tr");
    var tdID = document.createElement("td");
    tdID.innerText = toDoItem.id;

    var tdCreateTime = document.createElement("td");
    tdCreateTime.innerText = toDoItem.createTime;

    var tdContent = document.createElement("td");
    tdContent.innerText = toDoItem.content;

    var tdOption = document.createElement("td");
    tdOption.innerHTML = "<a href='#' onclick='deleteToDoItemById(event, id)'>删除</a> <a href='#' onclick='toDoItemDetail(event, id)'>详情</a>".replace("id", toDoItem.id).replace("id", toDoItem.id);

    tr.appendChild(tdID);
    tr.appendChild(tdCreateTime);
    tr.appendChild(tdContent);
    tr.appendChild(tdOption);

    tableBody.appendChild(tr);
}

function updateContent(event) {
    console.log(event.srcElement);
    newContent = event.srcElement.value;
}

function toDoItemDetail(event, id) {
    event.preventDefault();
    console.log("查看详情" + id);

    var getToDoItemByIdURL = urlMap.getToDoItemById.replace("{id}", id);
    selectedId = id;
    console.log(getToDoItemByIdURL);
    axios.get(getToDoItemByIdURL).then(function (resp) {
        renderDetailPanel(resp.data);
        msg.innerText = resp.data.id + " " + resp.data.createTime + "，编辑中..."
    }).catch(function (reason) {
        alert(reason);
    })

}

function renderDetailPanel(toDoItem){
    toDoItemInput.value = toDoItem.content;
}

function refreshTableBody(data){
    tableBody.innerHTML = "";
    for(var i in data){
        var toDoItem = data[i];
        console.log(toDoItem);
        insertIntoTableBody(toDoItem);
    }
}

function getToDoItemList() {
    axios.get(urlMap.getToDoItemList).then(function (resp) {
        console.log(resp.data);
        refreshTableBody(resp.data);
    }).catch(function (reason) {
        alert("获取ToDoList失败");
        console.log(reason);
    })
}

function addNewToDoItemList(toDoItemObj) {
    axios.post(urlMap.addNewToDoItemList, toDoItemObj).then(function (resp) {
        console.log(resp.data);
        refreshTableBody(resp.data);
    }).catch(function (reason) {
        alert("添加新条目失败");
        console.log(reason);
    });
}

function updateToDoItem(id, newToDoItemObj) {
    axios.patch(urlMap.updateToDoItem.replace("{id}", id), {content: newContent}).then(function (resp) {
        console.log(resp.data);
        refreshTableBody(resp.data);
        toDoItemInput.value = "";
        msg.innerText = "修改完成..."
        setTimeout(function () {
            msg.innerText = ""
        }, 1000);
    }).catch(function (reason) {
        alert("更新失败");
        console.log(reason);
    });
}


function deleteToDoItemById(event, id) {
    event.preventDefault();
    var deleteURL = urlMap.deleteToDoItemById.replace("{id}", id);
    console.log(deleteURL);
    axios.delete(deleteURL).then(function(resp){
        console.log(resp.data);
        refreshTableBody(resp.data);
    }).catch(function(reason){
        alert("删除失败");
        console.log(reason);
    })
}

function addNewItem(event){
    console.log(content.value);
    addNewToDoItemList({content: content.value});
    content.value = "";
}

window.onload = function () {
    console.log("窗口载入完成...");
    getToDoItemList();
}