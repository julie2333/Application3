package hello;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;


@Service("toDoItemService")
public class ToDoItemServiceImpl implements ToDoItemService {
    private Map<Long, ToDoItem> map;

    public ToDoItemServiceImpl() {
        map = new HashMap<>();
    }

    @Override
    public List<ToDoItem> getAllToDoItem() {
        List<ToDoItem> list = new ArrayList<>();
        Iterator<Map.Entry<Long, ToDoItem>> iter = map.entrySet().iterator();
        while (iter.hasNext()) {
            list.add(iter.next().getValue());
        }
        return list;
    }

    @Override
    public void add(ToDoItem newToDoItem) {
        map.put(newToDoItem.getId(), newToDoItem);
    }

    @Override
    public void update(long id, ToDoItem newToDoItem) {
        if (map.containsKey(id)) {
            map.get(id).setContent(newToDoItem.getContent());
        }
    }

    @Override
    public ToDoItem getById(long id) {
        if (map.containsKey(id)) {
            return map.get(id);
        }
        return null;
    }

    @Override
    public void removeById(long id) {
        if (map.containsKey(id)) {
            map.remove(id);
        }
    }

}