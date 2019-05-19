package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class GreetingController {

    @Autowired
    ToDoItemService toDoItemService;

    @GetMapping("tasks")
    public List<ToDoItem> getToDoList() {
        return toDoItemService.getAllToDoItem();
    }

    @PostMapping("tasks")
    public List<ToDoItem> addNewToDoItem(@RequestBody ToDoItem newToDoItem) {
        toDoItemService.add(newToDoItem);
        return toDoItemService.getAllToDoItem();
    }

    @PatchMapping("tasks/{id}")
    public List<ToDoItem> updateToDoItem(@PathVariable long id, @RequestBody ToDoItem newToDoItem) {
        toDoItemService.update(id, newToDoItem);
        return toDoItemService.getAllToDoItem();
    }

    @GetMapping("tasks/{id}")
    public ToDoItem getToDoItemById(@PathVariable long id) {
        return toDoItemService.getById(id);
    }

    @DeleteMapping("tasks/{id}")
    public List<ToDoItem> deleteToDoItemById(@PathVariable(required = true) long id) {
        toDoItemService.removeById(id);
        return toDoItemService.getAllToDoItem();
    }

}