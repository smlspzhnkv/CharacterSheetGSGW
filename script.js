
// tabs
document.querySelectorAll('.tab').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// stats
const stats = ['Сила','Ловкость','Интеллект','Восприятие','Харизма','Выносливость'];
const grid = document.getElementById('stat-grid');
const POOL_TOTAL = 15;
const STAT_MAX = 5;

stats.forEach((name, i)=>{
  const card = document.createElement('div');
  card.className = 'stat-card';
  card.innerHTML = `
    <p class="stat-name">${name}</p>
    <div class="stat-controls">
      <div class="stepper">
        <button onclick="stepStat(${i},1)">▲</button>
        <button onclick="stepStat(${i},-1)">▼</button>
      </div>
      <input type="number" id="stat-${i}" value="0" min="0" max="5" oninput="onStatInput(${i})">
    </div>
  `;
  grid.appendChild(card);
});
updatePool();

function currentSum(){
  let sum = 0;
  stats.forEach((_, i)=>{
    sum += parseInt(document.getElementById('stat-'+i).value) || 0;
  });
  return sum;
}

// sum of all stats EXCEPT the one at index `excludeIndex`
function otherSum(excludeIndex){
  let sum = 0;
  stats.forEach((_, i)=>{
    if(i !== excludeIndex){
      sum += parseInt(document.getElementById('stat-'+i).value) || 0;
    }
  });
  return sum;
}

function updatePool(){
  const remaining = POOL_TOTAL - currentSum();
  const el = document.getElementById('pool-remaining');
  el.textContent = remaining;
  el.classList.toggle('empty', remaining <= 0);
}

function stepStat(i, delta){
  const input = document.getElementById('stat-'+i);
  let v = parseInt(input.value) || 0;
  const others = otherSum(i);

  let newV = v + delta;
  newV = Math.max(0, Math.min(STAT_MAX, newV));

  // never let the total exceed the pool
  if(others + newV > POOL_TOTAL){
    newV = Math.max(0, POOL_TOTAL - others);
  }

  input.value = newV;
  updatePool();
}

function onStatInput(i){
  const input = document.getElementById('stat-'+i);
  let v = parseInt(input.value);
  if(isNaN(v) || v < 0) v = 0;
  v = Math.min(STAT_MAX, v);

  // clamp so total never exceeds the pool
  const others = otherSum(i);
  if(others + v > POOL_TOTAL){
    v = Math.max(0, POOL_TOTAL - others);
  }
  input.value = v;
  updatePool();
}

// dynamic rows for inventory
function addRow(containerId, withStat){
  const container = document.getElementById(containerId);
  const row = document.createElement('div');
  row.className = 'row-item';
  let inner = `<input type="text" placeholder="${withStat ? 'название навыка' : 'предмет'}">`;
  if(withStat){
    inner += `<select>
      <option>Сила</option><option>Ловкость</option><option>Интеллект</option>
      <option>Восприятие</option><option>Харизма</option><option>Выносливость</option>
    </select>`;
  }
  inner += `<button class="del-btn" onclick="this.parentElement.remove(); scheduleSave();">✕</button>`;
  row.innerHTML = inner;
  container.appendChild(row);
}

// seed a couple of empty inventory rows
addRow('inv-list', false);
addRow('inv-list', false);

// ---- skills (fixed list, checkbox yes/no, 7-point pool) ----
const SKILL_POOL_TOTAL = 7;
const skillGroups = [
  { attr:'Сила', skills:[
    {name:'Атлетика', desc:'бег, лазание, плавание, физическая выносливость в моменте'},
    {name:'Грубая сила', desc:'сдвинуть/поднять тяжёлое, проломить преграду'},
    {name:'Рукопашный бой', desc:'выломать дверь, удержать что-то тяжёлое, оттащить человека'}
  ]},
  { attr:'Ловкость', skills:[
    {name:'Скрытность', desc:'красться, прятаться, не привлекать внимание'},
    {name:'Акробатика', desc:'равновесие, увороты, залезть в труднодоступное место'},
    {name:'Вождение', desc:'машина, мотоцикл, велосипед'},
    {name:'Ловкость рук', desc:'карманная кража, фокусы, работа с мелкими предметами'}
  ]},
  { attr:'Выносливость', skills:[
    {name:'Стойкость к боли/усталости', desc:'не отключиться, продержаться на ногах'},
    {name:'Устойчивость к вредным воздействиям', desc:'алкоголь, яды, недосып, болезни'},
    {name:'Стрессоустойчивость', desc:'не поддаться на уговоры/давление'}
  ]},
  { attr:'Интеллект', skills:[
    {name:'Эрудиция', desc:'общие знания, факты, история, культура'},
    {name:'Дедукция', desc:'анализ улик, логические выводы, расследование'},
    {name:'Финансы/Юриспруденция', desc:'разобраться в документах, деньгах, законах'},
    {name:'Медицина', desc:'оказать помощь, разбираться в теле и болезнях'},
    {name:'Механика', desc:'чинить, разбирать, собирать технику'},
    {name:'Техника/IT', desc:'компьютеры, взлом, гаджеты, программирование'}
  ]},
  { attr:'Восприятие', skills:[
    {name:'Внимательность', desc:'заметить деталь, улику, слежку'},
    {name:'Психология', desc:'заметить ложь, считать эмоцию'},
    {name:'Устойчивость к заражению', desc:'как быстро персонаж поддаётся заражению во тьме'}
  ]},
  { attr:'Харизма', skills:[
    {name:'Убеждение', desc:'уговорить, переубедить'},
    {name:'Обман', desc:'соврать убедительно'},
    {name:'Запугивание', desc:'надавить, напугать'},
    {name:'Обаяние (Флирт)', desc:'расположить к себе, очаровать цель'}
  ]}
];

// flatten into a single indexed list, keeping track of which attribute each skill belongs to
const skillsData = [];
skillGroups.forEach(group=>{
  group.skills.forEach(skill=>{
    skillsData.push({ name: skill.name, desc: skill.desc, attr: group.attr });
  });
});

function buildSkills(){
  const container = document.getElementById('skills-container');
  skillGroups.forEach(group=>{
    const block = document.createElement('div');
    block.className = 'list-block';

    const h = document.createElement('h3');
    h.textContent = group.attr;
    block.appendChild(h);

    const list = document.createElement('div');
    list.className = 'skill-list';

    group.skills.forEach(skill=>{
      const idx = skillsData.findIndex(s=>s.name===skill.name && s.attr===group.attr);
      const row = document.createElement('div');
      row.className = 'skill-row';
      row.innerHTML = `
        <label class="skill-row-label">
          <input type="checkbox" id="skill-${idx}" onchange="onSkillToggle(${idx})">
          <span class="skill-name">${skill.name}</span>
        </label>
        <span class="skill-help">?
          <span class="tooltip">${skill.desc}</span>
        </span>
        <span class="skill-attr" id="skill-attr-${idx}">${group.attr}</span>
      `;
      list.appendChild(row);
    });

    block.appendChild(list);
    container.appendChild(block);
  });
}
buildSkills();

function skillCount(){
  let count = 0;
  skillsData.forEach((_, i)=>{
    if(document.getElementById('skill-'+i).checked) count++;
  });
  return count;
}

function updateSkillPool(){
  const remaining = SKILL_POOL_TOTAL - skillCount();
  const el = document.getElementById('skill-pool-remaining');
  el.textContent = remaining;
  el.classList.toggle('empty', remaining <= 0);
}

function updateSkillAttrLabel(i){
  const input = document.getElementById('skill-'+i);
  const label = document.getElementById('skill-attr-'+i);
  const attr = skillsData[i].attr;
  label.textContent = input.checked ? `${attr} + 1` : attr;
}

function onSkillToggle(i){
  const input = document.getElementById('skill-'+i);
  if(input.checked && skillCount() > SKILL_POOL_TOTAL){
    // no points left — revert the checkbox
    input.checked = false;
  }
  updateSkillAttrLabel(i);
  updateSkillPool();
}

updateSkillPool();

function toggleExample(){
  document.getElementById('example-box').classList.toggle('open');
}

// ================= PERSISTENCE LAYER =================
// Uses the artifact's persistent key-value storage so data survives closing
// the page. Falls back to an in-memory store (current session only) if that
// storage API isn't available in this environment.
const hasStorage = (typeof window.storage !== 'undefined');
const memoryStore = {};

async function storageGet(key){
  if(hasStorage){
    try{
      const r = await window.storage.get(key);
      return r ? r.value : null;
    }catch(e){
      return null;
    }
  }
  return Object.prototype.hasOwnProperty.call(memoryStore, key) ? memoryStore[key] : null;
}

function sleep(ms){ return new Promise(res=>setTimeout(res, ms)); }

async function storageSet(key, value){
  if(hasStorage){
    const MAX_ATTEMPTS = 3;
    for(let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++){
      try{
        await window.storage.set(key, value);
        return true; // success
      }catch(e){
        console.error('storage set failed (attempt '+attempt+')', e);
        if(attempt < MAX_ATTEMPTS){
          await sleep(attempt * 500); // 500ms, then 1000ms
        }
      }
    }
    return false; // all attempts failed
  }
  memoryStore[key] = value;
  return true;
}

async function storageDelete(key){
  if(hasStorage){
    try{
      await window.storage.delete(key);
    }catch(e){
      /* key may not exist — ignore */
    }
  } else {
    delete memoryStore[key];
  }
}

// ================= CASE INDEX =================
const CASES_INDEX_KEY = 'cases_index';

async function loadIndex(){
  const raw = await storageGet(CASES_INDEX_KEY);
  if(!raw) return [];
  try{
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  }catch(e){
    return [];
  }
}

async function saveIndex(list){
  await storageSet(CASES_INDEX_KEY, JSON.stringify(list));
}

function escapeHtml(str){
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

async function renderCaseList(){
  const list = await loadIndex();
  list.sort((a,b)=> (b.updated||0) - (a.updated||0));
  const container = document.getElementById('case-list');
  const emptyMsg = document.getElementById('case-list-empty');
  container.innerHTML = '';

  if(list.length === 0){
    emptyMsg.style.display = 'block';
    return;
  }
  emptyMsg.style.display = 'none';

  list.forEach(item=>{
    const row = document.createElement('div');
    row.className = 'case-row';
    const dateStr = item.updated
      ? new Date(item.updated).toLocaleString('ru-RU', {day:'2-digit', month:'2-digit', year:'numeric', hour:'2-digit', minute:'2-digit'})
      : '';
    row.innerHTML = `
      <div class="case-row-main">
        <span class="case-row-title">${escapeHtml(item.title)}</span>
        <span class="case-row-date">обновлено: ${dateStr}</span>
      </div>
      <div class="case-row-actions">
        <button class="roll-btn" type="button">Открыть</button>
        <button class="del-btn" type="button">удалить</button>
      </div>
    `;
    row.querySelector('.roll-btn').addEventListener('click', ()=> openCase(item.id));
    row.querySelector('.del-btn').addEventListener('click', (e)=> handleDeleteClick(e.currentTarget, item.id));
    container.appendChild(row);
  });
}

function handleDeleteClick(btn, id){
  if(btn.dataset.confirm === '1'){
    deleteCase(id);
  } else {
    btn.dataset.confirm = '1';
    const original = btn.textContent;
    btn.textContent = 'точно?';
    setTimeout(()=>{
      btn.dataset.confirm = '';
      btn.textContent = original;
    }, 2500);
  }
}

async function deleteCase(id){
  let list = await loadIndex();
  list = list.filter(c=>c.id !== id);
  await saveIndex(list);
  await storageDelete('case_' + id);
  renderCaseList();
}

async function createCase(){
  const input = document.getElementById('new-case-title');
  const title = input.value.trim();
  if(!title){
    input.focus();
    return;
  }
  const id = 'c' + Date.now() + Math.random().toString(36).slice(2,8);
  const list = await loadIndex();
  list.push({ id, title, updated: Date.now() });
  await saveIndex(list);
  input.value = '';
  await openCase(id);
}

// ================= STATE (COLLECT / APPLY) =================
function fieldVal(id){
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function setFieldVal(id, v){
  const el = document.getElementById(id);
  if(el) el.value = v || '';
}

function collectState(){
  return {
    info: {
      name: fieldVal('field-name'),
      age: fieldVal('field-age'),
      job: fieldVal('field-job'),
      unit: fieldVal('field-unit'),
      appearance: fieldVal('field-appearance'),
      nickname: fieldVal('field-nickname'),
      background: fieldVal('field-background'),
      strength: fieldVal('field-strength'),
      weakness: fieldVal('field-weakness'),
      goal: fieldVal('field-goal')
    },
    stats: stats.map((_, i)=> parseInt(document.getElementById('stat-'+i).value) || 0),
    skills: skillsData.map((_, i)=> document.getElementById('skill-'+i).checked),
    inventory: Array.from(document.querySelectorAll('#inv-list .row-item input[type=text]')).map(inp=>inp.value),
    notes: {
      connections: fieldVal('field-connections'),
      freeNotes: fieldVal('field-freenotes')
    }
  };
}

function applyState(state){
  state = state || {};
  const info = state.info || {};
  setFieldVal('field-name', info.name);
  setFieldVal('field-age', info.age);
  setFieldVal('field-job', info.job);
  setFieldVal('field-unit', info.unit);
  setFieldVal('field-appearance', info.appearance);
  setFieldVal('field-nickname', info.nickname);
  setFieldVal('field-background', info.background);
  setFieldVal('field-strength', info.strength);
  setFieldVal('field-weakness', info.weakness);
  setFieldVal('field-goal', info.goal);

  stats.forEach((_, i)=>{
    const v = (state.stats && state.stats[i] != null) ? state.stats[i] : 0;
    document.getElementById('stat-'+i).value = v;
  });
  updatePool();

  skillsData.forEach((_, i)=>{
    const checked = !!(state.skills && state.skills[i]);
    document.getElementById('skill-'+i).checked = checked;
    updateSkillAttrLabel(i);
  });
  updateSkillPool();

  const invList = document.getElementById('inv-list');
  invList.innerHTML = '';
  const items = (state.inventory && state.inventory.length) ? state.inventory : ['', ''];
  items.forEach(itemVal=>{
    addRow('inv-list', false);
    const inputs = invList.querySelectorAll('.row-item input[type=text]');
    inputs[inputs.length - 1].value = itemVal;
  });

  const notes = state.notes || {};
  setFieldVal('field-connections', notes.connections);
  setFieldVal('field-freenotes', notes.freeNotes);
}

// ================= OPEN / SAVE / BACK =================
let currentCaseId = null;
let saveTimer = null;

async function openCase(id){
  currentCaseId = id;

  const raw = await storageGet('case_' + id);
  let state = null;
  if(raw){
    try{ state = JSON.parse(raw); }catch(e){ state = null; }
  }
  applyState(state);

  const list = await loadIndex();
  const item = list.find(c=>c.id === id);
  document.getElementById('case-title-bar').textContent = item ? item.title : '';
  setSaveStatus('', false);

  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
  document.querySelector('.tab[data-tab="t-info"]').classList.add('active');
  document.getElementById('t-info').classList.add('active');

  document.getElementById('screen-list').classList.remove('active');
  document.getElementById('screen-case').classList.add('active');
}

function setSaveStatus(text, isError){
  const el = document.getElementById('save-status');
  if(!el) return;
  el.textContent = text;
  el.style.color = isError ? 'var(--stamp-red)' : 'var(--ink-soft)';
}

async function saveCurrentCase(){
  if(!currentCaseId) return;
  setSaveStatus('сохраняем…', false);
  const state = collectState();
  const ok = await storageSet('case_' + currentCaseId, JSON.stringify(state));
  if(!ok){
    setSaveStatus('ошибка сохранения — повторим при следующем изменении', true);
    return;
  }
  const list = await loadIndex();
  const item = list.find(c=>c.id === currentCaseId);
  if(item){
    item.updated = Date.now();
    await saveIndex(list);
  }
  setSaveStatus('сохранено', false);
}

function scheduleSave(){
  if(!currentCaseId) return;
  setSaveStatus('изменено…', false);
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveCurrentCase, 600);
}

async function goBackToList(){
  clearTimeout(saveTimer);
  await saveCurrentCase();
  currentCaseId = null;
  document.getElementById('screen-case').classList.remove('active');
  document.getElementById('screen-list').classList.add('active');
  renderCaseList();
}

// autosave on any change within an open case (event delegation covers
// dynamically-created stat/skill/inventory elements too)
document.getElementById('screen-case').addEventListener('input', scheduleSave);
document.getElementById('screen-case').addEventListener('change', scheduleSave);

// initial render of the case archive
renderCaseList();
