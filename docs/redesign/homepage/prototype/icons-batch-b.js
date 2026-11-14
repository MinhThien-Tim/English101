/* PROTOTYPE — batch B (Grammar, Writing). Gộp vào home-icons.js khi xong. */
(window.ICON_DRAFTS ||= { resources: {}, categories: {}, extras: {} });

Object.assign(window.ICON_DRAFTS.resources, {
  /* Sổ tay dày đứng 3/4, khối trang bên hông, ruy băng đánh dấu */
  "grammar-handbook":
    '<g transform="rotate(12 32 86)"><rect class="s-shade s-back" x="20" y="34" width="12" height="52" rx="2"/></g>' +
    '<path class="s-fill" d="M84 70V94l3.5-3.5L91 94V70Z"/>' +
    '<path class="s-paper" d="M38 24L56 15H98L80 24Z"/>' +
    '<path class="s-shade" d="M80 24L98 15V77L80 86Z"/>' +
    '<path class="s-detail" d="M44 21h42M86 21V83M92 18V80"/>' +
    '<rect class="s-paper" x="38" y="24" width="42" height="62" rx="2"/>' +
    '<path class="s-detail" d="M45 24V86"/>' +
    '<rect x="50" y="36" width="23" height="13" rx="2"/>' +
    '<path class="s-detail" d="M54 41h15M54 45h10"/>',

  /* Hai dải câu chồng mép, kẹp giấy giữ lại */
  "conjunctions":
    '<g transform="translate(60 33) rotate(-6)"><path class="s-accent" d="M-2-6V10A2 2 0 0 0 2 10V-12A4 4 0 0 0-6-12"/></g>' +
    '<g transform="rotate(-6 41 41)"><rect class="s-paper" x="10" y="28" width="62" height="26" rx="2.5"/><path class="s-detail" d="M17 37h14M34 37h12M17 45h24"/></g>' +
    '<g transform="rotate(5 79 51)"><rect class="s-paper" x="48" y="38" width="62" height="26" rx="2.5"/><path class="s-detail" d="M71 47h14M88 47h14M71 55h22"/></g>' +
    '<g transform="translate(60 33) rotate(-6)"><path class="s-accent" d="M-6-12V14A6 6 0 0 0 6 14V-6"/></g>',

  /* Bình tam giác có dung dịch, bọt khí, thẻ "-ly" */
  "suffix-lab":
    '<path class="s-paper" d="M44 18V38L22 78Q19 86 28 86H71Q80 86 77 78L55 38V18"/>' +
    '<path class="s-tint" d="M30.8 62Q49.5 64.5 68.2 62L77 78Q80 86 71 86H28Q19 86 22 78Z"/>' +
    '<circle class="s-accent" cx="42" cy="75" r="2.6"/>' +
    '<circle class="s-accent" cx="54" cy="70" r="1.8"/>' +
    '<circle class="s-detail" cx="49" cy="51" r="1.5"/>' +
    '<rect class="s-paper" x="41" y="12" width="17" height="6" rx="2"/>' +
    '<path class="s-back" d="M44 23Q49.5 26 55 23Q71 21 83.9 34"/>' +
    '<g transform="rotate(10 78 33)"><path class="s-paper" d="M78 33L85 25H110V41H85Z"/><circle cx="84" cy="33" r="1.6"/>' +
      '<text class="s-text" x="98.5" y="37">-ly</text></g>',

  /* Hộp các-tông mở nắp, quả bóng, mũi tên vào trong */
  "prepositions":
    '<path class="s-paper" d="M50 38L56 20H104L98 38Z"/>' +
    '<path class="s-paper" d="M30 50L50 38L34 30L14 42Z"/>' +
    '<path class="s-shade" d="M30 50L50 38H98L78 50Z"/>' +
    '<path class="s-paper" d="M78 50L98 38V74L78 86Z"/>' +
    '<path class="s-paper" d="M78 50L98 38L112 45L92 57Z"/>' +
    '<path class="s-paper" d="M30 50H78V86H30Z"/>' +
    '<path class="s-detail" d="M36 58h12M88 50V78"/>' +
    '<circle class="s-paper" cx="24" cy="16" r="8"/>' +
    '<path class="s-detail" d="M17 13.5c4.5 2.5 10 2.5 14 0"/>' +
    '<path class="s-accent s-dash" d="M34 16C50 12 61 24 63 41"/>' +
    '<path class="s-accent" d="M58.5 37l4.5 6 3.6-6.4"/>',

  /* Lăng kính thuỷ tinh: một tia vào, ba tia ra */
  "parts-of-speech":
    '<path class="s-shade" d="M54 20L64 14L84 76L74 82Z"/>' +
    '<path class="s-paper" d="M54 20L74 82H34Z"/>' +
    '<path class="s-detail" d="M51.5 32L44.5 56M43 54L75.6 50"/>' +
    '<path d="M8 62L43 54"/>' +
    '<path d="M76 50L110 32M76 50L112 50"/>' +
    '<path class="s-accent" d="M76 50L107 67"/>' +
    '<circle class="s-fill" cx="108.5" cy="68" r="2.4"/>',

  /* Phiếu trắc nghiệm ba ô, đồng hồ cát phía trước */
  "tense-quiz":
    '<g transform="rotate(-4 46 48)"><rect class="s-paper" x="18" y="12" width="56" height="72" rx="3"/>' +
      '<path class="s-detail" d="M26 21h20M39 33.5h26M39 49.5h26M39 65.5h18"/>' +
      '<path d="M26 30h7v7h-7zM26 46h7v7h-7zM26 62h7v7h-7z"/>' +
      '<path class="s-accent" d="M27.5 49.5l3 3.5 6.5-9"/></g>' +
    '<path class="s-paper" d="M72 43C72 56 82 59 82 63.5S72 71 72 83H96C96 71 86 68 86 63.5S96 56 96 43Z"/>' +
    '<path class="s-tint s-back" d="M76.5 50H91.5C90 55 86 58 84 60C82 58 78 55 76.5 50Z"/>' +
    '<path class="s-tint s-back" d="M75 83Q78 75 84 74.5Q90 75 93 83Z"/>' +
    '<path class="s-detail" d="M84 66V74"/>' +
    '<rect class="s-paper" x="67" y="38" width="34" height="5" rx="2"/>' +
    '<rect class="s-paper" x="67" y="83" width="34" height="5" rx="2"/>' +
    '<path d="M70 43V83M98 43V83"/>',

  /* Tập giấy kẻ dòng xoè, bút máy nằm chéo */
  "essay-guide":
    '<g transform="rotate(-14 50 84)"><rect class="s-shade s-back" x="26" y="14" width="48" height="70" rx="3"/></g>' +
    '<g transform="rotate(-6 50 84)"><rect class="s-paper s-back" x="26" y="14" width="48" height="70" rx="3"/></g>' +
    '<g transform="rotate(4 50 84)"><rect class="s-paper" x="26" y="14" width="48" height="70" rx="3"/>' +
      '<path class="s-detail" d="M34 25h18M34 35h32M34 43h32M34 51h32M34 59h24M34 67h30"/></g>' +
    '<g transform="translate(73 57) rotate(158)"><rect class="s-paper" x="-36" y="-4.5" width="50" height="9" rx="4"/>' +
      '<path d="M-10-4.5V4.5M-32-4.5Q-32-7-29-7H-15"/>' +
      '<path class="s-paper" d="M14-3.5L23-2.8V2.8L14 3.5Z"/>' +
      '<path class="s-accent s-paper" d="M23-3L27-5 37 0 27 5 23 3Z"/>' +
      '<path class="s-accent" d="M29 0H37"/>' +
      '<circle class="s-detail" cx="28" cy="0" r="1.1"/></g>',

  /* Bong bóng ý → phễu → dải câu viết ra */
  "writing-pipeline":
    '<g transform="rotate(-3 85 83)"><rect class="s-paper" x="58" y="76" width="54" height="14" rx="2"/>' +
      '<path class="s-accent" d="M76 84c2.5-3 4.5 2 7-1s4.5 2 7-1 4.5 2 7-1 4.5 2 7-1"/></g>' +
    '<path class="s-paper" d="M52 48L66 70V78H74V70L88 48A18 5 0 0 1 52 48Z"/>' +
    '<path class="s-shade" d="M52 48A18 5 0 0 1 88 48A18 5 0 0 1 52 48Z"/>' +
    '<path class="s-paper" d="M16 34A6 6 0 0 1 15 22A9 9 0 0 1 31 15A8 8 0 0 1 44 22A6 6 0 0 1 40 34Z"/>' +
    '<path class="s-detail" d="M20 26c3-3 5 2 8-1s5 2 8-1"/>' +
    '<circle class="s-paper" cx="47" cy="38.5" r="2.6"/>' +
    '<circle class="s-paper" cx="55" cy="42.5" r="1.8"/>'
});

Object.assign(window.ICON_DRAFTS.categories, {
  /* Ba khối xếp chồng — cấu trúc */
  "Grammar":
    '<path class="s-shade" d="M23 54L36 46H66L53 54Z"/>' +
    '<path class="s-paper" d="M23 54H53V84H23Z"/>' +
    '<path class="s-shade" d="M53 54L66 46H96L83 54Z"/>' +
    '<path class="s-paper" d="M53 54H83V84H53ZM83 54L96 46V76L83 84Z"/>' +
    '<path class="s-detail" d="M28 59h20v20H28ZM58 59h20v20H58Z"/>' +
    '<path class="s-accent s-shade" d="M38 24L51 16H81L68 24Z"/>' +
    '<path class="s-accent s-paper" d="M38 24H68V54H38ZM68 24L81 16V46L68 54Z"/>',

  /* Một tờ giấy có nét viết, bút chì nằm chéo */
  "Writing":
    '<g transform="rotate(-6 47 49)"><rect class="s-paper" x="20" y="12" width="54" height="74" rx="3"/>' +
      '<path class="s-detail" d="M28 24h24M28 34h36M28 44h36"/>' +
      '<path d="M28 64c3-4 5 3 8 0s5-3 8 0 5 3 8 0"/></g>' +
    '<g transform="translate(76.6 41.4) rotate(135)"><rect class="s-shade" x="-38" y="-5" width="10" height="10" rx="2.5"/>' +
      '<rect class="s-paper" x="-30" y="-5.5" width="7" height="11" rx="2"/>' +
      '<rect class="s-paper" x="-23" y="-5" width="41" height="10" rx="2"/>' +
      '<path class="s-detail" d="M-23 0H18"/>' +
      '<path class="s-accent s-paper" d="M18-5L31 0 18 5Z"/>' +
      '<path class="s-fill" d="M26.5-1.7L31 0 26.5 1.7Z"/></g>'
});
