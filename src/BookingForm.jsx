import {useRef,useState} from 'react';
const FIELDS=[
 {id:'name',label:'Full name',type:'text',hint:'As it appears on your library card.',auto:'name',check:v=>v.trim()?'':'Enter your full name.'},
 {id:'email',label:'Email address',type:'email',hint:'We send your confirmation here.',auto:'email',check:v=>/^\S+@\S+\.\S+$/.test(v)?'':'Enter an email address like name@example.com.'},
 {id:'date',label:'Date',type:'date',hint:'Choose a future date.',check:v=>v&&new Date(v)>new Date()?'':'Choose a date in the future.'}];
export default function BookingForm({headingRef}){
  const [vals,setVals]=useState({name:'',email:'',date:''});
  const [errs,setErrs]=useState({});const [msg,setMsg]=useState('');const [done,setDone]=useState(false);
  const refs=useRef({});const doneRef=useRef(null);
  const validate=f=>f.check(vals[f.id]);
  const onBlur=f=>{const e=validate(f);setErrs(s=>({...s,[f.id]:e}));setMsg(e?`${f.label}: ${e}`:'');};
  const submit=e=>{e.preventDefault();
    const next={};FIELDS.forEach(f=>{next[f.id]=validate(f);});setErrs(next);
    const bad=FIELDS.filter(f=>next[f.id]);
    if(bad.length){setMsg(`${bad.length} ${bad.length===1?'error':'errors'} found. ${bad[0].label}: ${next[bad[0].id]}`);refs.current[bad[0].id].focus();return;}
    setMsg('');setDone(true);setTimeout(()=>doneRef.current?.focus(),0);};
  if(done)return(<section aria-labelledby="ok"><h1 id="ok" ref={doneRef} tabIndex={-1}>Reservation confirmed</h1>
    <p>A confirmation was sent to {vals.email}.</p><button type="button" onClick={()=>{setDone(false);setVals({name:'',email:'',date:''});setErrs({});}}>Make another booking</button></section>);
  return(<section aria-labelledby="bh"><h1 id="bh" ref={headingRef} tabIndex={-1}>Reserve a study room</h1>
    <form onSubmit={submit} noValidate>
      {FIELDS.map(f=>{const err=errs[f.id];return(<div key={f.id}>
        <label htmlFor={f.id}>{f.label}</label>
        <p className="hint" id={`${f.id}-h`}>{f.hint}</p>
        <input id={f.id} ref={el=>refs.current[f.id]=el} type={f.type} autoComplete={f.auto} value={vals[f.id]}
          onChange={e=>setVals({...vals,[f.id]:e.target.value})} onBlur={()=>onBlur(f)}
          aria-required="true" aria-invalid={err?'true':'false'} aria-describedby={`${f.id}-h${err?` ${f.id}-e`:''}`}/>
        {err&&<p className="err" id={`${f.id}-e`}>{err}</p>}</div>);})}
      <button type="submit">Confirm reservation</button>
    </form>
    <div role="alert" aria-live="assertive" className="sr-only">{msg}</div>
  </section>);
}
