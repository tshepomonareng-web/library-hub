import {useEffect,useRef,useState} from 'react';
import ResourceDirectory from './ResourceDirectory.jsx';
import BookingForm from './BookingForm.jsx';
export default function App(){
  const [view,setView]=useState('directory');
  const [announce,setAnnounce]=useState('');
  const h1=useRef(null);const first=useRef(true);
  useEffect(()=>{ // move focus to new view heading on view switch (not on first load)
    if(first.current){first.current=false;return;}
    h1.current?.focus();
    setAnnounce(view==='booking'?'Room booking page loaded':'Resource search page loaded');
  },[view]);
  return(<>
    <a className="skip-link" href="#main">Skip to main content</a>
    <header><p><strong>Community Library Hub</strong></p>
      <nav aria-label="Primary"><ul>
        <li><button type="button" aria-current={view==='directory'?'page':undefined} onClick={()=>setView('directory')}>Find resources</button></li>
        <li><button type="button" aria-current={view==='booking'?'page':undefined} onClick={()=>setView('booking')}>Book a room</button></li>
      </ul></nav></header>
    <main id="main">
      {view==='directory'?<ResourceDirectory headingRef={h1}/>:<BookingForm headingRef={h1}/>}
    </main>
    <div role="status" aria-live="polite" className="sr-only">{announce}</div>
    <footer><p>Marlowe Digital prototype for the Local Council.</p></footer>
  </>);
}
