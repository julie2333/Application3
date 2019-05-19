package hello;

import java.util.List;

public interface ToDoItemService {

    List<ToDoItem> getAllToDoItem();

    void add(ToDoItem newToDoItem);

    void update(long id, ToDoItem newToDoItem);

    ToDoItem getById(long id);

    void removeById(long id);

}