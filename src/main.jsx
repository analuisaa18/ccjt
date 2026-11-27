import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import{Menu,X,ArrowRight,MapPin,Phone,Mail,Instagram,LogIn,LogOut,Check,Trash2,Plus,Upload,Image as ImageIcon,Save,LayoutDashboard,CalendarDays,Images,FileText,Settings}from'lucide-react';
import'./style.css';
const URL=import.meta.env.VITE_SUPABASE_URL,KEY=import.meta.env.VITE_SUPABASE_ANON_KEY,supabase=URL&&KEY?createClient(URL,KEY):null;
const DEFAULT={
 nav:[{id:'sobre',label:'Sobre nós'},{id:'acervo',label:'Acervo'},{id:'programacao',label:'Programação'},{id:'projetos',label:'Projetos especiais'},{id:'memorias',label:'Memórias'}],
 brand:'CASA DE CULTURA JUAREZ TEIXEIRA',home:{intro:'Entre, explore e conheça as histórias, exposições e as memórias que fazem parte deste lugar tão especial.',button:'Conhecer',heroImage:'/assets/fachada-ilustrada.jpg',historyTitle:'NOSSA HISTÓRIA',history1:'A Casa de Cultura Juarez Teixeira é um espaço de encontro, memória e expressão cultural. Sua trajetória é construída por pessoas, histórias e ações que preservam e valorizam a identidade de Caçapava do Sul.',history2:'Todo começo carrega um conjunto de lembranças. Aqui, cada objeto, fotografia e atividade ajuda a contar a história de uma comunidade e de suas transformações.',historyImage:'/assets/equipe-casa.jpg',visitImage:'/assets/equipe-visita.jpg',callout:'RECONHECIDA COMO PONTO DE CULTURA PELO GOVERNO FEDERAL E DECLARADA PATRIMÔNIO CULTURAL IMATERIAL DE CAÇAPAVA DO SUL.',teamTitle:'CONHEÇA A ATUAL EQUIPE DA CASA',teamImage:'/assets/marcos-historicos.jpg',team:[{title:'Juarez Teixeira',text:'Referência da história e da memória cultural da Casa.'},{title:'Gisele Teixeira',text:'Atuação na preservação e comunicação cultural.'},{title:'Equipe e colaboradores',text:'Pessoas que fazem a programação e o acolhimento acontecer.'}],milestonesTitle:'PRINCIPAIS MARCOS',milestones:[{title:'2021 — O COMEÇO DE UM NOVO CICLO',text:'Organização e fortalecimento das ações culturais e de preservação da memória.'},{title:'2022 — A CASA GANHA VIDA',text:'Atividades, encontros e iniciativas que ampliam o vínculo com a comunidade.'},{title:'2023 — CONSOLIDAÇÃO',text:'Continuidade das ações e valorização do patrimônio cultural.'},{title:'2024 — NOVAS PARCERIAS',text:'Projetos e colaborações para ampliar o acesso à cultura.'},{title:'2025 — CRESCIMENTO INSTITUCIONAL',text:'Fortalecimento da Casa como espaço de referência cultural.'},{title:'2026 — UM NOVO CAPÍTULO',text:'Novas experiências, registros e possibilidades de participação.'}]},
 acervo:{title:'ACERVO',heroImage:'/assets/fundo-acervo.jpg',intro:'Um espaço dedicado à preservação da história, da cultura e das memórias que fazem parte da nossa identidade. Conheça os objetos, registros e histórias que compõem o acervo da Casa de Cultura e mantêm vivo o patrimônio da nossa comunidade.',items:[{title:'Marionete de Gaúcho',meta:'Doação: Arquivista Maria Alice, Caçapava do Sul',text:'Esta marionete representa um pouco da tradição e da identidade cultural gaúcha. Preservada como parte do acervo, a peça simboliza a riqueza das manifestações populares, dos costumes e das histórias que atravessam gerações.',image:'/assets/marionete.jpg'},{title:'Memória e tradição',meta:'Acervo da Casa de Cultura',text:'Objetos como este guardam lembranças e ajudam a contar histórias sobre a comunidade, seus costumes e suas expressões culturais.',image:'/assets/marionete.jpg'}]},
 programacao:{title:'PROGRAMAÇÃO',heroImage:'/assets/fundo-programacao.jpg',intro:'DE QUARTA A DOMINGO, DAS 10H ÀS 12H E DAS 14H ÀS 17H. ENTRADAS: R$ 10 (INTEIRA) E R$ 5 (MEIA).',eventImage:'/assets/cine-lux.jpg'},
 projetos:{title:'PROJETOS ESPECIAIS',heroImage:'/assets/fundo-projetos.jpg',intro:'A Casa de Cultura realiza e recebe iniciativas que aproximam pessoas, territórios e diferentes formas de expressão artística.',featureTitle:'Encontros que preservam histórias',featureText:'Projetos que valorizam a memória local, promovem a troca de saberes e fortalecem o acesso à cultura.',items:[{title:'Memória e patrimônio',text:'Registros, acervos e histórias que ajudam a manter viva a identidade cultural.',image:'/assets/marcos-historicos.jpg'},{title:'Educação e comunidade',text:'Atividades e visitas que aproximam estudantes e comunidade do patrimônio.',image:'/assets/equipe-visita.jpg'},{title:'Cultura em movimento',text:'Experiências culturais, encontros e atividades para diferentes públicos.',image:'/assets/cine-lux.jpg'}]},
 memorias:{title:'MEMÓRIAS',heroImage:'/assets/fundo-memorias.jpg',formTitle:'Deixar Meu Registro e Memória',intro:'Um lugar se torna especial pelas histórias que vive. Conte-nos a sua e ajude a manter viva a memória da Casa de Cultura.',nameLabel:'Seu Nome / Autor da Memória',dateLabel:'Data de Registro da memória',categoryLabel:'Tipo e Categoria de Registro',bodyLabel:'Relato da Memória',bodyPlaceholder:'Compartilhe uma lembrança vivida na Casa de Cultura ou algo que tenha despertado uma memória especial em você.',uploadLabel:'Arquivo de Memória (Opcional)',submitLabel:'Enviar para curadoria',approvedTitle:'MEMÓRIAS COMPARTILHADAS'},
 support:[{title:'ASSOCIE-SE À CASA',text:'Quer ajudar a decidir os próximos passos da Casa, não só sustentá-la? Torne-se sócio e tenha voz ativa nas decisões da instituição.'},{title:'VIRE UM AMIGO DA CASA COM PIX MENSAL',text:'Adote a Casa com um valor mensal, do tamanho que fizer sentido para você: R$10, R$20, R$50, o que puder.'},{title:'FAÇA UMA DOAÇÃO QUANDO PUDER',text:'Sem compromisso mensal, sem burocracia: quando quiser ajudar, é só fazer um pix ou transferência.'}],
 theme:{primary:'#c9000b',gold:'#e9a83e',paper:'#f4f1ef',ink:'#171515',headingFont:'Playfair Display',bodyFont:'DM Sans'},footer:{instagramUrl:'https://instagram.com/ccjteixeira',contactTitle:'CONTATO',phone:'+55 55 996961582',email:'ccjuarezteixeira@gmail.com',addressTitle:'ENDEREÇO',address:'Rua Osório, 730, Caçapava do Sul - RS',instagram:'@ccjteixeira',credits:'Projeto desenvolvido por Ana Bocheneck no Laboratório de Interface — Disciplina de Introdução ao Desenho de Projeto. Ilustrações por André Dalmazzo e Daniela Gomes.'}
};
const clone=x=>JSON.parse(JSON.stringify(x));
function App(){
 const [data,setData]=useState(DEFAULT),[page,setPage]=useState(location.pathname.replace(/\/$/,'')==='/admin'?'admin':(location.hash.slice(1)||'sobre')),[menu,setMenu]=useState(false),[session,setSession]=useState(null),[events,setEvents]=useState([]),[memories,setMemories]=useState([]),[toast,setToast]=useState('');
 const isAdmin=page==='admin'||location.pathname==='/admin';
 const notify=t=>{setToast(t);setTimeout(()=>setToast(''),4000)};
 useEffect(()=>{const r=document.documentElement;r.style.setProperty('--red',data.theme.primary);r.style.setProperty('--gold',data.theme.gold);r.style.setProperty('--paper',data.theme.paper);r.style.setProperty('--ink',data.theme.ink);r.style.setProperty('--serif',`'${data.theme.headingFont}', Georgia, serif`);r.style.setProperty('--sans',`'${data.theme.bodyFont}', Arial, sans-serif`)},[data.theme]);
 useEffect(()=>{const f=()=>{setPage(location.pathname.replace(/\/$/,'')==='/admin'?'admin':(location.hash.slice(1)||'sobre'));window.scrollTo(0,0)};addEventListener('hashchange',f);addEventListener('popstate',f);return()=>{removeEventListener('hashchange',f);removeEventListener('popstate',f)}},[]);
 useEffect(()=>{if(!supabase)return;supabase.auth.getSession().then(({data})=>setSession(data.session));const{data:s}=supabase.auth.onAuthStateChange((_e,v)=>setSession(v));supabase.from('site_content').select('content').eq('id','main').maybeSingle().then(({data:d})=>{if(d?.content)setData(merge(DEFAULT,d.content))});supabase.from('events').select('*').eq('status','published').order('event_date').then(({data:d,error})=>{if(!error)setEvents(d||[])});supabase.from('memories').select('*').eq('status','approved').order('created_at',{ascending:false}).then(({data:d})=>setMemories(d||[]));return()=>s.subscription.unsubscribe()},[]);
 const go=id=>{setPage(id);if(id==='admin'){history.pushState({},'', '/admin')}else{history.pushState({},'', id==='sobre'?'/':'/#'+id)}setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
 const update=(path,value)=>setData(old=>{const n=clone(old);let o=n;path.slice(0,-1).forEach(k=>o=o[k]);o[path.at(-1)]=value;return n});
 const save=async()=>{if(!supabase){notify('Configure o Supabase para salvar alterações permanentemente.');return}const{error}=await supabase.from('site_content').upsert({id:'main',content:data,updated_at:new Date().toISOString()});notify(error?'Erro ao salvar: '+error.message:'Alterações publicadas no site!')};
 if(isAdmin)return <><main className="admin-shell"><Admin data={data} setData={setData} save={save} session={session} setSession={setSession} events={events} setEvents={setEvents} notify={notify} onViewSite={()=>go('sobre')}/></main>{toast&&<div className="toast">{toast}</div>}</>;
 return <><header className="header"><a className="brand official-logo-crop" href="#" aria-label="Casa de Cultura Juarez Teixeira — início" onClick={e=>{e.preventDefault();go('sobre')}}><img src="/assets/ccjt-marca.svg" alt="Casa de Cultura Juarez Teixeira" /></a><nav className="desktop-nav">{data.nav.map(n=><button key={n.id} className={page===n.id?'active':''} onClick={()=>go(n.id)}>{n.label}</button>)}</nav><button className="hamb" onClick={()=>setMenu(!menu)} aria-label="Abrir menu">{menu?<X/>:<Menu/>}</button></header>
 {menu&&<><div className="veil" onClick={()=>setMenu(false)}></div><nav className="mobile-nav">{data.nav.map(n=><button key={n.id} className={page===n.id?'active':''} onClick={()=>go(n.id)}>{n.label}<ArrowRight size={17}/></button>)}</nav></>}
 <main>{page==='sobre'?<Home data={data} go={go}/>:page==='acervo'?<Acervo data={data}/>:page==='programacao'?<Programacao data={data} events={events}/>:page==='projetos'?<Projetos data={data}/>:page==='memorias'?<Memorias data={data} memories={memories} notify={notify}/>:<Home data={data} go={go}/>}</main>
 <Footer data={data} admin={()=>go('admin')}/>{toast&&<div className="toast">{toast}</div>}</>;
}
function merge(base,extra){if(Array.isArray(base))return Array.isArray(extra)?extra:base;if(base&&typeof base==='object')return Object.fromEntries(Object.keys(base).map(k=>[k,merge(base[k],extra?.[k])]));return extra??base}
function Hero({title,image}){return <section className="inner-hero" style={{backgroundImage:`url("${image}")`}}><div className="hero-title">{title}</div></section>}
function Home({data:d,go}){return <><section className="home-hero"><div className="home-intro"><div className="big-logo official-logo-crop" aria-label="Casa de Cultura Juarez Teixeira"><img src="/assets/ccjt-marca.svg" alt="Casa de Cultura Juarez Teixeira" /></div><p>{d.home.intro}</p><button className="red-btn" onClick={()=>document.getElementById('historia')?.scrollIntoView({behavior:'smooth'})}>{d.home.button}<ArrowRight size={15}/></button></div><div className="home-building" style={{backgroundImage:`url("${d.home.heroImage}")`}}/></section><section id="historia" className="section-pad"><img className="wide-photo" src={d.home.historyImage}/><div className="ribbon-title">{d.home.historyTitle}</div><div className="two-col history-copy"><p>{d.home.history1}</p><p>{d.home.history2}</p></div><img className="visit-photo" src={d.home.visitImage}/><div className="red-band">{d.home.callout}</div><section className="team"><img src={d.home.teamImage}/><div><h2>{d.home.teamTitle}</h2><div className="people-grid">{d.home.team.map((p,i)=><p key={i}><b>{p.title}</b><br/>{p.text}</p>)}</div></div></section><h2 className="section-heading">{d.home.milestonesTitle}</h2><div className="milestones">{d.home.milestones.map((m,i)=><article key={i}><h3>{m.title}</h3><p>{m.text}</p></article>)}</div></section><Support data={d}/></>}
function Acervo({data:d}){return <><Hero title={d.acervo.title} image={d.acervo.heroImage}/><section className="section-pad"><p className="lead">{d.acervo.intro}</p><div className="collection-grid">{d.acervo.items.map((it,i)=><article className="collection-card" key={i}><img src={it.image}/><div className="caption-card"><b>{it.title}</b><span>{it.meta}</span></div><p>{it.text}</p></article>)}</div></section><Support data={d}/></>}
function Programacao({data:d,events}){return <><Hero title={d.programacao.title} image={d.programacao.heroImage}/><section className="section-pad"><h2 className="program-note">{d.programacao.intro}</h2>{events.filter(ev=>(ev.status||'published')==='published').map(ev=><article className="event" key={ev.id}><img src={ev.image_url||d.programacao.eventImage} alt={ev.title}/><div className="ribbon-title">{ev.title}</div><div className="event-copy"><div><b>{ev.title}</b><p>{ev.description}</p>{ev.category&&<p><b>Categoria:</b> {ev.category}</p>}{ev.additional_info&&<p>{ev.additional_info}</p>}</div><div><p><b>Data:</b> {new Date(ev.event_date).toLocaleDateString('pt-BR',{day:'2-digit',month:'long',year:'numeric'})}</p><p><b>Horário:</b> {new Date(ev.event_date).toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}</p><p><b>Local:</b> {ev.location}</p><p><b>Ingressos:</b> {ev.price}</p></div></div></article>)}</section><Support data={d}/></>}
function Projetos({data:d}){return <><Hero title={d.projetos.title} image={d.projetos.heroImage}/><section className="section-pad"><p className="lead">{d.projetos.intro}</p><article className="project-feature"><div><span className="eyebrow">PROJETOS E AÇÕES</span><h2>{d.projetos.featureTitle}</h2><p>{d.projetos.featureText}</p></div></article><div className="project-grid">{d.projetos.items.map((it,i)=><article key={i}><img src={it.image}/><h3>{it.title}</h3><p>{it.text}</p></article>)}</div></section><Support data={d}/></>}
function Memorias({data:d,memories,notify}){const[mType,setMType]=useState('text'),[file,setFile]=useState(null),[busy,setBusy]=useState(false),[editingId,setEditingId]=useState(null);async function submit(e){e.preventDefault();setBusy(true);const f=new FormData(e.currentTarget),row={author_name:f.get('name'),category:f.get('category'),content_type:mType,body:f.get('body'),memory_date:f.get('date')||null,status:'pending'};try{if(supabase){if(file){const path=`memories/${Date.now()}-${file.name}`;const{error}=await supabase.storage.from('memories').upload(path,file);if(error)throw error;row.media_url=supabase.storage.from('memories').getPublicUrl(path).data.publicUrl}const{error}=await supabase.from('memories').insert(row);if(error)throw error}else{const l=JSON.parse(localStorage.getItem('cc-memories')||'[]');l.push(row);localStorage.setItem('cc-memories',JSON.stringify(l))}e.target.reset();setFile(null);notify('Memória enviada para curadoria. Obrigado por compartilhar!')}catch(err){notify('Não foi possível enviar. Confira a configuração do site.')}finally{setBusy(false)}}return <><Hero title={d.memorias.title} image={d.memorias.heroImage}/><section className="memory-wrap"><form className="memory-form" onSubmit={submit}><h1>{d.memorias.formTitle}</h1><p className="form-intro">{d.memorias.intro}</p><div className="form-row"><label>{d.memorias.nameLabel}<input name="name" required/></label><label>{d.memorias.dateLabel}<input name="date" type="date"/></label></div><label>{d.memorias.categoryLabel}<select name="category"><option>História/Narrativa</option><option>Exposições</option><option>Oficinas</option><option>Visita Escolar</option><option>Acervo</option></select></label><div className="type-options">{[['text','Texto'],['audio','Áudio'],['image','Foto']].map(([v,t])=><button type="button" className={mType===v?'selected':''} onClick={()=>setMType(v)} key={v}>{t}</button>)}</div><label>{d.memorias.bodyLabel}<textarea name="body" placeholder={d.memorias.bodyPlaceholder} rows="5" required/></label><label>{d.memorias.uploadLabel}<div className="filebox"><Upload/><span>{file?.name||'Selecione uma foto ou áudio'}</span><input type="file" accept={mType==='audio'?'audio/*':'image/*'} onChange={e=>setFile(e.target.files[0])}/></div></label><button className="red-btn submit-btn" disabled={busy}>{busy?'Enviando…':d.memorias.submitLabel}</button></form></section>{memories.length>0&&<section className="section-pad"><h2>{d.memorias.approvedTitle}</h2><div className="memory-grid">{memories.map(m=><article key={m.id}><h3>{m.author_name}</h3><p>{m.body}</p>{m.media_url&&(m.content_type==='audio'?<audio controls src={m.media_url}/>:<img src={m.media_url} alt={`Memória enviada por ${m.author_name}`}/> )}</article>)}</div></section>}<Support data={d}/></>}
function Support({data:d}){return <section className="support">{d.support.map((x,i)=><article key={i}><span>0{i+1}</span><h3>{x.title}</h3><p>{x.text}</p></article>)}</section>}
function Footer({data:d,admin}){return <><footer className="footer"><div><span>{d.footer.contactTitle}</span><p><Phone size={15}/>{d.footer.phone}</p><p><Mail size={15}/>{d.footer.email}</p></div><div><span>{d.footer.addressTitle}</span><p><MapPin size={15}/>{d.footer.address}</p></div><div><a href={d.footer.instagramUrl} target="_blank" rel="noreferrer"><Instagram/>{d.footer.instagram}</a></div><div className="seal">PONTO<br/>DE CULTURA</div></footer><div className="credits">{d.footer.credits}<button onClick={admin} title="Área administrativa">Área administrativa</button></div></>}

function Admin({data,setData,save,session,setSession,events,setEvents,notify,onViewSite}){
 const [tab,setTab]=useState('dashboard');
 const [email,setEmail]=useState('');
 const [password,setPassword]=useState('');
 const [pending,setPending]=useState([]);
 const [published,setPublished]=useState([]);
 const [allEvents,setAllEvents]=useState(events||[]);
 const [editingId,setEditingId]=useState(null);
 const [draft,setDraft]=useState({title:'',description:'',event_date:'',location:'Casa de Cultura',price:'',image_url:'',category:'',additional_info:'',status:'published'});
 const [savingEvent,setSavingEvent]=useState(false);
 const [mediaFiles,setMediaFiles]=useState([]);
 const [mediaBusy,setMediaBusy]=useState(false);
 const [memoryEditing,setMemoryEditing]=useState(null);
 const [memoryDraft,setMemoryDraft]=useState({author_name:'',category:'',body:''});
 const emptyDraft={title:'',description:'',event_date:'',location:'Casa de Cultura',price:'',image_url:'',category:'',additional_info:'',status:'published'};

 useEffect(()=>{
  if(!session||!supabase)return;
  let active=true;
  (async()=>{
   const {data:authorized,error:roleError}=await supabase.rpc('is_site_admin');
   if(!active)return;
   if(roleError||!authorized){await supabase.auth.signOut();setSession(null);notify(roleError?'A configuração de administradores do Supabase está incompleta.':'Esta conta não possui permissão administrativa.');return;}
   const [p,a,e]=await Promise.all([
   supabase.from('memories').select('*').eq('status','pending').order('created_at',{ascending:false}),
   supabase.from('memories').select('*').eq('status','approved').order('created_at',{ascending:false}),
   supabase.from('events').select('*').order('event_date',{ascending:true})
  ]);
   if(!active)return;
   if(p.error)notify('Erro ao carregar memórias pendentes: '+p.error.message); else setPending(p.data||[]);
   if(a.error)notify('Erro ao carregar memórias publicadas: '+a.error.message); else setPublished(a.data||[]);
   if(e.error)notify('Erro ao carregar eventos: '+e.error.message); else {setAllEvents(e.data||[]);setEvents((e.data||[]).filter(x=>(x.status||'published')==='published'));}
   const {data:files,error:filesError}=await supabase.storage.from('site-media').list('site',{limit:100,sortBy:{column:'created_at',order:'desc'}});
   if(active&&!filesError)setMediaFiles((files||[]).map(f=>({name:f.name,path:`site/${f.name}`,url:supabase.storage.from('site-media').getPublicUrl(`site/${f.name}`).data.publicUrl})));
  })();
  return()=>{active=false};
 },[session]);

 async function login(e){
  e.preventDefault();
  if(!supabase){notify('As variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não foram carregadas neste deployment.');return;}
  const {data:result,error}=await supabase.auth.signInWithPassword({email,password});
  if(error){notify('Não foi possível entrar: '+error.message);return;}
  const {data:authorized,error:roleError}=await supabase.rpc('is_site_admin');
  if(roleError||!authorized){await supabase.auth.signOut();setSession(null);notify(roleError?'Execute a migração SQL de administração no Supabase antes de acessar o painel.':'Esta conta ainda não foi autorizada como administradora.');return;}
  setSession(result.session);notify('Acesso autorizado. Carregando painel…');
 }
 async function recoverPassword(){
  if(!supabase){notify('Supabase não está configurado.');return;}
  if(!email){notify('Digite seu e-mail para receber o link de recuperação.');return;}
  const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/admin'});
  notify(error?'Não foi possível enviar: '+error.message:'Link de recuperação enviado para seu e-mail.');
 }
 async function review(memory,status){
  const {error}=await supabase.from('memories').update({status}).eq('id',memory.id);
  if(error){notify('Erro ao atualizar memória: '+error.message);return;}
  setPending(items=>items.filter(x=>x.id!==memory.id));
  if(status==='approved')setPublished(items=>[memory,...items]);
  notify(status==='approved'?'Memória aprovada e publicada.':'Memória rejeitada.');
 }
 async function saveMemoryEdit(memory){
  const {error}=await supabase.from('memories').update(memoryDraft).eq('id',memory.id);
  if(error){notify('Erro ao editar memória: '+error.message);return;}
  const updated={...memory,...memoryDraft};
  setPending(items=>items.map(x=>x.id===memory.id?updated:x));
  setPublished(items=>items.map(x=>x.id===memory.id?updated:x));
  setMemoryEditing(null);notify('Memória atualizada.');
 }
 async function removePublished(memory){
  if(!window.confirm('Excluir esta memória publicada?'))return;
  const {error}=await supabase.from('memories').delete().eq('id',memory.id);
  if(error){notify('Erro ao excluir memória: '+error.message);return;}
  setPublished(items=>items.filter(x=>x.id!==memory.id));notify('Memória excluída.');
 }
 async function saveEvent(e){
  e.preventDefault();
  if(!supabase){notify('Supabase não está configurado.');return;}
  setSavingEvent(true);
  const payload={...draft,event_date:new Date(draft.event_date).toISOString(),status:draft.status||'published'};
  const result=editingId
   ? await supabase.from('events').update(payload).eq('id',editingId).select().single()
   : await supabase.from('events').insert(payload).select().single();
  setSavingEvent(false);
  if(result.error){notify('Erro ao salvar evento: '+result.error.message);return;}
  const updated=editingId?allEvents.map(x=>x.id===editingId?result.data:x):[...allEvents,result.data];
  setAllEvents(updated);setEvents(updated.filter(x=>(x.status||'published')==='published'));
  setDraft(emptyDraft);setEditingId(null);notify(editingId?'Evento atualizado.':'Evento cadastrado.');
 }
 async function deleteEvent(event){
  if(!window.confirm(`Excluir o evento “${event.title}”?`))return;
  const {error}=await supabase.from('events').delete().eq('id',event.id);
  if(error){notify('Erro ao excluir evento: '+error.message);return;}
  const updated=allEvents.filter(x=>x.id!==event.id);setAllEvents(updated);setEvents(updated.filter(x=>(x.status||'published')==='published'));notify('Evento excluído.');
 }
 async function uploadImage(path,file){
  if(!file)return;
  if(!supabase){notify('Supabase não está configurado.');return;}
  const safe=file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]/g,'-');
  const key=`site/${Date.now()}-${safe}`;
  const {error}=await supabase.storage.from('site-media').upload(key,file,{upsert:false,contentType:file.type});
  if(error){notify('Erro no upload: '+error.message);return;}
  const url=supabase.storage.from('site-media').getPublicUrl(key).data.publicUrl;
  updateAt(path,url);
  setMediaFiles(items=>[{name:key.split('/').pop(),path:key,url},...items]);
  notify('Imagem enviada. Salve a página para publicar a alteração.');
 }
 async function uploadEventImage(file){
  if(!file)return;
  if(!supabase){notify('Supabase não está configurado.');return;}
  const safe=file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]/g,'-');
  const key=`site/${Date.now()}-${safe}`;
  const {error}=await supabase.storage.from('site-media').upload(key,file,{upsert:false,contentType:file.type});
  if(error){notify('Erro no upload: '+error.message);return;}
  const url=supabase.storage.from('site-media').getPublicUrl(key).data.publicUrl;
  setDraft(current=>({...current,image_url:url}));
  setMediaFiles(items=>[{name:key.split('/').pop(),path:key,url},...items]);
  notify('Imagem do evento enviada.');
 }
 async function deleteMediaFile(file){
  if(!window.confirm(`Excluir o arquivo ${file.name} da biblioteca?`))return;
  const {error}=await supabase.storage.from('site-media').remove([file.path]);
  if(error){notify('Erro ao excluir arquivo: '+error.message);return;}
  setMediaFiles(items=>items.filter(x=>x.path!==file.path));notify('Arquivo excluído da biblioteca.');
 }
 async function uploadLibraryFile(file){
  if(!file)return;
  setMediaBusy(true);
  const safe=file.name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9._-]/g,'-');
  const key=`site/${Date.now()}-${safe}`;
  const {error}=await supabase.storage.from('site-media').upload(key,file,{upsert:false,contentType:file.type});
  setMediaBusy(false);
  if(error){notify('Erro no upload: '+error.message);return;}
  const url=supabase.storage.from('site-media').getPublicUrl(key).data.publicUrl;
  setMediaFiles(items=>[{name:key.split('/').pop(),path:key,url},...items]);notify('Arquivo adicionado à biblioteca de mídia.');
 }
 const updateAt=(path,value)=>setData(prev=>{const next=JSON.parse(JSON.stringify(prev));let target=next;path.slice(0,-1).forEach(k=>target=target[k]);target[path[path.length-1]]=value;return next;});
 const imageField=key=>/(image|photo|logo|imagem|foto|capa|banner)/i.test(String(key));
 const makeNewItem=(value,path=[])=>{
  if(Array.isArray(value)){const name=String(path[path.length-1]||'');const templates={items:path.includes('acervo')?{title:'',meta:'',text:'',image:''}:{title:'',text:'',image:''},team:{title:'',text:''},milestones:{title:'',text:''},support:{title:'',text:''},nav:{id:'',label:''}};return templates[name]||'Novo item';}
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,Array.isArray(v)?[]:v&&typeof v==='object'?makeNewItem(v,[...path,k]):typeof v==='number'?0:typeof v==='boolean'?false:'']));
  return '';
 };
 function editor(value,path,label){
  const key=String(path[path.length-1]??label);
  if(Array.isArray(value))return <div className="cms-array" key={path.join('.')}>
   <div className="cms-array-head"><div><h4>{label}</h4><small>{value.length} item(ns)</small></div><button type="button" onClick={()=>updateAt(path,[...value, value.length?makeNewItem(value[0],path):makeNewItem(value,path)])}><Plus size={15}/> Adicionar item</button></div>
   {value.map((item,index)=><div className="cms-array-item" key={index}><div className="cms-array-title"><b>{label} {index+1}</b><button type="button" className="icon-danger" onClick={()=>{if(window.confirm(`Remover ${label.toLowerCase()} ${index+1}?`))updateAt(path,value.filter((_,i)=>i!==index));}}><Trash2 size={15}/> Remover</button></div>{editor(item,[...path,index],`${label} ${index+1}`)}</div>)}
  </div>;
  if(value&&typeof value==='object')return <fieldset className="cms-fieldset" key={path.join('.')}><legend>{label}</legend><div className="cms-fields">{Object.entries(value).map(([k,v])=>editor(v,[...path,k],k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase())))}</div></fieldset>;
  if(typeof value==='boolean')return <label className="cms-field" key={path.join('.')}><span>{label}</span><input type="checkbox" checked={value} onChange={e=>updateAt(path,e.target.checked)}/></label>;
  const long=String(value??'').length>90||/(text|intro|description|body|credits|callout|placeholder|content|texto|descri|relato)/i.test(key);
  const color=/(color|primary|gold|paper|ink|red)/i.test(key)&&/^#?[0-9a-f]{3,8}$/i.test(String(value||''));
  return <label className="cms-field" key={path.join('.')}><span>{label}</span>
   {imageField(key)?<><input value={value||''} onChange={e=>updateAt(path,e.target.value)} placeholder="URL da imagem"/><div className="cms-upload"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>uploadImage(path,e.target.files?.[0])}/><Upload size={15}/> Enviar/substituir imagem</div>{value&&<img className="cms-image-preview" src={value} alt={`Prévia: ${label}`}/>}</>:
   color?<div className="cms-color-input"><input type="color" value={String(value).startsWith('#')?value:'#000000'} onChange={e=>updateAt(path,e.target.value)}/><input value={value??''} onChange={e=>updateAt(path,e.target.value)} /></div>:
   long?<textarea rows={4} value={value??''} onChange={e=>updateAt(path,e.target.value)}/>:<input value={value??''} onChange={e=>updateAt(path,e.target.value)}/>}</label>;
 }
 const sections=[['dashboard','Visão geral',LayoutDashboard],['home','Página inicial',FileText],['acervo','Acervo',Images],['programacao','Programação',CalendarDays],['projetos','Projetos especiais',FileText],['memorias','Memórias',Images],['support','Apoio e rodapé',Settings],['nav','Menu e identidade',Settings],['theme','Aparência e cores',Settings],['media','Biblioteca de mídia',ImageIcon]];
 const current=tab==='home'?data.home:tab==='acervo'?data.acervo:tab==='programacao'?data.programacao:tab==='projetos'?data.projetos:tab==='memorias'?data.memorias:tab==='support'?{support:data.support,footer:data.footer}:tab==='nav'?{brand:data.brand,nav:data.nav}:tab==='theme'?{theme:data.theme}:null;
 if(!session)return <section className="admin-login wp-login"><div className="wp-login-brand"><div className="wp-login-logo official-logo-crop"><img src="/assets/ccjt-marca.svg" alt="Casa de Cultura Juarez Teixeira"/></div><span>PAINEL DE ADMINISTRAÇÃO</span></div><form onSubmit={login}><LogIn/><h1>Acessar o painel</h1><p>Entre com o e-mail e a senha da conta autorizada da Casa de Cultura.</p><input type="email" placeholder="E-mail" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Senha" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="red-btn" type="submit">Entrar no painel</button><button type="button" className="wp-forgot" onClick={recoverPassword}>Esqueci minha senha</button><a className="wp-back-site" href="/">Voltar ao site</a></form></section>;
 const editorContent=tab==='nav'?<><h2>Nome e navegação do site</h2>{editor(data.brand,['brand'],'Nome institucional')}{editor(data.nav,['nav'],'Itens do menu')}</>:tab==='theme'?<><h2>Identidade visual</h2>{editor(data.theme,['theme'],'Cores e tipografia')}</>:tab==='support'?<><h2>Conteúdo de apoio e rodapé</h2>{editor(data.support,['support'],'Blocos de apoio')}{editor(data.footer,['footer'],'Rodapé e contatos')}</>:current?editor(current,[tab],sections.find(x=>x[0]===tab)?.[1]):null;
 return <div className="cms wp-admin">
  <div className="wp-adminbar"><div className="wp-adminbar-brand"><div className="wp-adminbar-logo official-logo-crop"><img src="/assets/ccjt-marca.svg" alt="Casa de Cultura Juarez Teixeira"/></div> <span className="wp-adminbar-label">Administração</span></div><div className="wp-adminbar-actions"><button type="button" onClick={onViewSite}>↗ Visualizar site</button><button type="button" onClick={()=>supabase.auth.signOut()}>Sair</button></div></div>
  <aside className="cms-sidebar"><div className="cms-logo"><div className="cms-logo-mark official-logo-crop"><img src="/assets/ccjt-marca.svg" alt="Casa de Cultura Juarez Teixeira"/></div><small>PAINEL DO SITE</small></div><div className="wp-menu-label">GERENCIAR</div>{sections.map(([id,name,Icon])=><button type="button" className={tab===id?'selected':''} onClick={()=>setTab(id)} key={id}><Icon size={17}/>{name}</button>)}<div className="wp-menu-label wp-tools-label">CONTA</div><button type="button" className="cms-logout" onClick={()=>supabase.auth.signOut()}><LogOut size={17}/> Sair</button></aside>
  <section className="cms-main">
   {tab==='dashboard'?<><div className="cms-top"><div><span className="eyebrow">PAINEL DE CONTROLE</span><h1>Bem-vinda à Casa de Cultura</h1><p>Gerencie o conteúdo do site sem precisar editar código.</p></div><button className="red-btn" onClick={save}><Save size={16}/> Salvar alterações</button></div><div className="wp-welcome"><div><b>Olá!</b><p>Escolha uma seção no menu para editar textos, imagens, cores, eventos e conteúdos. As alterações do conteúdo são salvas no Supabase.</p></div><span>✦</span></div><div className="cms-cards">{sections.filter(x=>x[0]!=='dashboard').map(([id,name,Icon])=><button type="button" onClick={()=>setTab(id)} key={id}><Icon size={24}/><b>{name}</b><span>Gerenciar conteúdo</span></button>)}</div><div className="cms-stats"><article><b>{allEvents.length}</b><span>Eventos cadastrados</span></article><article><b>{pending.length}</b><span>Memórias aguardando aprovação</span></article><article><b>{published.length}</b><span>Memórias publicadas</span></article></div><p className="cms-tip">Lembre-se de clicar em “Salvar e publicar” após editar páginas, textos, imagens ou cores.</p></>:
   tab==='programacao'?<><div className="cms-top"><div><button className="cms-back" onClick={()=>setTab('dashboard')}>← Visão geral</button><span className="eyebrow">CONTEÚDO</span><h1>Programação</h1><p>Cadastre, edite, publique ou deixe eventos como rascunho.</p></div></div><section className="cms-block"><div className="wp-section-heading"><div><h2>Eventos cadastrados</h2><p>{allEvents.length} evento(s) no banco de dados</p></div><span className="wp-count">{allEvents.filter(x=>(x.status||'published')==='published').length} publicados</span></div>{allEvents.length===0&&<p>Nenhum evento cadastrado ainda.</p>}{allEvents.map(ev=><article className="cms-event" key={ev.id}>{ev.image_url&&<img src={ev.image_url} alt=""/>}<div className="cms-event-info"><b>{ev.title}</b><p>{ev.description}</p><small>{ev.event_date?new Date(ev.event_date).toLocaleString('pt-BR'):''} · {ev.location} · {ev.status||'published'}</small></div><button type="button" onClick={()=>{setDraft({...emptyDraft,...ev,event_date:ev.event_date?new Date(new Date(ev.event_date).getTime()-new Date(ev.event_date).getTimezoneOffset()*60000).toISOString().slice(0,16):''});setEditingId(ev.id);window.scrollTo({top:0,behavior:'smooth'});}}>Editar</button><button type="button" className="icon-danger" onClick={()=>deleteEvent(ev)}><Trash2 size={16}/></button></article>)}</section><section className="cms-block"><h2>{editingId?'Editar evento':'Adicionar novo evento'}</h2><form className="event-admin" onSubmit={saveEvent}><label>Título<input value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})} required/></label><label>Descrição<textarea value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/></label><div className="cms-fields"><label>Data e horário<input type="datetime-local" value={draft.event_date} onChange={e=>setDraft({...draft,event_date:e.target.value})} required/></label><label>Local<input value={draft.location} onChange={e=>setDraft({...draft,location:e.target.value})}/></label><label>Categoria<input value={draft.category||''} onChange={e=>setDraft({...draft,category:e.target.value})}/></label><label>Ingressos / preço<input value={draft.price||''} onChange={e=>setDraft({...draft,price:e.target.value})}/></label></div><label>Informações adicionais<textarea value={draft.additional_info||''} onChange={e=>setDraft({...draft,additional_info:e.target.value})}/></label><label>Imagem de divulgação<input value={draft.image_url||''} onChange={e=>setDraft({...draft,image_url:e.target.value})} placeholder="URL da imagem"/><div className="cms-upload"><input type="file" accept="image/*" onChange={e=>uploadEventImage(e.target.files?.[0])}/><Upload size={15}/> Enviar imagem</div>{draft.image_url&&<img className="cms-image-preview" src={draft.image_url} alt="Prévia do evento"/>}</label><label>Status<select value={draft.status||'published'} onChange={e=>setDraft({...draft,status:e.target.value})}><option value="draft">Rascunho</option><option value="published">Publicado</option></select></label><div className="cms-form-actions"><button className="red-btn" disabled={savingEvent}><Save size={16}/>{savingEvent?' Salvando…':editingId?' Atualizar evento':' Cadastrar evento'}</button>{editingId&&<button type="button" onClick={()=>{setEditingId(null);setDraft(emptyDraft);}}>Cancelar edição</button>}</div></form></section></>:
   tab==='memorias'?<><div className="cms-top"><div><button className="cms-back" onClick={()=>setTab('dashboard')}>← Visão geral</button><span className="eyebrow">MODERAÇÃO</span><h1>Memórias</h1><p>Revise os relatos enviados pelos visitantes.</p></div></div><section className="cms-block"><h2>Aguardando aprovação ({pending.length})</h2>{pending.length===0&&<p>Não há memórias pendentes.</p>}{pending.map(m=><article className="pending-card" key={m.id}><div><b>{m.author_name}</b><p>{m.body}</p><small>{m.category} · {m.content_type} · {m.memory_date||''}</small>{m.media_url&&<a href={m.media_url} target="_blank" rel="noreferrer">Visualizar arquivo enviado</a>}{memoryEditing===m.id?<div className="memory-edit-form"><input value={memoryDraft.author_name} onChange={e=>setMemoryDraft({...memoryDraft,author_name:e.target.value})}/><input value={memoryDraft.category} onChange={e=>setMemoryDraft({...memoryDraft,category:e.target.value})}/><textarea value={memoryDraft.body} onChange={e=>setMemoryDraft({...memoryDraft,body:e.target.value})}/><button type="button" onClick={()=>saveMemoryEdit(m)}>Salvar edição</button><button type="button" onClick={()=>setMemoryEditing(null)}>Cancelar</button></div>:<button type="button" onClick={()=>{setMemoryEditing(m.id);setMemoryDraft({author_name:m.author_name||'',category:m.category||'',body:m.body||''});}}>Editar relato</button>}</div><button type="button" onClick={()=>review(m,'approved')}><Check size={16}/> Aprovar</button><button type="button" className="icon-danger" onClick={()=>review(m,'rejected')}><Trash2 size={16}/> Rejeitar</button></article>)}</section><section className="cms-block"><h2>Memórias publicadas ({published.length})</h2>{published.length===0&&<p>Nenhuma memória publicada.</p>}{published.map(m=><article className="pending-card" key={m.id}><div><b>{m.author_name}</b><p>{m.body}</p><small>{m.category}</small>{m.media_url&&<a href={m.media_url} target="_blank" rel="noreferrer">Visualizar arquivo</a>}{memoryEditing===m.id?<div className="memory-edit-form"><input value={memoryDraft.author_name} onChange={e=>setMemoryDraft({...memoryDraft,author_name:e.target.value})}/><input value={memoryDraft.category} onChange={e=>setMemoryDraft({...memoryDraft,category:e.target.value})}/><textarea value={memoryDraft.body} onChange={e=>setMemoryDraft({...memoryDraft,body:e.target.value})}/><button type="button" onClick={()=>saveMemoryEdit(m)}>Salvar edição</button><button type="button" onClick={()=>setMemoryEditing(null)}>Cancelar</button></div>:<button type="button" onClick={()=>{setMemoryEditing(m.id);setMemoryDraft({author_name:m.author_name||'',category:m.category||'',body:m.body||''});}}>Editar relato</button>}</div><button type="button" className="icon-danger" onClick={()=>removePublished(m)}><Trash2 size={16}/> Excluir</button></article>)}</section></>:
   tab==='media'?<><div className="cms-top"><div><button className="cms-back" onClick={()=>setTab('dashboard')}>← Visão geral</button><span className="eyebrow">ARQUIVOS</span><h1>Biblioteca de mídia</h1><p>Envie imagens para usar nas páginas e nos eventos.</p></div></div><section className="cms-block"><label className="media-upload-box"><Upload size={22}/><b>{mediaBusy?'Enviando arquivo…':'Adicionar mídia'}</b><span>JPG, PNG ou WebP · até 10 MB</span><input type="file" accept="image/jpeg,image/png,image/webp" disabled={mediaBusy} onChange={e=>uploadLibraryFile(e.target.files?.[0])}/></label><div className="media-library-grid">{mediaFiles.map(file=><article key={file.path}><img src={file.url} alt={file.name}/><span>{file.name}</span><button type="button" onClick={()=>{navigator.clipboard?.writeText(file.url);notify('URL copiada.');}}>Copiar URL</button><button type="button" className="icon-danger" onClick={()=>deleteMediaFile(file)}>Excluir arquivo</button></article>)}</div></section></>:
   <><div className="cms-top"><div><button className="cms-back" onClick={()=>setTab('dashboard')}>← Visão geral</button><span className="eyebrow">EDITOR DE CONTEÚDO</span><h1>{sections.find(x=>x[0]===tab)?.[1]}</h1><p>Edite os campos e itens desta seção. Adicione ou remova itens quando necessário.</p></div><button className="red-btn" onClick={save}><Save size={16}/> Salvar e publicar</button></div><section className="cms-block">{editorContent}</section><div className="cms-bottom"><button className="red-btn" onClick={save}><Save size={16}/> Salvar e publicar</button><button onClick={()=>setTab('dashboard')}>Voltar ao painel</button></div></>}
  </section>
 </div>;
}

createRoot(document.getElementById('root')).render(<App/>);
