package cn.edu.seu.bookstore.payload;

import cn.edu.seu.bookstore.entity.Book;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Data
public class SearchBookPayload implements Serializable {
    private static final long serialVersionUID = 1668973474630411329L;

    // 总数
    private Long total;

    // 分页
    private Integer pageNum;
    private Integer pageSize;
    private Integer pageCount;

    // 书籍列表
    private List<Book> list;

    // 统计
    private List<Statistics> statistics;

    @Data
    public static class Statistics {
        private String type;
        private String title;
        private List<StatisticsItem> items;

        @Data
        public static class StatisticsItem {
            private UUID id;
            private String category;
            private Integer count;
        }
    }
}
