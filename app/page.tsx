import { readFile } from 'fs/promises';
import path from 'path';
import ActionBar from './ActionBar';

async function readJson(name: string, fallback: any){
  try{ return JSON.parse(await readFile(path.join(process.cwd(),'public/data',name),'utf-8')); }
  catch { return fallback; }
}

export default async function Page(){
  const agents = await readJson('agents.json', {departments:[]});
  const departments = agents.departments || [];
  const totalAgents = departments.reduce((n:number,d:any)=>n + (d.agents?.length || 0), 0);

  const cards = [
    {label:'Departments', value:departments.length, delta:'+2 this week'},
    {label:'Bot Employees', value:totalAgents, delta:'+5 hired'},
    {label:'Launch Readiness', value:'86%', delta:'+4% trend'},
    {label:'Creative Score', value:'A-', delta:'needs Hook Lab'},
  ];

  return <main className="shell">
    <aside className="sidebar card">
      <h1>NOVA</h1>
      <p>Mission Control</p>
      <nav>
        <a className="active" href="#overview">Overview</a>
        <a href="#departments">Departments</a>
        <a href="#creative">Creative Intel</a>
        <a href="#product">Product Studio</a>
        <a href="#risks">Risk Radar</a>
      </nav>
      <div className="chip">Dashboard only • No execution</div>
    </aside>

    <section className="content">
      <header id="overview" className="hero card">
        <div>
          <h2>Founder Command Center</h2>
          <p>High-signal overview of Nova org, readiness, and gaps.</p>
        </div>
        <button className="ghost">V1 Design System</button>
      </header>

      <section className="card" style={{padding:'12px', marginBottom:'12px'}}>
        <div className="panel-head"><h4>Execution Controls</h4><span>Founder quick actions</span></div>
        <ActionBar />
      </section>

      <section className="kpi-grid">
        {cards.map((c,i)=><article key={i} className="card kpi">
          <span>{c.label}</span>
          <h3>{c.value}</h3>
          <small>{c.delta}</small>
        </article>)}
      </section>

      <section className="split">
        <article id="departments" className="card panel">
          <div className="panel-head"><h4>Department Matrix</h4><span>{departments.length} active</span></div>
          {(departments).map((d:any, i:number)=><div className="dept" key={i}>
            <h5>{d.name}</h5>
            {(d.agents||[]).map((a:any,j:number)=><p key={j}><b>{a.role}</b> · {a.id}</p>)}
          </div>)}
        </article>

        <article id="creative" className="card panel">
          <div className="panel-head"><h4>Creative Department Health</h4><span>priority lane</span></div>
          <ul>
            <li>Creative Director: installed, role defined</li>
            <li>Narrative Strategist: role defined, needs cadence</li>
            <li>Hook Lab: needs daily test loop</li>
            <li>Brand Guardian: needs pre-publish gate</li>
          </ul>
          <div className="bars">
            <div><label>Taste Consistency</label><progress max={100} value={62}></progress></div>
            <div><label>Hook Strength</label><progress max={100} value={58}></progress></div>
            <div><label>Visual Distinction</label><progress max={100} value={66}></progress></div>
          </div>
        </article>
      </section>

      <section className="split">
        <article id="product" className="card panel">
          <div className="panel-head"><h4>Product Studio Velocity</h4><span>target: 48h MVP</span></div>
          <ul>
            <li>Idea Funnel: configured</li>
            <li>Validation lane: configured</li>
            <li>Ship cadence: pending lock</li>
            <li>Monetization gate: required</li>
          </ul>
        </article>

        <article id="risks" className="card panel">
          <div className="panel-head"><h4>Risk Radar</h4><span>watchlist</span></div>
          <ul>
            <li>Creative quality drift under speed pressure</li>
            <li>Single-channel distribution concentration risk</li>
            <li>Compliance gating not yet hard-enforced</li>
            <li>Go-live trigger bridge still maturing</li>
          </ul>
        </article>
      </section>
    </section>
  </main>
}
