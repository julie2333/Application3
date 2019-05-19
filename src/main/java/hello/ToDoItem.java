package hello;

import java.text.SimpleDateFormat;
import java.util.Date;

public class ToDoItem {
    private static long counter = 0;

    private long id = counter++;
    private Date createTime = new Date();

    private String content;

    public ToDoItem() {
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getCreateTime() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(createTime);
    }

    @Override
    public String toString() {
        return String.format("%s %s %s", id, getCreateTime(), content);
    }
}