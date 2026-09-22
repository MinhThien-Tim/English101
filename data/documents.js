/*
 * Kho dữ liệu tài liệu duy nhất của website.
 * Thêm tài liệu mới bằng cách sao chép một object và sửa các trường bên dưới.
 * Dùng đường dẫn tương đối, không bắt đầu bằng dấu / để tương thích GitHub Pages.
 */
window.ENGLISH_101_DOCUMENTS = [
  { id: "personal-flashcards", category: "Vocabulary", title: "Personal Flashcards", description: "Review vocabulary saved in context with Context Lens.", type: "HTML", path: "Vocabulary/personal-flashcards.html" },
  { id: "vocabulary-atlas", category: "Vocabulary", title: "Vocabulary Atlas", description: "Bốn bộ từ vựng được hợp nhất thành một bản đồ học tập trực quan.", type: "HTML", path: "Vocabulary/vocabulary-atlas.html", featured: true },

  { id: "vocab-1-2", category: "Vocabulary", title: "Vocabulary Vòng 1–2", description: "Từ vựng và ví dụ hoàn chỉnh cho hai vòng đầu.", type: "HTML", path: "Vocabulary/vong-1-2-vocabulary-complete-examples.html" },
  { id: "vocab-3-4", category: "Vocabulary", title: "Vocabulary Vòng 3–4", description: "Từ vựng và ví dụ hoàn chỉnh cho vòng ba và bốn.", type: "HTML", path: "Vocabulary/vong-3-4-vocabulary-complete-examples.html" },
  { id: "vocab-5-6", category: "Vocabulary", title: "Vocabulary Vòng 5–6", description: "Từ vựng và ví dụ hoàn chỉnh cho vòng năm và sáu.", type: "HTML", path: "Vocabulary/vong-5-6-vocabulary-complete-examples.html" },
  { id: "vocab-writing", category: "Vocabulary", title: "Từ vựng Vòng 1–6 rút gọn", description: "Bộ từ vựng cô đọng kết hợp bài luyện viết chủ động.", type: "HTML", path: "Vocabulary/tu-vung-vong-1-6-rut-gon-luyen-viet.html" },
  { id: "reading-translation", category: "Vocabulary", title: "Đọc & Dịch — Vòng 1–6", description: "Luyện đọc hiểu và dịch với bộ từ vựng theo sáu vòng.", type: "HTML", path: "Vocabulary/vocabulary-reading-translation-v1-6.html" },

  { id: "confusing-words", category: "Vocabulary", title: "Từ Dễ Nhầm", description: "Phân biệt những từ dễ nhầm lẫn và luyện chính tả.", type: "HTML", path: "Vocabulary/confusing-words.html" },
  { id: "root-atlas", category: "Vocabulary", title: "Root Atlas", description: "Học gốc từ để mở rộng vốn từ có hệ thống và ghi nhớ lâu hơn.", type: "HTML", path: "Vocabulary/root-atlas.html", featured: true },

  { id: "c1-vocabulary", category: "Vocabulary", title: "C1 Vocabulary — Nhóm I–VI", description: "Kho từ vựng trình độ C1 được phân chia thành sáu nhóm.", type: "HTML", path: "Vocabulary/c1-vocabulary.html" },
  { id: "toeic-600", category: "Vocabulary", title: "TOEIC 600 Essential Words", description: "600 từ theo 50 Lesson với flashcards, trắc nghiệm, chính tả và ôn câu sai.", type: "HTML", path: "Vocabulary/toeic-600.html", featured: true },
  { id: "ielts-collocations", category: "Vocabulary", title: "IELTS C1–C2 Collocations", description: "Collocations theo chủ đề dành cho người học IELTS nâng cao.", type: "HTML", path: "Vocabulary/ielts-collocations-topic-table-with-dictation.html", featured: true },
  { id: "hiking-collocations", category: "Vocabulary", title: "IELTS Hiking Collocations", description: "Flashcards collocations và dictation đầy đủ từ Unit 1 đến 19.", type: "HTML", path: "Vocabulary/ielts_hiking_collocations_full_with_dictation.html" },

  { id: "grammar-handbook", category: "Grammar", title: "Bí Kíp Ngữ Pháp Tiếng Anh", description: "Hệ thống kiến thức ngữ pháp trọng tâm, được hiệu đính và trình bày dễ tra cứu.", type: "HTML", path: "Grammar/bi-kip-ngu-phap-tieng-anh-hoan-chinh.html", featured: true },
  { id: "conjunctions", category: "Grammar", title: "English Conjunctions", description: "Lý thuyết và bài tập thực hành về liên từ tiếng Anh.", type: "HTML", path: "Grammar/conjunctions-theory-practice.html" },
  { id: "suffix-lab", category: "Grammar", title: "English Suffix Lab", description: "Thư viện và bài luyện tập nhận biết các đuôi từ phổ biến.", type: "HTML", path: "Grammar/english-suffix-lab.html", featured: true },
  { id: "prepositions", category: "Grammar", title: "English Prepositions", description: "Học lý thuyết giới từ và luyện tập ngay trên trình duyệt.", type: "HTML", path: "Grammar/prepositions-theory-practice.html" },
  { id: "parts-of-speech", category: "Grammar", title: "Same Word, Different Parts of Speech", description: "Khám phá cách một từ được dùng ở nhiều loại từ khác nhau.", type: "HTML", path: "Grammar/same-word-different-parts-of-speech.html" },
  { id: "tense-quiz", category: "Grammar", title: "English Tense Exercises Quiz", description: "Bài tập các thì tiếng Anh kèm đáp án để tự kiểm tra.", type: "HTML", path: "Grammar/tense-exercises-answer-key-quiz.html", featured: true },

  { id: "essay-guide", category: "Writing", title: "Essay Guide", description: "Hướng dẫn học và luyện viết essay theo từng bước rõ ràng.", type: "HTML", path: "Writing/guide.html", featured: true },
  { id: "writing-pipeline", category: "Writing", title: "Meaning → English Pipeline", description: "Quy trình chuyển ý tưởng thành câu tiếng Anh qua sáu vòng luyện tập.", type: "HTML", path: "Writing/meaning-to-english-pipeline-v1-6.html", featured: true },

  { id: "english-verbs", category: "Verb", title: "Động Từ Tiếng Anh", description: "Hệ thống động từ cho giao tiếp, kiến thức chung và viết.", type: "HTML", path: "Verb/english-verbs.html", featured: true },
  { id: "verb-forms", category: "Verb", title: "Five Forms of Verbs", description: "Bộ năm dạng động từ đầy đủ, gồm cả ngôi thứ ba số ít.", type: "HTML", path: "Verb/five-forms-of-verbs-with-3rd-person.html" },
  { id: "paraphrase", category: "Verb", title: "80+ Cụm Chữa Yếu Paraphrase", description: "Flashcards giúp tăng vốn diễn đạt và cải thiện kỹ năng paraphrase.", type: "HTML", path: "Verb/paraphrase-80-flashcards.html" },
  { id: "phrasal-verbs", category: "Verb", title: "66 Phrasal Verbs Cực Mạnh", description: "Học cụm động từ thiết yếu qua flashcards tương tác.", type: "HTML", path: "Verb/phrasal-verbs.html", featured: true },

  { id: "deep-reading", category: "Guide", title: "Giao trình Deep Reading", description: "Bài đọc sâu giúp tăng khả năng hiểu và phân tích văn bản học thuật / nâng cao.", type: "PDF", path: "Guide/Giao-trinh-Deep-Reading.pdf", featured: true, downloadable: true },
  { id: "english-grammar-notes", category: "Guide", title: "English Grammar Notes", description: "Ghi chú ngữ pháp trọng tâm để ôn tập nhanh và tra cứu dễ dàng.", type: "PDF", path: "Guide/English-Grammar-Notes.pdf", downloadable: true },
  { id: "english-learning-101", category: "Guide", title: "English Learning 101", description: "Tài liệu hướng dẫn tổng quan lộ trình học tiếng Anh hiệu quả.", type: "PDF", path: "Guide/English-Learning-101.pdf", featured: true, downloadable: true },

  { id: "blog-active-recall", category: "Blog", title: "Từ “biết” đến “dùng được”", description: "Vì sao nhận biết một từ chưa đủ, và cách luyện truy hồi để biến vốn từ thụ động thành khả năng viết và nói.", type: "Article", path: "Blog/tu-biet-den-dung-duoc.html", featured: true }
];
