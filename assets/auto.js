'use strict';

// All images and data are local. The line illustrations are schematic, not drawings for manufacture.
const artContainer = document.getElementById('productArt');
const springArt = artContainer.innerHTML;
const svg = (label, content) => `<svg viewBox="0 0 480 270" fill="none" role="img" aria-label="${label}">${content}</svg>`;
const bolts = Array.from({length: 8}, (_, i) => {
  const a = Math.PI * 2 * i / 8;
  return `<ellipse cx="${240 + Math.cos(a) * 126}" cy="${130 + Math.sin(a) * 59}" rx="5" ry="2.7" stroke="#6F7478" stroke-width="1.1"/>`;
}).join('');
const products = {
  spring: {number: '01', title: 'Рессорные полосы', art: springArt},
  wheel: {number: '02', title: 'Профили для колёс', art: svg('Схематическое изображение колёсного профиля', `
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="M100 115v39c0 44 63 79 140 79s140-35 140-79v-39" stroke="#111111" stroke-width="1.8"/>
      <path d="M114 116v33c0 39 56 67 126 67s126-28 126-67v-33" stroke="#6F7478" stroke-width="1.1"/>
      <ellipse cx="240" cy="115" rx="140" ry="78" fill="#F2F3F3" stroke="#A31616" stroke-width="2"/>
      <ellipse cx="240" cy="115" rx="125" ry="66" stroke="#A31616" stroke-width="1.2"/>
      <ellipse cx="240" cy="115" rx="108" ry="53" stroke="#111111" stroke-width="1.7"/>
      <path d="M135 128c13-25 55-43 105-43s92 18 105 43" stroke="#6F7478" stroke-width="1.2"/>
      <path d="M133 128c9 28 54 49 107 49s98-21 107-49" stroke="#6F7478" stroke-width="1.1"/>
      <path d="M240 37v-13M100 115H77m303 0h23M240 193v17" stroke="#6F7478" stroke-width=".7"/>
      <path d="M86 205v32m308-32v32M86 229h308" stroke="#6F7478" stroke-width=".7"/>
      <path d="m86 229 7-3v6l-7-3Zm308 0-7-3v6l7-3Z" fill="#6F7478" stroke="none"/>
    </g>`)},
  hinge: {number: '03', title: 'Петлевые изделия', art: svg('Схематическое изображение петлевых изделий', `
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="m144 73 118-27c66-13 102 39 63 85l-93 96-41-22 89-94c17-20 4-43-21-37l-99 24-16-25Z" stroke="#111111" stroke-width="1.8"/>
      <path d="m144 73-17 17 17 26 99-25c23-6 34 10 18 29l-87 91 17-6 89-94c17-20 4-43-21-37l-99 24-16-25Z" stroke="#6F7478" stroke-width="1.3"/>
      <path d="m127 90 17 26 99-25c23-6 34 10 18 29l-87 91 41 22 93-96c39-46 3-98-63-85L127 90Z" fill="#F2F3F3" stroke="#A31616" stroke-width="2"/>
      <path d="m151 103 96-24c44-10 67 22 40 54l-74 77-17-9 75-78c23-27 7-46-23-39l-94 23" stroke="#6F7478" stroke-width="1.2"/>
      <path d="M325 58h44m-30 0v165m-14 0h44" stroke="#6F7478" stroke-width=".7"/>
      <path d="m339 58-3 7h6l-3-7Zm0 165-3-7h6l-3 7Z" fill="#6F7478" stroke="none"/>
    </g>`)},
  ring: {number: '04', title: 'Поворотные круги', art: svg('Схематическое изображение поворотного круга', `
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="M89 130v22c0 43 68 78 151 78s151-35 151-78v-22" stroke="#111111" stroke-width="1.8"/>
      <path d="M89 142c0 43 68 78 151 78s151-35 151-78" stroke="#6F7478" stroke-width="1.2"/>
      <ellipse cx="240" cy="130" rx="151" ry="78" fill="#F2F3F3" stroke="#A31616" stroke-width="2"/>
      <ellipse cx="240" cy="130" rx="139" ry="70" stroke="#6F7478" stroke-width=".8"/>
      <ellipse cx="240" cy="130" rx="111" ry="51" stroke="#111111" stroke-width="1.8"/>
      <path d="M132 142c12-22 55-39 108-39s96 17 108 39" stroke="#6F7478" stroke-width="1.2"/>
      ${bolts}
      <path d="M240 38v25m0 135v41M75 130h30m270 0h30" stroke="#6F7478" stroke-width=".7"/>
      <path d="m115 47 44-20m-39 9 31 69m-14-80 31 69" stroke="#6F7478" stroke-width=".7"/>
    </g>`)},
  special: {number: '05', title: 'Профили для двигателя и КПП', art: svg('Схематическое изображение фасонного профиля', `
    <g stroke-linejoin="round" stroke-linecap="round">
      <path d="m85 101 150-64 150 50-150 65-150-51Z" stroke="#111111" stroke-width="1.7"/>
      <path d="M85 101v31l47 16v57l53 18v-57l50 17v-31L85 101Z" fill="#F2F3F3" stroke="#A31616" stroke-width="2.2"/>
      <path d="m235 152 150-65v31l-50 21v57l-150 27m50-40 150-65M185 166l150-27M132 148l25-10" stroke="#6F7478" stroke-width="1.5"/>
      <path d="m105 95 150-64M85 81V60m150-29V10M85 67l150-64M266 219l130-55m-13 35 17-40" stroke="#6F7478" stroke-width=".7"/>
      <path d="m85 67 6-6 2 5-8 1Zm150-64-6 6-2-5 8-1Z" fill="#6F7478" stroke="none"/>
    </g>`)},
};

const options = [...document.querySelectorAll('.product-option')];
let selectedProduct = 'spring';
function selectProduct(id) {
  if (!products[id]) return;
  selectedProduct = id;
  options.forEach(option => {
    const isActive = option.dataset.product === id;
    option.classList.toggle('is-active', isActive);
    option.querySelector('.product-toggle').setAttribute('aria-expanded', String(isActive));
    option.querySelector('.product-detail').hidden = !isActive;
  });
  artContainer.innerHTML = products[id].art;
  document.getElementById('viewerTitle').textContent = products[id].title;
  document.getElementById('viewerNumber').textContent = `${products[id].number} / 05`;
}
options.forEach((option, index) => {
  const toggle = option.querySelector('.product-toggle');
  toggle.addEventListener('click', () => selectProduct(option.dataset.product));
  toggle.addEventListener('keydown', e => {
    let next;
    if (e.key === 'ArrowDown') next = (index + 1) % options.length;
    if (e.key === 'ArrowUp') next = (index + options.length - 1) % options.length;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = options.length - 1;
    if (next !== undefined) {
      e.preventDefault();
      options[next].querySelector('.product-toggle').focus();
      selectProduct(options[next].dataset.product);
    }
  });
});
document.querySelectorAll('[data-select-product]').forEach(link => {
  link.addEventListener('click', () => selectProduct(link.dataset.selectProduct));
});

// Mobile navigation, including keyboard dismissal.
const menuToggle = document.getElementById('menuToggle');
const mainMenu = document.getElementById('mainMenu');
function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  mainMenu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-is-open', open);
}
menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
mainMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    menuToggle.focus();
  }
  if (e.key === 'Tab' && menuToggle.getAttribute('aria-expanded') === 'true') {
    const focusables = [...mainMenu.querySelectorAll('a'), menuToggle];
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {e.preventDefault(); last.focus();}
    else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); first.focus();}
  }
});
window.addEventListener('resize', () => {if (window.innerWidth > 1080) setMenu(false);});

// Scrollspy keeps the compact table of contents in sync.
const jumpLinks = [...document.querySelectorAll('.jump-links a')];
const pageSections = jumpLinks.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
function updateScrollspy() {
  const position = window.scrollY + (window.innerWidth > 800 ? 190 : 160);
  let current = 0;
  pageSections.forEach((section, i) => {if (section.offsetTop <= position) current = i;});
  jumpLinks.forEach((link, i) => {
    link.classList.toggle('active', current === i);
    if (current === i) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
  });
  scheduled = false;
}
window.addEventListener('scroll', () => {
  if (!scheduled) {scheduled = true; requestAnimationFrame(updateScrollspy);}
}, {passive: true});
updateScrollspy();

// The inquiry composer deliberately has no network request or simulated submission.
const form = document.getElementById('inquiryForm');
const result = document.getElementById('requestResult');
const productSelect = document.getElementById('productSelect');
const fileInput = document.getElementById('drawingFile');
const fileName = document.getElementById('fileName');
const removeFile = document.getElementById('removeFile');
const copyStatus = document.getElementById('copyStatus');
let requestText = '';
function editRequest() {
  result.hidden = true;
  form.hidden = false;
  copyStatus.textContent = '';
}
document.querySelectorAll('[data-inquiry]').forEach(button => {
  button.addEventListener('click', () => {
    editRequest();
    productSelect.value = button.dataset.inquiry;
    document.getElementById('request').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
});
document.getElementById('attachButton').addEventListener('click', () => fileInput.click());
function resetFile() {
  fileInput.value = '';
  fileName.textContent = 'PDF, DWG, STEP · до 20 МБ';
  removeFile.classList.remove('is-visible');
}
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) {resetFile(); return;}
  if (file.size > 20 * 1024 * 1024) {
    resetFile();
    fileName.textContent = 'Слишком большой файл. Выберите файл до 20 МБ.';
    fileName.setAttribute('role', 'status');
    return;
  }
  fileName.textContent = file.name;
  fileName.title = `${file.name} · файл не загружается на сервер`;
  removeFile.classList.add('is-visible');
});
removeFile.addEventListener('click', resetFile);
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const chosen = productSelect.options[productSelect.selectedIndex].textContent;
  requestText = [
    'ЗАПРОС В ОМУТНИНСКИЙ МЕТАЛЛУРГИЧЕСКИЙ ЗАВОД',
    'Отрасль: автомобилестроение',
    '',
    `Продукция: ${chosen}`,
    `Контактное лицо: ${String(data.get('name')).trim()}`,
    `E-mail: ${String(data.get('email')).trim()}`,
    data.get('company') ? `Компания: ${String(data.get('company')).trim()}` : '',
    data.get('phone') ? `Телефон: ${String(data.get('phone')).trim()}` : '',
    '',
    'Техническое задание:',
    String(data.get('message')).trim() || 'Требуется консультация по продукции.',
    '',
    fileInput.files[0] ? `Чертёж: ${fileInput.files[0].name} (приложить к письму отдельно).` : 'Чертёж: не указан.',
    '',
    'Запрос сформирован локально. Данные и файлы не отправлялись.',
  ].filter(line => line !== null).join('\n');
  document.getElementById('requestSummary').textContent = requestText;
  form.hidden = true;
  result.hidden = false;
  result.setAttribute('tabindex', '-1');
  result.focus({preventScroll: true});
});
document.getElementById('editRequest').addEventListener('click', () => {
  editRequest();
  document.getElementById('contactName').focus({preventScroll: true});
});
document.getElementById('downloadRequest').addEventListener('click', () => {
  const blob = new Blob(['\uFEFF' + requestText], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'omz-auto-request.txt';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
});
document.getElementById('copyRequest').addEventListener('click', async () => {
  let success = false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(requestText);
      success = true;
    }
  } catch (_) { /* Fallback for sandboxed previews below. */ }
  if (!success) {
    const area = document.createElement('textarea');
    area.value = requestText;
    area.style.cssText = 'position:fixed;left:-9999px;top:0';
    document.body.appendChild(area);
    area.select();
    try {success = document.execCommand('copy');} catch (_) {success = false;}
    area.remove();
  }
  copyStatus.textContent = success ? 'Текст запроса скопирован.' : 'Копирование недоступно. Используйте «Скачать запрос».';
});
