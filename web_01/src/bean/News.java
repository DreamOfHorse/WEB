package bean;

public class News {
    private int id;
    private String column;
    private String title;
    private String content;
    private String data;
    private String author;
    private String url;
    private int cid;
    private int click;
    public void setId(int id) {
        this.id = id;
    }
    public int getId() {
        return id;
    }
    public String getColumn() {
        return column;
    }
    public void setColumn(String column) {
        this.column = column;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
    public int getClick() {
        return click;
    }
    public void setClick(int click) {
        this.click= click;
    }
    public String getAuthor() {
        return author;
    }
    public void setAuthor(String author) {
        this.author=author;
    }
    public int getCid(){
        return cid;
    }
    public void setCid(int cid){
        this.cid = cid;
    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
    }
}
