# English 101

Portal học tiếng Anh tĩnh, responsive, không cần backend và sẵn sàng triển khai miễn phí bằng GitHub Pages. Website hiện có 23 tài liệu thuộc 5 chủ đề: Grammar, Vocabulary, Writing, Verb và Guide.

## Cấu trúc

```text
.
├── index.html              # Trang chủ
├── viewer.html             # Trình đọc PDF/HTML/Word
├── style.css               # Toàn bộ giao diện responsive
├── script.js               # Tìm kiếm, lọc và render thẻ tài liệu
├── viewer.js               # Logic trình đọc
├── data/
│   └── documents.js        # Danh mục tài liệu duy nhất cần cập nhật
├── assets/                 # Logo, ảnh và tài nguyên giao diện
├── Grammar/
├── Vocabulary/
├── Writing/
├── Verb/
└── Guide/
```

Đường dẫn trong dữ liệu luôn là đường dẫn tương đối (ví dụ `Grammar/my-file.pdf`), vì vậy website hoạt động cả trong subpath của GitHub Pages.

## Mở website trên máy

Cách nhanh nhất: nhấp đúp `index.html`. Danh sách, tìm kiếm và các file HTML/PDF đều hoạt động khi mở trực tiếp.

Để mô phỏng chính xác môi trường GitHub Pages, nên chạy một web server nhỏ trong thư mục dự án:

```bash
python -m http.server 8000
```

Sau đó mở `http://localhost:8000`. Có thể dùng `python3` thay cho `python` trên macOS/Linux.

## Thêm tài liệu mới

1. Đưa file vào thư mục đúng chủ đề, ví dụ `Grammar/present-perfect.pdf`.
2. Mở `data/documents.js`.
3. Thêm object mới vào mảng `window.ENGLISH_101_DOCUMENTS`:

```js
{
  id: "present-perfect",                  // duy nhất, không dấu, không khoảng trắng
  category: "Grammar",                    // Grammar/Vocabulary/Writing/Verb/Guide
  title: "Present Perfect Essentials",
  description: "Lý thuyết và bài tập thì hiện tại hoàn thành.",
  type: "PDF",                            // PDF, HTML, Word hoặc Link
  path: "Grammar/present-perfect.pdf",
  featured: true,                          // tùy chọn
  downloadable: true                       // tùy chọn
}
```

Không cần sửa `index.html`: số lượng, bộ lọc, thẻ tài liệu và kết quả tìm kiếm được tạo tự động từ file dữ liệu.

### PDF

Đặt file `.pdf` vào thư mục chủ đề, dùng `type: "PDF"`. Trình đọc tích hợp dùng khả năng hiển thị PDF của trình duyệt. Thêm `downloadable: true` nếu muốn hiện nút tải xuống.

### HTML

Đặt file `.html` vào thư mục chủ đề, dùng `type: "HTML"`. Nội dung được mở trong trình đọc của website và vẫn có nút mở tab mới.

### Word (.doc/.docx)

Giải pháp tốt nhất là xuất Word thành PDF, đưa cả hai file lên repository và trỏ mục tài liệu đến bản PDF. Nếu bắt buộc dùng Word:

```js
{ id: "sample-doc", category: "Guide", title: "Sample", description: "...", type: "Word", path: "Guide/sample.docx", downloadable: true }
```

Khi website đã public, trình đọc sử dụng Microsoft Office Online Viewer để đọc trực tiếp. Viewer cần truy cập được URL công khai, nên file Word không thể nhúng khi mở bằng `file://` hoặc server chỉ chạy trong máy. Google Drive/OneDrive cũng có thể dùng bằng `type: "Link"` và URL chia sẻ công khai.

### Link bên ngoài

```js
{ id: "external-guide", category: "Guide", title: "External Guide", description: "...", type: "Link", path: "https://example.com/guide" }
```

## Đưa lên GitHub

Tạo repository mới trên GitHub, rồi chạy trong thư mục dự án:

```bash
git init
git add .
git commit -m "Create English 101 learning portal"
git branch -M main
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Nếu repository đã tồn tại, chỉ cần `git add .`, commit và push lên branch `main`.

## Bật GitHub Pages

1. Mở repository trên GitHub.
2. Vào **Settings → Pages**.
3. Trong **Build and deployment**, chọn **Deploy from a branch**.
4. Chọn branch **main**, thư mục **/(root)**, rồi bấm **Save**.
5. Chờ GitHub hoàn tất deploy. Địa chỉ thường là `https://USERNAME.github.io/REPOSITORY/`.

Mỗi lần thêm tài liệu hoặc sửa `data/documents.js`, commit và push lại; GitHub Pages sẽ tự cập nhật.

## Lưu ý quản lý file

- Tên file nên dùng chữ thường, dấu gạch ngang và không dấu để URL dễ đọc.
- GitHub giới hạn file đơn lẻ 100 MB; tài liệu lớn nên nén hoặc lưu trên Drive/OneDrive.
- Không đổi `id` của mục đã chia sẻ link, vì trang đọc sử dụng `?id=...`.
- Không dùng đường dẫn bắt đầu bằng `/`; dạng đó sẽ lỗi khi site nằm dưới tên repository.
- Sau khi thêm file, luôn thử nút “Đọc trực tiếp” trên desktop và mobile.

## Công nghệ

HTML5, CSS3 và JavaScript thuần. Google Fonts có font hệ thống dự phòng, nên nội dung vẫn hiển thị tốt nếu ngoại tuyến.


## Personal Flashcards

Open Vocabulary / Personal Flashcards and import the English101 JSON downloaded
from Context Lens. The importer accepts `english101.context-vocabulary` V1 and V2,
validates the entire file before writing, and exports V2. Reimporting an existing
ID preserves local edits and review state. Invalid files leave existing data intact.

The `english101-learning` IndexedDB database owns collections, entries, progress,
and settings on this origin. It never reads Context Lens databases. Existing lesson
localStorage keys are unchanged. Serve the page over HTTP(S), including a repository
subpath; all scripts and links use relative paths.

Study supports EN / VI, VI / EN, and conservative context cloze (fallback to EN / VI
when the surface form cannot be isolated reliably). Enter reveals then advances;
IME composition and unrelated controls are ignored. Known / Learning are local
learner judgments, not mastery or an SRS schedule. Collections can be renamed or
deleted; cards can be deleted. JSON export contains vocabulary and collections,
not review states. Keep an export before clearing browser data.

No account, cloud sync, server API, AI flashcards, or cross-origin database access
is implemented. Moving cards, multi-context merging, and SRS are deferred.

Validation: `node --test tests/learning/*.test.js tests/catalogue.test.js`.
