
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;600&display=swap');

:root{
  --paper: #e9e4d6;
  --paper-dark: #dcd5c2;
  --ink: #23241f;
  --ink-soft: #4a4a42;
  --stamp-red: #a2372f;
  --folder-gold: #a1793c;
  --line: #b9b099;
}

*{box-sizing:border-box;}
body{
  margin:0;
  background: var(--paper-dark);
  font-family:'IBM Plex Sans', sans-serif;
  color:var(--ink);
  padding:24px;
}

.dossier{
  max-width:900px;
  margin:0 auto;
  background:
    linear-gradient(var(--paper), var(--paper)) padding-box;
  border:1px solid var(--line);
  box-shadow: 0 12px 40px rgba(0,0,0,.25);
  position:relative;
}

/* header */
.header{
  padding:28px 32px 18px 32px;
  border-bottom:2px solid var(--ink);
  position:relative;
}
.eyebrow{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:.18em;
  color:var(--ink-soft);
  text-transform:uppercase;
}
.title{
  font-family:'Special Elite', monospace;
  font-size:32px;
  margin:4px 0 0 0;
  letter-spacing:.02em;
}
.stamp{
  position:absolute;
  top:22px; right:28px;
  border:3px solid var(--stamp-red);
  color:var(--stamp-red);
  font-family:'Special Elite', monospace;
  font-size:13px;
  padding:5px 10px;
  transform:rotate(-8deg);
  opacity:.85;
  letter-spacing:.12em;
  user-select:none;
}

/* tabs */
.tabs{
  display:flex;
  gap:2px;
  padding:0 32px;
  background:var(--paper-dark);
  border-bottom:1px solid var(--line);
  overflow-x:auto;
}
.tab{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:.06em;
  text-transform:uppercase;
  padding:10px 16px;
  background:var(--paper-dark);
  color:var(--ink-soft);
  border:none;
  border-top:3px solid transparent;
  cursor:pointer;
  white-space:nowrap;
}
.tab.active{
  background:var(--paper);
  color:var(--ink);
  border-top:3px solid var(--folder-gold);
}

.panel{display:none; padding:28px 32px 36px 32px;}
.panel.active{display:block;}

.field-row{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(180px,1fr));
  gap:16px 20px;
  margin-bottom:18px;
}
label{
  display:block;
  font-family:'IBM Plex Mono', monospace;
  font-size:10px;
  letter-spacing:.1em;
  text-transform:uppercase;
  color:var(--ink-soft);
  margin-bottom:4px;
}
input[type=text], input[type=number], textarea{
  width:100%;
  font-family:'IBM Plex Sans', sans-serif;
  font-size:15px;
  background:transparent;
  border:none;
  border-bottom:1px solid var(--line);
  padding:4px 2px;
  color:var(--ink);
}
input:focus, textarea:focus{outline:none; border-bottom:1px solid var(--ink);}
textarea{resize:vertical; border:1px solid var(--line); padding:10px; border-radius:2px;}

/* stats */
.pool-bar{
  display:flex;
  align-items:baseline;
  gap:6px;
  margin-bottom:20px;
  padding-bottom:14px;
  border-bottom:1px dashed var(--line);
}
.pool-label{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--ink-soft);
}
.pool-value{
  font-family:'Special Elite', monospace;
  font-size:22px;
  color:var(--ink);
}
.pool-value.empty{color:var(--stamp-red);}

.stat-grid{
  display:grid;
  grid-template-columns:repeat(auto-fit, minmax(230px,1fr));
  gap:16px;
}
.stat-card{
  border:1px solid var(--line);
  background:#f2eee1;
  padding:14px 16px;
  position:relative;
}
.stat-name{
  font-family:'Special Elite', monospace;
  font-size:17px;
  margin:0 0 8px 0;
}
.stat-controls{
  display:flex;
  align-items:center;
  gap:10px;
  margin-bottom:10px;
}
.stat-controls input{
  width:52px;
  text-align:center;
  font-family:'IBM Plex Mono', monospace;
  font-size:18px;
  font-weight:600;
  border:1px solid var(--line);
  border-radius:2px;
  padding:4px;
}
.stepper{
  display:flex;
  flex-direction:column;
}
.stepper button{
  width:22px; height:16px;
  border:1px solid var(--line);
  background:var(--paper-dark);
  cursor:pointer;
  font-size:10px;
  line-height:1;
  padding:0;
}
.roll-row{display:flex; gap:8px; align-items:center;}
.roll-btn{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:.05em;
  background:var(--ink);
  color:var(--paper);
  border:none;
  padding:7px 12px;
  cursor:pointer;
  border-radius:2px;
}
.roll-btn:hover{background:#000;}
.dc-input{width:44px; text-align:center;}
.result{
  font-family:'Special Elite', monospace;
  font-size:13px;
  min-height:18px;
  margin-top:8px;
}
.result.success{color:#2f6d3c;}
.result.fail{color:var(--stamp-red);}

/* skills list */
.list-block{margin-bottom:22px;}
.list-block h3{
  font-family:'Special Elite', monospace;
  font-size:16px;
  border-bottom:1px solid var(--line);
  padding-bottom:6px;
}
.row-item{
  display:flex; gap:10px; align-items:center;
  margin-bottom:8px;
}
.row-item input[type=text]{flex:1;}
.row-item select{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  background:transparent;
  border:1px solid var(--line);
  padding:4px;
}
.del-btn, .add-btn{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  background:transparent;
  border:1px solid var(--line);
  cursor:pointer;
  padding:4px 8px;
  border-radius:2px;
  color:var(--ink-soft);
}
.add-btn{margin-top:4px;}

.skills-explainer{
  font-family:'IBM Plex Sans', sans-serif;
  font-size:14px;
  line-height:1.6;
  color:var(--ink-soft);
  margin:0 0 4px 0;
}
.example-link{
  text-decoration:underline;
  text-underline-offset:2px;
  color:var(--ink);
  font-weight:600;
  cursor:pointer;
}
.example-box{
  display:none;
  font-family:'IBM Plex Sans', sans-serif;
  font-size:13px;
  line-height:1.6;
  color:var(--ink);
  background:#f2eee1;
  border:1px solid var(--line);
  border-radius:2px;
  padding:12px 14px;
  margin:0 0 18px 0;
}
.example-box.open{display:block;}

.skill-list{display:flex; flex-direction:column;}
.skill-row{
  display:flex;
  align-items:center;
  gap:10px;
  padding:8px 4px;
  border-bottom:1px dashed var(--line);
  font-family:'IBM Plex Sans', sans-serif;
  font-size:15px;
}
.skill-row:last-child{border-bottom:none;}
.skill-row-label{
  display:flex;
  align-items:center;
  gap:12px;
  flex:1;
  cursor:pointer;
  min-width:0;
}
.skill-row input[type=checkbox]{
  width:17px; height:17px;
  accent-color: var(--ink);
  cursor:pointer;
  flex-shrink:0;
}
.skill-name{flex:1;}
.skill-help{
  position:relative;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  width:17px; height:17px;
  border:1px solid var(--line);
  border-radius:50%;
  font-family:'IBM Plex Mono', monospace;
  font-size:10px;
  color:var(--ink-soft);
  cursor:help;
  flex-shrink:0;
  user-select:none;
}
.skill-help .tooltip{
  visibility:hidden;
  opacity:0;
  position:absolute;
  bottom:135%;
  right:-6px;
  width:220px;
  background:var(--ink);
  color:var(--paper);
  font-family:'IBM Plex Sans', sans-serif;
  font-size:12px;
  line-height:1.4;
  padding:8px 10px;
  border-radius:3px;
  text-align:left;
  z-index:20;
  transition:opacity .15s ease;
  pointer-events:none;
}
.skill-help:hover .tooltip,
.skill-help:focus .tooltip{
  visibility:visible;
  opacity:1;
}
.skill-attr{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  letter-spacing:.05em;
  text-transform:uppercase;
  color:var(--ink-soft);
  white-space:nowrap;
  flex-shrink:0;
}
.footnote{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  color:var(--ink-soft);
  margin-top:26px;
  line-height:1.6;
  border-top:1px dashed var(--line);
  padding-top:12px;
}

@media (max-width:520px){
  .title{font-size:24px;}
  .stamp{font-size:10px; padding:4px 7px; top:16px; right:16px;}
}

/* screens */
.screen{display:none;}
.screen.active{display:block;}

.case-bar{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  padding:14px 32px 0 32px;
  flex-wrap:wrap;
}
.back-btn{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:.05em;
  background:transparent;
  border:1px solid var(--line);
  cursor:pointer;
  padding:6px 12px;
  border-radius:2px;
  color:var(--ink-soft);
}
.back-btn:hover{color:var(--ink); border-color:var(--ink);}
.case-bar-title{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  letter-spacing:.05em;
  text-transform:uppercase;
  color:var(--ink-soft);
}

.new-case-row{
  display:flex;
  gap:10px;
  align-items:center;
  margin-bottom:8px;
}
.new-case-row input[type=text]{flex:1;}

.case-row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  flex-wrap:wrap;
  padding:12px 4px;
  border-bottom:1px dashed var(--line);
}
.case-row:last-child{border-bottom:none;}
.case-row-main{display:flex; flex-direction:column; gap:3px;}
.case-row-title{font-family:'Special Elite', monospace; font-size:17px;}
.case-row-date{
  font-family:'IBM Plex Mono', monospace;
  font-size:11px;
  color:var(--ink-soft);
}
.case-row-actions{display:flex; gap:8px;}
.case-list-empty{
  font-family:'IBM Plex Mono', monospace;
  font-size:12px;
  color:var(--ink-soft);
  padding:8px 4px;
}
