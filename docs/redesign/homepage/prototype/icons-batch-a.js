/* PROTOTYPE — batch A (Vocabulary). Gộp vào home-icons.js khi xong. */
(window.ICON_DRAFTS ||= { resources: {}, categories: {}, extras: {} });

(function () {
  /* Vòng 1–6: hai cuốn sổ chồng lệch, tab cạnh mang số vòng; chỉ đổi nhãn. */
  const notebooks = (a, b) =>
    '<g transform="rotate(6 67 41)"><rect class="s-shade s-back" x="47" y="15" width="46" height="58" rx="3"/>' +
      '<rect class="s-paper s-back" x="84" y="22" width="16" height="14" rx="2"/>' +
      '<rect class="s-paper s-back" x="44" y="12" width="46" height="58" rx="3"/>' +
      '<path class="s-back" d="M51 12V70"/>' +
      '<text class="s-text" x="95" y="33">' + a + '</text></g>' +
    '<g transform="rotate(-5 46 56)"><rect class="s-shade" x="23" y="29" width="46" height="58" rx="3"/>' +
      '<rect class="s-accent s-tint" x="60" y="44" width="16" height="14" rx="2"/>' +
      '<rect class="s-paper" x="20" y="26" width="46" height="58" rx="3"/>' +
      '<path d="M28 26V84"/>' +
      '<rect class="s-detail" x="36" y="38" width="22" height="10" rx="1.5"/>' +
      '<text class="s-text" x="71" y="55">' + b + '</text></g>';

  Object.assign(window.ICON_DRAFTS.resources, {
    "personal-flashcards":
      '<path class="s-shade" d="M14 50L28 40H104L90 50Z"/>' +
      '<rect class="s-paper s-back" x="30" y="27" width="64" height="28" rx="2"/>' +
      '<rect class="s-paper s-back" x="25" y="33" width="64" height="24" rx="2"/>' +
      '<path class="s-accent s-tint" d="M56 22V12.5Q56 10 58.5 10H70.5Q73 10 73 12.5V22Z"/>' +
      '<rect class="s-paper" x="19" y="16" width="64" height="42" rx="3"/>' +
      '<path class="s-detail" d="M27 26h22M27 33h34"/>' +
      '<path class="s-paper" d="M14 50H90V82H14Z"/>' +
      '<path class="s-shade" d="M90 50L104 40V72L90 82Z"/>' +
      '<rect class="s-detail" x="42" y="59" width="20" height="9" rx="1.5"/>',

    "vocab-1-2": notebooks('1', '2'),
    "vocab-3-4": notebooks('3', '4'),
    "vocab-5-6": notebooks('5', '6'),

    "vocab-writing":
      '<g transform="rotate(-4 56 48)"><rect class="s-shade" x="33" y="17" width="52" height="68" rx="3"/>' +
        '<rect class="s-paper" x="76" y="24" width="15" height="12" rx="2"/>' +
        '<rect class="s-paper" x="30" y="14" width="52" height="68" rx="3"/>' +
        '<path d="M38 14V82"/>' +
        '<rect class="s-detail" x="46" y="25" width="26" height="10" rx="1.5"/></g>' +
      '<g transform="translate(60 57) rotate(-38)">' +
        '<rect class="s-paper s-accent" x="-46" y="-4.5" width="10" height="9" rx="2"/>' +
        '<rect class="s-paper s-accent" x="-37" y="-4.5" width="62" height="9" rx="2"/>' +
        '<path class="s-detail" d="M-35 0H23"/>' +
        '<path class="s-paper s-accent" d="M25-4.5L40 0 25 4.5Z"/>' +
        '<path class="s-fill" d="M35-1.5L40 0 35 1.5Z"/></g>',

    "reading-translation":
      '<g transform="rotate(-7 38 50)"><rect class="s-paper s-back" x="14" y="22" width="46" height="58" rx="3"/>' +
        '<text class="s-text" x="29" y="38">EN</text>' +
        '<path class="s-detail" d="M21 48h28M21 55h22M21 62h26"/></g>' +
      '<g transform="rotate(5 78 58)"><rect class="s-paper" x="56" y="30" width="46" height="58" rx="3"/>' +
        '<text class="s-text" x="71" y="46">VI</text>' +
        '<path class="s-detail" d="M63 56h28M63 63h22M63 70h26"/></g>' +
      '<path class="s-accent" d="M30 16C42 5 66 5 80 21M73.4 18.8L80 21 78.6 14.2"/>',

    "confusing-words":
      '<g transform="rotate(-7 36 40)"><rect class="s-paper" x="10" y="22" width="52" height="34" rx="3"/>' +
        '<path d="M18 33h26"/><path class="s-detail" d="M18 43h18"/></g>' +
      '<g transform="rotate(5 66 56)"><rect class="s-paper" x="40" y="40" width="52" height="34" rx="3"/>' +
        '<path d="M48 51h26"/><path class="s-detail" d="M48 61h18"/></g>' +
      '<g transform="translate(58 44) rotate(45)"><rect class="s-paper" x="12" y="-2.5" width="7" height="5" rx="2"/>' +
        '<rect class="s-paper" x="18" y="-4.5" width="19" height="9" rx="3"/></g>' +
      '<circle class="s-paper s-accent" cx="58" cy="44" r="13"/>' +
      '<path d="M50 45h16"/>' +
      '<path class="s-detail" d="M51 39a8 8 0 0 1 6-4"/>',

    "root-atlas":
      '<path d="M60 50V20"/>' +
      '<path class="s-paper" d="M60 38C51 38 43 33 39 23C50 22 58 28 60 38Z"/>' +
      '<path class="s-paper s-accent" d="M60 31C63 22 71 15 84 15C81 26 72 32 60 31Z"/>' +
      '<path class="s-paper" d="M60 21C55 17 55 11 59 7C63 11 64 17 60 21Z"/>' +
      '<path class="s-detail" d="M44 26L58 36M80 18L63 29"/>' +
      '<path d="M14 50C30 48 44 51 60 49S90 48 106 50"/>' +
      '<path d="M60 50C61 60 58 70 56 84M59 57C51 61 42 63 34 72M60 59C68 62 78 65 86 75"/>' +
      '<path class="s-detail" d="M42 64C40 68 36 70 30 70M47 62L44 70M78 65L81 73M83 70C87 70 91 72 93 76M57 72L51 78M57 75L62 80"/>' +
      '<path class="s-shade s-back" d="M90 58c2-2 6-2 7 0s-1 4-4 4-5-2-3-4Z"/>',

    "c1-vocabulary": (function () {
      const cls = ['s-shade s-back', 's-paper s-back', 's-shade s-back', 's-paper s-back', 's-shade', 's-paper'];
      let out = '';
      for (let i = 0; i < 5; i++) {
        const x0 = 16 + 2 * (5 - i), x1 = x0 + 80, top = 50 - 6 * (5 - i), bot = top + 34, tl = x0 + 4 + 11 * (5 - i);
        out += '<path class="' + cls[i] + '" transform="rotate(' + (-15 + i * 4) + ' 60 70)" d="M' + x0 + ' ' + (top + 3) + 'Q' + x0 + ' ' + top + ' ' + (x0 + 3) + ' ' + top +
          'H' + tl + 'L' + (tl + 2) + ' ' + (top - 5) + 'H' + (tl + 14) + 'L' + (tl + 16) + ' ' + top +
          'H' + (x1 - 3) + 'Q' + x1 + ' ' + top + ' ' + x1 + ' ' + (top + 3) + 'V' + (bot - 3) + 'Q' + x1 + ' ' + bot + ' ' + (x1 - 3) + ' ' + bot +
          'H' + (x0 + 3) + 'Q' + x0 + ' ' + bot + ' ' + x0 + ' ' + (bot - 3) + 'Z"/>';
      }
      return out +
        '<g transform="rotate(5 60 70)"><path class="s-accent s-tint" d="M20 54L22 45H34L36 54Z"/>' +
        '<rect class="' + cls[5] + '" x="16" y="50" width="80" height="34" rx="3"/>' +
        '<text class="s-text" x="34" y="70">C1</text>' +
        '<path class="s-detail" d="M50 62h34M50 69h24M50 76h30"/></g>';
    })(),

    "ielts-collocations":
      '<path class="s-shade s-back" transform="translate(14 47)" d="M0 0H12C12-4 10-5 10-8C10-11 13-13 17-13S24-11 24-8C24-5 22-4 22 0H34V11C30 11 29 9 26 9S21 12 21 17 23 25 26 25 30 23 34 23V34H0Z"/>' +
      '<path class="s-paper" transform="translate(14 44)" d="M0 0H12C12-4 10-5 10-8C10-11 13-13 17-13S24-11 24-8C24-5 22-4 22 0H34V11C30 11 29 9 26 9S21 12 21 17 23 25 26 25 30 23 34 23V34H0Z"/>' +
      '<path class="s-detail" d="M20 70h12"/>' +
      '<g transform="translate(66 20) rotate(-10)">' +
        '<path class="s-shade s-back" transform="translate(0 3)" d="M0 0H34V34H23C23 30 25 29 25 26S22 21 17 21 9 23 9 26 11 30 11 34H0V23C-4 23-5 25-8 25S-13 22-13 17-11 9-8 9-4 11 0 11Z"/>' +
        '<path class="s-paper s-accent" d="M0 0H34V34H23C23 30 25 29 25 26S22 21 17 21 9 23 9 26 11 30 11 34H0V23C-4 23-5 25-8 25S-13 22-13 17-11 9-8 9-4 11 0 11Z"/></g>' +
      '<path class="s-detail" d="M57 58l-2 5M63 60l-2 5M69 61l-2 5"/>',

    "hiking-collocations":
      '<path class="s-shade s-back" d="M12 76L34 34L48 50L60 42L78 58L92 32L108 76Z"/>' +
      '<path class="s-paper" d="M10 84L30 60L40 66L62 26L84 60L96 52L110 84Z"/>' +
      '<path class="s-detail" d="M54 41l5 3 4-4 5 4M88 58l5-3 3 3"/>' +
      '<path class="s-accent s-dash" d="M30 82C44 80 54 76 50 70S60 62 58 56 66 46 63 40 62 32 62 30"/>' +
      '<path d="M62 26V11"/>' +
      '<path class="s-fill" d="M62 11L74 14.5 62 18Z"/>'
  });

  Object.assign(window.ICON_DRAFTS.categories, {
    "Vocabulary":
      '<g transform="rotate(-22 38 80)"><rect class="s-shade s-back" x="32" y="36" width="66" height="44" rx="3"/></g>' +
      '<g transform="rotate(-10 38 80)"><rect class="s-paper s-back" x="32" y="36" width="66" height="44" rx="3"/></g>' +
      '<g transform="rotate(3 38 80)"><rect class="s-paper" x="32" y="36" width="66" height="44" rx="3"/>' +
        '<text class="s-text" x="54" y="56">Aa</text>' +
        '<path class="s-accent" d="M45 63h18"/>' +
        '<path class="s-detail" d="M45 71h36"/></g>'
  });
})();
