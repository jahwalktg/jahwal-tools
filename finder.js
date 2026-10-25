/* 첫 화면 「무엇을 하려고 하나요?」 — 하고 싶은 일로 찾기 · 내 업무로 보기 · 내 도구함(☆·최근)
   카드(.card[data-id])를 읽어서 그린다. 새 도구는 카드만 넣으면 이름·설명으로 찾아지고, 일의 말로도 찾히게 하려면 아래 KW에 한 줄.
   업무별 묶음은 ROLES. ☆·최근은 이 브라우저에만 저장(jahwal-tools.mybox.v1). 아무것도 보내지 않는다. */
(function () {
  var KW = {
    'quote-calculator': '견적 견적서 납품 단가표 공급가 부가세 합계 거래처 청소용역 도시락 납품견적',
    'cost-calculator': '원가 제조원가 재료비 인건비 경비 제품가격 단가산정 원가계산',
    'margin-calculator': '마진 판매가 이익률 가격정하기 단가 마진율',
    'vat-reverse': '부가세 공급가액 역산 영수증 세금계산서 10% 나누기 부가가치세',
    'work-hours': '지각 조퇴 외출 근무시간 인정시간 30분 월차 주차 급여차감 근태 참여자급여',
    'date-calc': '나이 만나이 생년월일 연령 기간 일수 개월수 평일수 공휴일 디데이 몇일 몇개월 계약기간 참여기간 60세 65세 34세 청년 기한계산',
    'edu-hours': '교육시간 직무교육 소양교육 이수 성과평가 교육이수 부족시간',
    'eval-score': '성과평가 평가점수 지표 실적 배점 총점 평가준비',
    'social-insurance': '4대보험 사회보험 국민연금 건강보험 고용보험 산재 보험료 공제 기관부담',
    'savings-account': '희망저축 청년내일저축 자산형성 통장 만기 적립 청년희망키움 청년저축',
    'budget-plan': '예산 사업계획 인건비 사업비 총사업비 내년예산 월별예산 근무일',
    'budget-check': '집행률 보조금 사업비비율 70:30 집행점검 정산 남은사업비',
    'startup-wage': '자활기업 한시적인건비 인건비지원 전문인력 지원기간',
    'forms': '서식 양식 한글파일 hwp 지침서식 서식번호 동의서 신청서',
    'forms-sit': '서식 상황 조건부수급자 의뢰 증명서 종결 배치 상담불응 무슨서식',
    'forms-fill': '서식채우기 자동입력 서식꾸러미 gateway 입소 참여확인서 증명서 발급',
    'repeat-checklist': '할일 반복업무 체크리스트 매일 매주 매달 업무목록 루틴',
    'deadline-board': '기한 마감 디데이 신고기한 부가세신고 원천세 보고기한 일정',
    'leave-tracker': '연차 휴가 직원휴가 잔여연차 휴가관리 입사일',
    'list-compare': '명단대조 명단비교 중복찾기 빠진사람 누락 두명단 비교 대상자확인',
    'group-maker': '조편성 조나누기 모둠 팀나누기 교육조',
    'random-pick': '추첨 제비뽑기 룰렛 사다리 뽑기 경품',
    'survey-tally': '설문 만족도 집계 응답 결과 통계 설문지',
    'show-vote': '투표 거수 회의 안건 과반 의결',
    'form-overlay': '양식 덧쓰기 입력칸 종이양식 인쇄위치 틀',
    'mask-privacy': '개인정보 가리기 마스킹 비식별 이름가리기 주민번호 전화번호 상담기록 ai에넣기전',
    'cert-print': '수료증 상장 명찰 이름표 명패 일괄인쇄 교육수료',
    'labels': '라벨 주소라벨 우편 발송 스티커 우편번호 봉투 연하장발송',
    'file-tools': 'pdf나누기 pdf합치기 수료증나누기 사진합치기 용량줄이기 파일이름 10mb 스캔',
    'attendance': '출석부 출석 서명 교육출석 출석집계 자필서명',
    'press': '보도자료 언론 기사 홍보문 신문',
    'newsletter': '소식지 웹진 카드뉴스 sns 홍보물 사진배치',
    'greeting': '연하장 송년 새해인사 초대장 추석 설 감사카드 인사장',
    'map': '약도 오시는길 지도 위치안내 찾아오는길',
    'face-mask': '얼굴가리기 모자이크 초상권 사진동의 블러 홍보사진',
    'excel': '엑셀 함수 vlookup 수식 sumif countif 나이계산 오류 #n/a',
    'shortcuts': '단축키 캡처 복사 붙여넣기 한글단축키 엑셀단축키 키보드',
    'qr': 'qr 큐알 설문링크 와이파이 명함 신청서링크',
    'safety': '안전표지 경고표지 금지표지 미끄럼주의 안전보건표지 표지판',
    'safety-pack': '안전점검 위험성평가 사업단안전 작업전점검 청소 세차 식당',
    'safety-post': '비상연락망 경영방침 대피안내 msds 아차사고 안전게시물 점검대비',
    'safety-links': '안전포스터 안전교육자료 산업안전 공단자료',
    'ai-howto': 'ai 인공지능 챗gpt 클로드 주문서 프롬프트 사용법',
    'prompt-minutes': '회의록 회의정리 ai회의록',
    'prompt-survey': '설문보고서 결과보고 만족도보고서',
    'prompt-notice': '공문 안내문 공문초안 가정통신문 안내장',
    'prompt-directions': '오시는길 안내문 길안내',
    'prompt-participant': '참여자안내문 쉬운설명 급여설명',
    'prompt-guide': '지침질문 지침찾기 자활사업안내 노트북lm',
    'form-prompt': '양식입력 입력창만들기 ai양식',
    'meeting-timer': '회의시간 타이머 안건시간',
    'break-timer': '쉬는시간 휴식 교육재개 타이머',
    'focus-timer': '집중 뽀모도로 타이머',
    'break-reminder': '스트레칭 휴식알림 눈쉬기',
    'ref-guide': '지침 자활사업안내 pdf 기초생활보장 사업안내 쪽수',
    'ref-links': '사업자등록 영업신고 허가 통신판매 협동조합 자활기업설립',
    'ref-sites': '사이트 홈택스 자활정보시스템 복지로 바로가기',
    'ref-income': '중위소득 수급자격 생계급여 선정기준 근로소득공제 자활특례 소득인정액',
    'rates': '기준값 단가 요율 중위소득 공휴일 올해숫자 새해 2027 바뀐숫자'
  };
  var ROLES = [
    ['acct', '회계·예산', ['quote-calculator', 'vat-reverse', 'cost-calculator', 'margin-calculator', 'budget-plan', 'budget-check', 'social-insurance', 'startup-wage', 'deadline-board', 'rates', 'excel']],
    ['unit', '사업단 운영(팀장)', ['work-hours', 'budget-plan', 'budget-check', 'quote-calculator', 'cost-calculator', 'social-insurance', 'safety-pack', 'repeat-checklist', 'date-calc', 'attendance']],
    ['case', '참여자·사례관리', ['forms-sit', 'forms-fill', 'date-calc', 'ref-income', 'savings-account', 'work-hours', 'prompt-participant', 'mask-privacy', 'list-compare', 'edu-hours']],
    ['edu', '교육·행사', ['attendance', 'cert-print', 'file-tools', 'labels', 'group-maker', 'random-pick', 'survey-tally', 'break-timer', 'greeting', 'map']],
    ['promo', '홍보', ['press', 'newsletter', 'greeting', 'face-mask', 'map', 'qr', 'mask-privacy']],
    ['admin', '행정·총무', ['leave-tracker', 'deadline-board', 'repeat-checklist', 'prompt-notice', 'prompt-minutes', 'meeting-timer', 'show-vote', 'labels', 'excel', 'shortcuts']],
    ['eval', '평가·실적', ['eval-score', 'edu-hours', 'survey-tally', 'prompt-survey', 'list-compare', 'rates']],
    ['safe', '안전', ['safety', 'safety-pack', 'safety-post', 'safety-links']]
  ];
  var QUICK = ['월차·지각 계산', '견적서', '만 나이', '명단 대조', '수료증 나누기', '주소 라벨', '서식', '4대보험', '연하장', '안전표지'];
  var KEY = 'jahwal-tools.mybox.v1';

  var root = document.getElementById('finder'); if (!root) return;
  function load() { try { var o = JSON.parse(localStorage.getItem(KEY) || '{}'); return { star: Array.isArray(o.star) ? o.star : [], recent: Array.isArray(o.recent) ? o.recent : [] }; } catch (e) { return { star: [], recent: [] }; } }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(M)); } catch (e) {} }
  var M = load();
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function norm(s) { return String(s || '').toLowerCase().replace(/[\s·・,.()「」『』\-_/]+/g, ''); }

  /* 카드 읽기 */
  var T = {}, ORDER = [];
  document.querySelectorAll('section.group .card[data-id]').forEach(function (c) {
    var id = c.getAttribute('data-id'); if (T[id]) return;
    var g = c.closest('section.group'), gh = g && g.querySelector('h2');
    var a = c.querySelector('a.open'), p = c.querySelector('p');
    T[id] = { id: id, title: c.getAttribute('data-title') || (c.querySelector('h3') || {}).textContent || id, desc: p ? p.textContent.trim() : '', href: a ? a.getAttribute('href') : '#', group: gh ? gh.textContent.trim() : '', gid: g ? g.id : '', el: c };
    ORDER.push(id);
  });

  /* ---------- 화면 ---------- */
  root.innerHTML =
    '<h2 class="fd-h">무엇을 하려고 하나요?</h2>' +
    '<div class="fd-q"><input type="search" id="fdQ" placeholder="하고 싶은 일로 찾기 — 예: 월차 계산, 견적서, 수료증 나누기, 60세 이상" aria-label="하고 싶은 일로 도구 찾기" autocomplete="off"></div>' +
    '<div class="fd-chips" id="fdQuick" aria-label="자주 찾는 일"></div>' +
    '<div class="fd-roles"><span class="fd-lbl">내 업무로 보기</span><div class="fd-chips" id="fdRoles"></div></div>' +
    '<div id="fdRes" class="fd-res" aria-live="polite"></div>' +
    '<div class="fd-box"><span class="fd-lbl">내 도구함</span><div id="fdMine" class="fd-mine"></div></div>';
  var Q = document.getElementById('fdQ'), RES = document.getElementById('fdRes'), MINE = document.getElementById('fdMine');
  var mode = null; /* 'q' 또는 역할 id */

  QUICK.forEach(function (q) { var b = document.createElement('button'); b.type = 'button'; b.textContent = q; b.addEventListener('click', function () { Q.value = q.replace(/·/g, ' '); run(); Q.focus(); }); document.getElementById('fdQuick').appendChild(b); });
  ROLES.forEach(function (r) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = r[1]; b.dataset.role = r[0];
    b.addEventListener('click', function () { if (mode === r[0]) { mode = null; draw([]); markRoles(); return; } mode = r[0]; Q.value = ''; draw(r[2].filter(function (id) { return T[id]; }).map(function (id) { return { id: id }; }), r[1] + ' 업무에 자주 쓰는 도구'); markRoles(); });
    document.getElementById('fdRoles').appendChild(b);
  });
  function markRoles() { document.querySelectorAll('#fdRoles button').forEach(function (b) { b.className = b.dataset.role === mode ? 'on' : ''; b.setAttribute('aria-pressed', b.dataset.role === mode ? 'true' : 'false'); }); }

  function search(q) {
    var toks = q.split(/\s+/).map(norm).filter(function (t) { return t.length >= 1; });
    if (!toks.length) return [];
    var out = [];
    ORDER.forEach(function (id) {
      var t = T[id], ti = norm(t.title), kw = (KW[id] || '').split(/\s+/).map(norm), de = norm(t.desc), sc = 0, why = [];
      for (var i = 0; i < toks.length; i++) {
        var k = toks[i], s = 0;
        if (ti.indexOf(k) >= 0) s = 6;
        var hit = kw.filter(function (w) { return w && (w.indexOf(k) >= 0 || (k.length >= 2 && k.indexOf(w) >= 0 && w.length >= 2)); });
        if (hit.length) { s = Math.max(s, hit.indexOf(k) >= 0 ? 5 : 4); why.push(hit.indexOf(k) >= 0 ? k : hit[0]); }
        if (!s && de.indexOf(k) >= 0) s = 1;
        if (!s) return; /* 낱말마다 어딘가에는 맞아야 함 */
        sc += s;
      }
      out.push({ id: id, sc: sc, why: why });
    });
    out.sort(function (a, b) { return b.sc - a.sc || ORDER.indexOf(a.id) - ORDER.indexOf(b.id); });
    return out.slice(0, 8);
  }
  function item(id, why) {
    var t = T[id]; var on = M.star.indexOf(id) >= 0;
    return '<li><a class="fd-go" href="' + esc(t.href) + '" data-id="' + esc(id) + '"><b>' + esc(t.title) + '</b><span class="fd-g">' + esc(t.group) + '</span><span class="fd-d">' + esc(t.desc.length > 70 ? t.desc.slice(0, 70) + '…' : t.desc) + '</span>' + (why && why.length ? '<span class="fd-w">찾은 말: ' + esc(why.join(', ')) + '</span>' : '') + '</a>' +
      '<button type="button" class="fd-star' + (on ? ' on' : '') + '" data-star="' + esc(id) + '" aria-pressed="' + on + '" title="' + (on ? '내 도구함에서 빼기' : '내 도구함에 넣기') + '">' + (on ? '★' : '☆') + '</button></li>';
  }
  function draw(list, head) {
    if (!list.length && !head) { RES.innerHTML = ''; return; }
    RES.innerHTML = (head ? '<p class="fd-head">' + esc(head) + '</p>' : '') + (list.length ? '<ul class="fd-list">' + list.map(function (x) { return item(x.id, x.why); }).join('') + '</ul>' :
      '<p class="fd-none">맞는 도구를 못 찾았어요. 다른 말로 찾아보거나 <a href="./toolmap/index.html">전체 도구 지도</a>를 보세요. 이런 도구가 있으면 좋겠다면 아래 「의견·문의」로 알려 주세요.</p>');
  }
  function run() { var q = Q.value.trim(); mode = null; markRoles(); if (!q) { draw([]); return; } var r = search(q); draw(r, r.length ? '「' + q + '」 — ' + r.length + '개' : null); if (!r.length) draw([], '「' + q + '」'); }
  var timer; Q.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 150); });
  Q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var a = RES.querySelector('a.fd-go'); if (a) { e.preventDefault(); a.click(); } } if (e.key === 'Escape') { Q.value = ''; run(); } });

  /* ☆ / 최근 */
  function toggleStar(id) { var i = M.star.indexOf(id); if (i >= 0) M.star.splice(i, 1); else M.star.unshift(id); save(); drawMine(); syncCardStars(); RES.querySelectorAll('[data-star="' + id + '"]').forEach(function (b) { var on = M.star.indexOf(id) >= 0; b.className = 'fd-star' + (on ? ' on' : ''); b.textContent = on ? '★' : '☆'; b.setAttribute('aria-pressed', on); }); }
  function touch(id) { if (!T[id]) return; M.recent = [id].concat(M.recent.filter(function (x) { return x !== id; })).slice(0, 6); save(); }
  function drawMine() {
    var star = M.star.filter(function (id) { return T[id]; }), rec = M.recent.filter(function (id) { return T[id] && star.indexOf(id) < 0; }).slice(0, 5);
    if (!star.length && !rec.length) { MINE.innerHTML = '<p class="fd-hint">카드의 ☆을 누르면 자주 쓰는 도구가 여기 모입니다. 최근 연 도구도 여기에 보여요. (이 브라우저에만 기억)</p>'; return; }
    function chip(id, kind) { return '<a class="fd-chip ' + kind + '" href="' + esc(T[id].href) + '" data-id="' + esc(id) + '">' + (kind === 'st' ? '★ ' : '') + esc(T[id].title) + '</a>'; }
    MINE.innerHTML = star.map(function (id) { return chip(id, 'st'); }).join('') + (rec.length ? '<span class="fd-sep">최근</span>' + rec.map(function (id) { return chip(id, 're'); }).join('') : '');
  }
  root.addEventListener('click', function (e) {
    var s = e.target.closest('[data-star]'); if (s) { e.preventDefault(); toggleStar(s.getAttribute('data-star')); return; }
    var a = e.target.closest('a[data-id]'); if (a) touch(a.getAttribute('data-id'));
  });
  /* 카드에 ☆ 단추 + 「열기」 누르면 최근에 */
  function syncCardStars() { ORDER.forEach(function (id) { var b = T[id].el.querySelector('.fd-cstar'); if (!b) return; var on = M.star.indexOf(id) >= 0; b.textContent = on ? '★' : '☆'; b.className = 'fd-cstar' + (on ? ' on' : ''); b.setAttribute('aria-pressed', on); b.title = on ? '내 도구함에서 빼기' : '내 도구함에 넣기'; }); }
  ORDER.forEach(function (id) {
    var c = T[id].el; if (c.querySelector('.fd-cstar')) return;
    var b = document.createElement('button'); b.type = 'button'; b.className = 'fd-cstar'; b.setAttribute('aria-label', T[id].title + ' 내 도구함에 넣기·빼기');
    b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); toggleStar(id); });
    c.appendChild(b);
    var a = c.querySelector('a.open'); if (a) a.addEventListener('click', function () { touch(id); });
  });
  syncCardStars(); drawMine();

  var css = '#finder{margin:4px 0 16px;padding:16px;border-radius:16px;border:1.5px solid var(--line,#D5DCE8);background:var(--surface,#fff)}' +
    '#finder .fd-h{margin:0 0 8px;font-size:20px}' +
    '#finder .fd-q input{width:100%;min-height:52px;padding:10px 14px;border-radius:12px;border:2px solid var(--blue,#1A6EFF);background:var(--surface,#fff);color:inherit;font:inherit;font-size:17px}' +
    '#finder .fd-chips{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 0}' +
    '#finder .fd-chips button{min-height:36px;padding:0 12px;border-radius:999px;border:1.5px solid var(--line,#D5DCE8);background:var(--surface,#fff);color:inherit;font:inherit;font-size:14px;font-weight:600;cursor:pointer}' +
    '#finder .fd-chips button.on{background:var(--blue,#1A6EFF);border-color:var(--blue,#1A6EFF);color:var(--btn-text,#fff)}' +
    '#finder .fd-roles{margin-top:10px}#finder .fd-lbl{display:block;font-size:13px;font-weight:700;color:var(--muted,#5A6478);margin:0 0 2px}' +
    '#finder .fd-res:empty{display:none}#finder .fd-res{margin-top:12px}' +
    '#finder .fd-head{margin:0 0 6px;font-weight:700;font-size:15px}' +
    '#finder .fd-list{list-style:none;margin:0;padding:0;display:grid;gap:8px;grid-template-columns:repeat(auto-fill,minmax(260px,1fr))}' +
    '#finder .fd-list li{position:relative;border:1.5px solid var(--line,#D5DCE8);border-radius:12px;background:var(--bg,#F3F6FC)}' +
    '#finder .fd-go{display:flex;flex-direction:column;gap:2px;padding:10px 44px 10px 12px;color:inherit;text-decoration:none;min-height:64px}' +
    '#finder .fd-go:hover b{text-decoration:underline}#finder .fd-go b{font-size:16px}' +
    '#finder .fd-g{font-size:12px;font-weight:700;color:var(--blue,#1A6EFF)}#finder .fd-d{font-size:13px;color:var(--muted,#5A6478)}#finder .fd-w{font-size:12px;color:var(--muted,#5A6478)}' +
    '#finder .fd-star{position:absolute;top:6px;right:6px;width:36px;height:36px;border-radius:50%;border:0;background:transparent;color:var(--muted,#5A6478);font-size:20px;cursor:pointer}' +
    '#finder .fd-star.on{color:#E8A400}' +
    '#finder .fd-none,#finder .fd-hint{margin:0;font-size:14px;color:var(--muted,#5A6478)}#finder .fd-none a{color:inherit}' +
    '#finder .fd-box{margin-top:12px;padding-top:10px;border-top:1px dashed var(--line,#D5DCE8)}' +
    '#finder .fd-mine{display:flex;flex-wrap:wrap;gap:6px;align-items:center}' +
    '#finder .fd-chip{display:inline-flex;align-items:center;min-height:36px;padding:0 12px;border-radius:999px;border:1.5px solid var(--line,#D5DCE8);background:var(--bg,#F3F6FC);color:inherit;text-decoration:none;font-size:14px;font-weight:600}' +
    '#finder .fd-chip.st{border-color:#E8A400}#finder .fd-sep{font-size:12px;color:var(--muted,#5A6478);margin:0 2px 0 6px}' +
    '.card{position:relative}.fd-cstar{position:absolute;top:8px;right:8px;z-index:2;width:38px;height:38px;border-radius:50%;border:1.5px solid var(--line,#D5DCE8);background:var(--surface,#fff);color:var(--muted,#5A6478);font-size:19px;line-height:1;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,.12)}' +
    '.fd-cstar.on{color:#E8A400;border-color:#E8A400}' +
    '@media (max-width:600px){#finder{padding:12px}#finder .fd-d{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}#finder .fd-go{min-height:0}}' +
    '@media print{#finder,.fd-cstar{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  window.JT_FINDER = { search: search, roles: ROLES, kw: KW };
})();
