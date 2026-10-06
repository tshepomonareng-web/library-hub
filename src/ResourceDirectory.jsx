import {useMemo,useState} from 'react';
export const RESOURCES=[
 {id:1,title:'Digital Skills for Beginners',cat:'Courses',info:'Free 6-week course. Starts 3 November.'},
 {id:2,title:'Local History Archive',cat:'Digital archive',info:'Scanned newspapers and photographs. Online access.'},
 {id:3,title:'Author Evening',cat:'Events',info:'14 November, 18:00. Free entry.'},
 {id:4,title:'Introduction to Coding',cat:'Courses',info:'Evening classes, 8 weeks.'},
 {id:5,title:'Oral Histories Collection',cat:'Digital archive',info:'Audio with transcripts.'}];
const CATS=['Courses','Digital archive','Events'];
export default function ResourceDirectory({headingRef}){
  const [q,setQ]=useState('');const [open,setOpen]=useState(false);const [active,setActive]=useState([]);
  const toggle=c=>setActive(a=>a.includes(c)?a.filter(x=>x!==c):[...a,c]);
  const results=useMemo(()=>RESOURCES.filter(r=>(!active.length||active.includes(r.cat))&&r.title.toLowerCase().includes(q.trim().toLowerCase())),[q,active]);
  return(<>
    <h1 ref={headingRef} tabIndex={-1}>Find resources</h1>
    <section aria-labelledby="sh"><h2 id="sh">Search and filter</h2>
      <label htmlFor="q">Search by title</label>
      <p className="hint" id="qh">Results update as you type.</p>
      <input id="q" type="search" value={q} onChange={e=>setQ(e.target.value)} aria-describedby="qh"/>
      <h3><button type="button" aria-expanded={open} aria-controls="filters" onClick={()=>setOpen(o=>!o)}>Category filters</button></h3>
      <div id="filters" hidden={!open}><div className="chips" role="group" aria-label="Categories">
        {CATS.map(c=><button key={c} type="button" aria-pressed={active.includes(c)} onClick={()=>toggle(c)}>{c}</button>)}
      </div></div>
    </section>
    <section aria-labelledby="rh"><h2 id="rh">Results</h2>
      <p role="status" aria-live="polite">{results.length} {results.length===1?'resource':'resources'} found</p>
      {results.map(r=><article key={r.id}><h3>{r.title}</h3><p>{r.cat}. {r.info}</p></article>)}
    </section>
  </>);
}
