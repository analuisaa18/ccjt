import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{createClient}from'@supabase/supabase-js';
import{Menu,X,ArrowRight,MapPin,Phone,Mail,Instagram,LogIn,LogOut,Check,Trash2,Plus,Upload,Image as ImageIcon,Save,LayoutDashboard,CalendarDays,Images,FileText,Settings}from'lucide-react';
import'./style.css';
const URL=import.meta.env.VITE_SUPABASE_URL,KEY=import.meta.env.VITE_SUPABASE_ANON_KEY,supabase=URL&&KEY?createClient(URL,KEY):null;
const DEFAULT={
 nav:[{id:'sobre',label:'Sobre nós'},{id:'acervo',label:'Acervo'},{id:'programacao',label:'Programação'},{id:'projetos',label:'Projetos especiais'},{id:'memorias',label:'Memórias'}],
 brand:'CASA DE CULTURA JUAREZ TEIXEIRA',home:{intro:'Entre, explore e conheça as histórias, exposições e as memórias que fazem parte deste lugar tão especial.',button:'Conhecer',heroImage:'/assets/fachada-ilustrada.jpg',historyTitle:'NOSSA HISTÓRIA',history1:'A Casa de Cultura Juarez Teixeira nasceu de uma coleção, mas nunca foi apenas sobre objetos. Inaugurada em outubro de 2021, em plena pandemia de COVID-19, ela abriu suas portas quando o mundo ainda vivia um tempo de distanciamento. Em um momento em que tantas histórias pareciam suspensas, a Casa surgiu para lembrar que a memória também aproxima, acolhe e cria pertencimento.',history2:'Tudo começou com o acervo reunido ao longo da vida por Juarez da Rosa Teixeira. Com o tempo, esse patrimônio deixou de ser uma coleção particular para se tornar uma construção coletiva. Hoje, reúne quase 3.000 objetos, documentos e fotografias, doados por mais de 300 famílias, que ajudam a preservar a história de Caçapava do Sul e da região.',historyImage:'/assets/equipe-casa.jpg',visitImage:'/assets/equipe-visita.jpg',historyCaption:'Linha fundadora! A nossa primeira equipe: Juarez e Zaira Teixeira, Gisele Teixeira, João Timótheo Esmerio Machado, Luiz Antônio Beck, Luciene Barbiero Machado, André Dalmazzo, Airton Dalmaso e Bruno Saldanha.',history3:'Recebemos estudantes, pesquisadores, artistas, turistas e moradores que encontram aqui um lugar para descobrir histórias, compartilhar conhecimentos e criar novas memórias. Acreditamos que a cultura é mais viva quando é compartilhada. Por isso, a Casa de Cultura Juarez Teixeira é, acima de tudo, um espaço construído por muitas mãos, aberto a todos e em constante transformação.',history4:'Desde o início, porém, a Casa escolheu olhar não apenas para o passado, mas também para o presente. Além de preservar a memória, promove exposições, oficinas, cinema, música, feiras, lançamentos de livros e ações educativas que transformam o espaço em um ponto permanente de encontro entre cultura, educação e comunidade.',callout:'RECONHECIDA COMO PONTO DE CULTURA PELO GOVERNO FEDERAL E DECLARADA PATRIMÔNIO CULTURAL IMATERIAL DE CAÇAPAVA DO SUL.',teamTitle:'CONHEÇA A ATUAL EQUIPE DA CASA',teamImage:'',
 team:[{title:'Juarez Teixeira',text:'Referência da história e da memória cultural da Casa.'},{title:'Gisele Teixeira',text:'Atuação na preservação e comunicação cultural.'},{title:'Equipe e colaboradores',text:'Pessoas que fazem a programação e o acolhimento acontecer.'}],
 teamDesktop:[
 {name:'Juarez da Rosa Teixeira',role:'Diretor',text:'Médico aposentado e pesquisador. Autor dos livros Caçapava, um olhar sobre o século XX e Parando rodeio nas lembranças.'},
 {name:'Gisele Teixeira',role:'Gestora',text:'Jornalista formada pela Universidade de Santa Maria (UFSM). Especialista em Gestão e Salvaguarda do Patrimônio Cultural Imaterial pela FLACSO (Buenos Aires/Argentina) e em Educação em Museus pela Universidad Abierta Interamericana - UAI (Argentina).'},
 {name:'Carla Madeira',role:'Arquivista',text:'Arquivista formada pela Universidade Federal do Rio Grande do Sul (UFRGS).'},
 {name:'Sabryna Sacol de Freitas',role:'Mediadora',text:''}
 ],
 milestonesTitle:'PRINCIPAIS MARCOS',milestoneGallery:[{image:''},{image:''},{image:''},{image:''}],
 milestonesDesktop:[
 {year:'2021',title:'O COMEÇO DE TUDO',text:'',columns:[
 'A primeira doação para a Casa de Cultura foi feita por Ione Dalmazzo, um equipamento que mede a umidade dos grãos.',
 'Ainda antes de abrir as portas, a Casa de Cultura promoveu o projeto Serenatas da Casa, que levou música a recuperados de Covid e equipes que trabalharam na emergência sanitária.',
 'Transporte do piano do Clube União Caçapavana para a Casa de Cultura, uma força tarefa que contou com a ajuda do grupo Dagoberto Barcellos.',
 'Inauguração oficial da Casa, em outubro de 2021, com a presença do prefeito de Caçapava do Sul, Giovanni Amestoy.'
 ],items:[]},
 {year:'2022',title:'A CASA GANHA VIDA',text:'Primeiro ano completo de funcionamento, marcado pela ampliação do acervo e pelo início de uma programação cultural permanente.',items:['Ampliação do acervo','Inauguração do projeto **Trama de saberes**','Primeiras visitas escolares','**Início das exposições temporárias** (Tango e Bandoneón e Caçapava do Sul, Noivas e Aias, Geoparque Caçapava, Guaiaca Cheia, Caçapava de Chuteiras, Bombas de Chimarrão, Kuarup)','Realização do primeiro **Brique da Casa**','Visita dos avaliadores da UNESCO (Geoparque Caçapava)','Primeiros recursos de emendas para investimentos em projetos']},
 {year:'2023',title:'CONSOLIDAÇÃO',text:'A Casa amplia sua atuação e fortalece sua presença como espaço de memória, educação e cultura.',items:['Novas exposições temporárias (Objetos Cotidianos, Prá lá de Marrakesh, Apache)','Primeiro círculo de debates','Primeiro Carnaval da Casa','Crescimento das visitas escolares','Novas edições do Brique da Casa','Primeiras oficinas de gastronomia','Primeiro concerto (Fado e Tango)','Ampliação do acervo','Inauguração do Mural','Primeiros recursos da Lei Paulo Gustavo']},
 {year:'2024',title:'NOVOS PROJETOS',text:'Ano de expansão das atividades culturais e educativas',items:['Novas exposições temporárias (Foi no Carnaval que passou, Leques do Mundo, Festival de Folclore, Aves de Caçapava do Sul)','Primeiro concerto internacional (Fado e Tango)','Concertos de João Pedro Teixeira e Miquéu Montanaro e de Gabriel Rivano','Inauguração do Cine Lux','CCJT como parceira local do documentário Caçapava e a Revolução de 23','Parceria com o curso de Arquivologia da UFSM para tratamento de documentos','Realização de curso de Educação Patrimonial para Perene Patrimônio (Salvamento da Casa dos Ministérios)','Crescimento das visitas escolares','Novas edições do Brique da Casa','Ampliação do acervo','Primeiros recursos da PNAB']},
 {year:'2025',title:'CRESCIMENTO INSTITUCIONAL',text:'A Casa fortalece sua atuação, recebe reconhecimentos e amplia parcerias institucionais.',items:['CCJT recebe reconhecimento de Patrimônio Imaterial de Caçapava do Sul','Projeto A Escola vai ao Museu','Organização e digitalização do acervo dos primórdios do Hospital de Caridade','Novas exposições temporárias (Ciclo Não é tralha, é paixão: com Rádios Antigos, A volta ao mundo em 100 souvenirs Miniaturas de Carros; Vinil como patrimônio afetivo, Bolsas: modo de viver)','Equipe se capacita no curso de conservação e restauração de livros (Centro Histórico e Cultura Santa Casa/POA e de oficina de digitalização de documentos/UFSM)','Produção e lançamento do Podcast Nas Ondas da Rádio Caçapava, com Liége Alves.','Sessões de autógrafos de livros','Novas edições do Brique da casa.']},
 {year:'2026',title:'UM NOVO CAPÍTULO',text:'A Casa amplia seu espaço, recebe novos reconhecimentos, reorganiza o acervo e reforça projetos voltados à preservação da memória e à democratização da cultura.',items:['Oficialmente reconhecida como Ponto de Cultura pelo Governo Federal','Início do projeto Caçapava Tramada (Teto de Crochê)','Ampliação da Casa em cerca de 200m2','Novo espaço para documentação','Reforço nos projetos de oficinas artesanais','Novo site institucional','Projetos de preservação e digitalização do acervo','Novas exposições (Adriano Lopes colore Flash Gordon)','Fortalecimento das parcerias','Continuidade das ações culturais e educativas']}
 ],milestones:[
 {title:'2021 — O COMEÇO DE UM NOVO CICLO',text:'Organização e fortalecimento das ações culturais e de preservação da memória.',items:[]},
 {title:'2022 — A CASA GANHA VIDA',text:'Atividades, encontros e iniciativas que ampliam o vínculo com a comunidade.',items:[]},
 {title:'2023 — CONSOLIDAÇÃO',text:'Continuidade das ações e valorização do patrimônio cultural.',items:[]},
 {title:'2024 — NOVAS PARCERIAS',text:'Projetos e colaborações para ampliar o acesso à cultura.',items:[]},
 {title:'2025 — CRESCIMENTO INSTITUCIONAL',text:'Fortalecimento da Casa como espaço de referência cultural.',items:[]},
 {title:'2026 — UM NOVO CAPÍTULO',text:'Novas experiências, registros e possibilidades de participação.',items:[]}
 ]},
 acervo:{title:'ACERVO',heroImage:'/assets/fundo-acervo.jpg',intro:'Um espaço dedicado à preservação da história, da cultura e das memórias que fazem parte da nossa identidade. Conheça os objetos, registros e histórias que compõem o acervo da Casa de Cultura e mantêm vivo o patrimônio da nossa comunidade.',items:[{title:'Marionete de Gaúcho',meta:'Doação: Arquivista Maria Alice, Caçapava do Sul',text:'Esta marionete representa um pouco da tradição e da identidade cultural gaúcha. Preservada como parte do acervo, a peça simboliza a riqueza das manifestações populares, dos costumes e das histórias que atravessam gerações.',image:'/assets/marionete.jpg'},{title:'Memória e tradição',meta:'Acervo da Casa de Cultura',text:'Objetos como este guardam lembranças e ajudam a contar histórias sobre a comunidade, seus costumes e suas expressões culturais.',image:'/assets/marionete.jpg'}]},
 programacao:{title:'PROGRAMAÇÃO',heroImage:'/assets/fundo-programacao.jpg',intro:'DE QUARTA A DOMINGO, DAS 10H ÀS 12H E DAS 14H ÀS 17H. ENTRADAS: R$ 10 (INTEIRA) E R$ 5 (MEIA).',eventImage:'/assets/cine-lux.jpg'},
 projetos:{title:'PROJETOS ESPECIAIS',heroImage:'/assets/fundo-projetos.jpg',intro:'A Casa de Cultura realiza e recebe iniciativas que aproximam pessoas, territórios e diferentes formas de expressão artística.',featureTitle:'Encontros que preservam histórias',featureText:'Projetos que valorizam a memória local, promovem a troca de saberes e fortalecem o acesso à cultura.',items:[{title:'Memória e patrimônio',text:'Registros, acervos e histórias que ajudam a manter viva a identidade cultural.',image:'/assets/marcos-historicos.jpg'},{title:'Educação e comunidade',text:'Atividades e visitas que aproximam estudantes e comunidade do patrimônio.',image:'/assets/equipe-visita.jpg'},{title:'Cultura em movimento',text:'Experiências culturais, encontros e atividades para diferentes públicos.',image:'/assets/cine-lux.jpg'}]},
 memorias:{title:'MEMÓRIAS',heroImage:'/assets/fundo-memorias.jpg',formTitle:'Deixar Meu Registro e Memória',intro:'Um lugar se torna especial pelas histórias que vive. Conte-nos a sua e ajude a manter viva a memória da Casa de Cultura.',nameLabel:'Seu Nome / Autor da Memória',dateLabel:'Data de Registro da memória',categoryLabel:'Tipo e Categoria de Registro',bodyLabel:'Relato da Memória',bodyPlaceholder:'Compartilhe uma lembrança vivida na Casa de Cultura ou algo que tenha despertado uma memória especial em você.',uploadLabel:'Arquivo de Memória (Opcional)',submitLabel:'Enviar para curadoria',approvedTitle:'MEMÓRIAS COMPARTILHADAS'},
 support:[{title:'ASSOCIE-SE À CASA',text:'Quer ajudar a decidir os próximos passos da Casa, não só sustentá-la? Torne-se sócio e tenha voz ativa nas decisões da instituição.'},{title:'VIRE UM AMIGO DA CASA COM PIX MENSAL',text:'Adote a Casa com um valor mensal, do tamanho que fizer sentido para você: R$10, R$20, R$50, o que puder.'},{title:'FAÇA UMA DOAÇÃO QUANDO PUDER',text:'Sem compromisso mensal, sem burocracia: quando quiser ajudar, é só fazer um pix ou transferência.'}],
 theme:{primary:'#c9000b',gold:'#e9a83e',paper:'#f4f1ef',ink:'#171515',headingFont:'Playfair Display',bodyFont:'DM Sans'},footer:{instagramUrl:'https://instagram.com/ccjteixeira',contactTitle:'CONTATO',phone:'+55 55 996961582',email:'ccjuarezteixeira@gmail.com',addressTitle:'ENDEREÇO',address:'Rua Osório, 730, Caçapava do Sul - RS',instagram:'@ccjteixeira',credits:'Projeto desenvolvido por Ana Bocheneck no Laboratório de Interface — Disciplina de Introdução ao Desenho de Projeto. Ilustrações por André Dalmazzo e Daniela Gomes.'}
};
const clone=x=>JSON.parse(JSON.stringify(x));
const Rich=({text})=>String(text??'').split(/\*\*(.+?)\*\*/g).map((part,i)=>i%2?<b key={i}>{part}</b>:part);
function App(){
 const [data,setData]=useState(DEFAULT),[page,setPage]=useState(location.pathname.replace(/\/$/,'')==='/admin'?'admin':(location.hash.slice(1)||'sobre')),[menu,setMenu]=useState(false),[session,setSession]=useState(null),[events,setEvents]=useState([]),[memories,setMemories]=useState([]),[toast,setToast]=useState('');
 const isAdmin=page==='admin'||location.pathname==='/admin';
 const notify=t=>{setToast(t);setTimeout(()=>setToast(''),4000)};
 useEffect(()=>{const r=document.documentElement;r.style.setProperty('--red',data.theme.primary);r.style.setProperty('--gold',data.theme.gold);r.style.setProperty('--paper',data.theme.paper);r.style.setProperty('--ink',data.theme.ink);r.style.setProperty('--serif',`'${data.theme.headingFont}', Georgia, serif`);r.style.setProperty('--sans',`'${data.theme.bodyFont}', Arial, sans-serif`)},[data.theme]);
 useEffect(()=>{const f=()=>{setPage(location.pathname.replace(/\/$/,'')==='/admin'?'admin':(location.hash.slice(1)||'sobre'));window.scrollTo(0,0)};addEventListener('hashchange',f);addEventListener('popstate',f);return()=>{removeEventListener('hashchange',f);removeEventListener('popstate',f)}},[]);
  useEffect(()=>{
   if(!supabase)return;
   supabase.auth.getSession().then(({data})=>setSession(data.session));
   const {data:authListener}=supabase.auth.onAuthStateChange((_event,session)=>setSession(session));
   supabase.from('site_content').select('content').eq('id','main').maybeSingle().then(({data:contentRow})=>{
    if(contentRow?.content)setData(merge(DEFAULT,contentRow.content));
   });
   supabase.from('events').select('*').eq('status','published').order('event_date').then(({data:rows,error})=>{
    if(!error)setEvents(rows||[]);
   });
   supabase.from('memories').select('*').eq('status','approved').order('created_at',{ascending:false}).then(({data:rows})=>setMemories(rows||[]));
   return ()=>authListener.subscription.unsubscribe();
  },[]);
 const go=id=>{setPage(id);if(id==='admin'){history.pushState({},'', '/admin')}else{history.pushState({},'', id==='sobre'?'/':'/#'+id)}setMenu(false);window.scrollTo({top:0,behavior:'smooth'})};
 const update=(path,value)=>setData(old=>{const n=clone(old);let o=n;path.slice(0,-1).forEach(k=>o=o[k]);o[path.at(-1)]=value;return n});
 const save=async()=>{if(!supabase){notify('Configure o Supabase para salvar alterações permanentemente.');return}const{error}=await supabase.from('site_content').upsert({id:'main',content:data,updated_at:new Date().toISOString()});notify(error?'Erro ao salvar: '+error.message:'Alterações publicadas no site!')};
 if(isAdmin)return <><main className="admin-shell"><Admin data={data} setData={setData} save={save} session={session} setSession={setSession} events={events} setEvents={setEvents} notify={notify} onViewSite={()=>go('sobre')}/></main>{toast&&<div className="toast">{toast}</div>}</>;
 return <><header className="header"><a className="brand official-logo-crop" href="#" aria-label="Casa de Cultura Juarez Teixeira — início" onClick={e=>{e.preventDefault();go('sobre')}}><img src="/assets/CCJT_marca.png" alt="Casa de Cultura Juarez Teixeira" /></a><nav className="desktop-nav">{data.nav.map(n=><button key={n.id} className={page===n.id?'active':''} onClick={()=>go(n.id)}>{n.label}</button>)}</nav><button className="hamb" onClick={()=>setMenu(!menu)} aria-label="Abrir menu">{menu?<X/>:<Menu/>}</button></header>
 {menu&&<><div className="veil" onClick={()=>setMenu(false)}></div><nav className="mobile-nav">{data.nav.map(n=><button key={n.id} className={page===n.id?'active':''} onClick={()=>go(n.id)}>{n.label}<ArrowRight size={17}/></button>)}</nav></>}
 <main>{page==='sobre'?<Home data={data} go={go}/>:page==='acervo'?<Acervo data={data}/>:page==='programacao'?<Programacao data={data} events={events}/>:page==='projetos'?<Projetos data={data}/>:page==='memorias'?<Memorias data={data} memories={memories} notify={notify}/>:<Home data={data} go={go}/>}</main>
 <Footer data={data} admin={()=>go('admin')}/>{toast&&<div className="toast">{toast}</div>}</>;
}
function merge(base,extra){if(Array.isArray(base))return Array.isArray(extra)?extra:base;if(base&&typeof base==='object')return Object.fromEntries(Object.keys(base).map(k=>[k,merge(base[k],extra?.[k])]));return extra??base}
function Hero({title,image}){return <section className="inner-hero" style={{backgroundImage:`url("${image}")`}}><div className="hero-title">{title}</div></section>}
function Home({data:d,go}){return <><section className="home-hero"><div className="home-intro"><div className="big-logo official-logo-crop" aria-label="Casa de Cultura Juarez Teixeira"><img src="/assets/CCJT_marca.png" alt="Casa de Cultura Juarez Teixeira" /></div><p>{d.home.intro}</p><button className="red-btn" onClick={()=>document.getElementById('historia')?.scrollIntoView({behavior:'smooth'})}>{d.home.button}<ArrowRight size={15}/></button></div><div className="home-building" style={{backgroundImage:`url("${d.home.heroImage}")`}}/></section><section id="historia" className="section-pad history-section"><div className="history-main-photo"><img className="wide-photo" src={d.home.historyImage} alt=""/><div className="history-ribbon">{d.home.historyTitle}</div></div><div className="history-copy history-copy-top"><p>{d.home.history1}</p><p>{d.home.history2}</p></div><div className="photo-story"><img src={d.home.visitImage} alt=""/><p>{d.home.historyCaption}</p></div><div className="history-copy history-copy-bottom"><p>{d.home.history3}</p><p>{d.home.history4}</p></div><div className="red-band">{d.home.callout}</div><section className="team">
 {d.home.teamImage?<img className="team-mobile-photo" src={d.home.teamImage} alt=""/>:<div className="team-photo-placeholder team-mobile-photo" aria-label="Espaço reservado para fotografia da equipe"/>}
 {d.home.teamImage?<img className="team-desktop-photo" src={d.home.teamImage} alt="Equipe atual da Casa"/>:<div className="team-photo-placeholder team-desktop-photo" aria-label="Espaço reservado para fotografia da equipe"/>}
 <div className="team-content team-mobile-content"><h2>{d.home.teamTitle}</h2><div className="people-grid">{d.home.team.map((p,i)=><p key={i}><b>{p.title}</b><br/>{p.text}</p>)}</div></div>
 <div className="team-content team-desktop-content"><h2>{d.home.teamTitle}</h2><div className="team-desktop-grid">{(d.home.teamDesktop||[]).map((p,i)=><article className="team-person" key={i}><h3>{p.name}{p.role?`/${p.role}`:''}</h3>{p.text&&<p>{p.text}</p>}</article>)}</div></div>
 </section><h2 className="section-heading">{d.home.milestonesTitle}</h2>
 <div className="milestone-gallery">{(d.home.milestoneGallery||[{image:''},{image:''},{image:''},{image:''}]).map((slot,i)=><div className={`milestone-gallery-item milestone-gallery-${i+1}`} key={i}>{slot.image?<img src={slot.image} alt={`Fotografia dos principais marcos ${i+1}`}/>:<div className="milestone-gallery-placeholder" aria-label={`Espaço reservado para fotografia ${i+1}`}/>}</div>)}</div>
 <div className="milestones milestones-mobile">{d.home.milestones.map((m,i)=>{const parsed=String(m.title||'').match(/^(\\d{4})\\s*[—–-]?\\s*(.*)$/);return <article key={i}><div className="milestone-year-wrap"><span className="milestone-year">{m.year||parsed?.[1]||''}</span></div><div className="milestone-detail"><h3>{parsed?.[2]||m.title}</h3><p>{m.text}</p>{Array.isArray(m.items)&&m.items.length>0&&<ul>{m.items.map((item,j)=><li key={j}>{item}</li>)}</ul>}</div></article>})}</div> <div className="milestones milestones-desktop">{(d.home.milestonesDesktop||[]).map((m,i)=>{const cols=Array.isArray(m.columns)?m.columns.filter(c=>String(c||'').trim()):[];const items=Array.isArray(m.items)?m.items.filter(c=>String(c||'').trim()):[];return <article className="milestone-block" key={i}>
 <div className="milestone-year-wrap"><span className="milestone-year">{m.year}</span></div>
 <div className="milestone-content"><h3>{m.title}</h3>
 {cols.length>0?<>{m.text&&<p className="milestone-intro-full"><Rich text={m.text}/></p>}<div className="milestone-columns">{cols.map((item,j)=><p key={j}><Rich text={item}/></p>)}</div></>:<div className="milestone-two-columns"><p><Rich text={m.text}/></p>{items.length>0&&<ul>{items.map((item,j)=><li key={j}><Rich text={item}/></li>)}</ul>}</div>}
 </div></article>})}</div></section><Support data={d}/></>}
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
 useEffect(()=>{
  const g=data.home.milestoneGallery;
  if(!Array.isArray(g)||g.length<4){
   const fixed=Array.isArray(g)?[...g]:[];
   while(fixed.length<4)fixed.push({image:''});
   setData(prev=>({...prev,home:{...prev.home,milestoneGallery:fixed}}));
  }
 },[data.home.milestoneGallery]);
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
  if(Array.isArray(value)){const name=String(path[path.length-1]||'');const templates={items:path.includes('acervo')?{title:'',meta:'',text:'',image:''}:{title:'',text:'',image:''},team:{title:'',text:''},teamDesktop:{name:'',role:'',text:''},milestones:{year:'',title:'',text:'',columns:[],items:[]},columns:'',milestoneGallery:{image:''},support:{title:'',text:''},nav:{id:'',label:''}};return templates[name]||'Novo item';}
  if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,Array.isArray(v)?[]:v&&typeof v==='object'?makeNewItem(v,[...path,k]):typeof v==='number'?0:typeof v==='boolean'?false:'']));
  return '';
 };
 function editor(value,path,label){
  const key=String(path[path.length-1]??label);
  if(Array.isArray(value))return <div className="cms-array" key={path.join('.')}>
   <div className="cms-array-head"><div><h4>{label}</h4><small>{value.length} item(ns)</small></div><button type="button" onClick={()=>updateAt(path,[...value, value.length?makeNewItem(value[0],path):makeNewItem(value,path)])}><Plus size={15}/> Adicionar item</button></div>
   {value.map((item,index)=><div className="cms-array-item" key={index}><div className="cms-array-title"><b>{label} {index+1}</b><div className="cms-array-actions"><button type="button" disabled={index===0} onClick={()=>{const next=[...value];[next[index-1],next[index]]=[next[index],next[index-1]];updateAt(path,next);}}>↑ Subir</button><button type="button" disabled={index===value.length-1} onClick={()=>{const next=[...value];[next[index+1],next[index]]=[next[index],next[index+1]];updateAt(path,next);}}>↓ Descer</button><button type="button" className="icon-danger" onClick={()=>{if(window.confirm(`Remover ${label.toLowerCase()} ${index+1}?`))updateAt(path,value.filter((_,i)=>i!==index));}}><Trash2 size={15}/> Remover</button></div></div>{editor(item,[...path,index],`${label} ${index+1}`)}</div>)}
  </div>;
  if(value&&typeof value==='object')return <fieldset className="cms-fieldset" key={path.join('.')}><legend>{label}</legend><div className="cms-fields">{Object.entries(value).map(([k,v])=>editor(v,[...path,k],({historyTitle:'Título Nossa História',historyImage:'Fotografia principal da história',history1:'1º parágrafo — desktop à esquerda / mobile primeiro',history2:'2º parágrafo — desktop à direita / mobile segundo',visitImage:'Segunda fotografia da história',historyCaption:'Legenda da segunda fotografia',history3:'3º parágrafo — desktop à esquerda / mobile terceiro',history4:'4º parágrafo — desktop à direita / mobile quarto',teamTitle:'Título da equipe',teamImage:'Fotografia principal da equipe',teamDesktop:'Integrantes da equipe (desktop)',name:'Nome do integrante',role:'Cargo/função',columns:'Acontecimentos de 2021 (quatro textos independentes)',milestonesDesktop:'Linha do tempo desktop (2021–2026)',milestones:'Conteúdo da linha do tempo mobile (preservado)',milestoneGallery:'Galeria dos principais marcos (4 imagens)',year:'Ano do marco',items:'Acontecimentos (um item por linha)',callout:'Texto da faixa vermelha de destaque'}[k]||k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase()))))}</div></fieldset>;
  if(typeof value==='boolean')return <label className="cms-field" key={path.join('.')}><span>{label}</span><input type="checkbox" checked={value} onChange={e=>updateAt(path,e.target.checked)}/></label>;
  const long=String(value??'').length>90||/(text|intro|description|body|credits|callout|placeholder|content|texto|descri|relato)/i.test(key);
  const color=/(color|primary|gold|paper|ink|red)/i.test(key)&&/^#?[0-9a-f]{3,8}$/i.test(String(value||''));
  return <label className="cms-field" key={path.join('.')}><span>{label}</span>
   {imageField(key)?<><input value={value||''} onChange={e=>updateAt(path,e.target.value)} placeholder="URL da imagem"/><div className="cms-upload"><input type="file" accept="image/png,image/jpeg,image/webp" onChange={e=>uploadImage(path,e.target.files?.[0])}/><Upload size={15}/> Enviar/substituir imagem</div>{value&&<><img className="cms-image-preview" src={value} alt={`Prévia: ${label}`}/><button type="button" className="cms-remove-image" onClick={()=>updateAt(path,'')}>Remover imagem</button></>}</>:
   color?<div className="cms-color-input"><input type="color" value={String(value).startsWith('#')?value:'#000000'} onChange={e=>updateAt(path,e.target.value)}/><input value={value??''} onChange={e=>updateAt(path,e.target.value)} /></div>:
   long?<textarea rows={4} value={value??''} onChange={e=>updateAt(path,e.target.value)}/>:<input value={value??''} onChange={e=>updateAt(path,e.target.value)}/>}</label>;
 }
 const home=data.home;
 const moveIn=(path,list,i,dir)=>{const n=[...list];const j=i+dir;if(j<0||j>=n.length)return;[n[i],n[j]]=[n[j],n[i]];updateAt(path,n);};
 const rowActions=(path,list,i,what)=><div className="cms-array-actions"><button type="button" disabled={i===0} onClick={()=>moveIn(path,list,i,-1)}>↑ Subir</button><button type="button" disabled={i===list.length-1} onClick={()=>moveIn(path,list,i,1)}>↓ Descer</button><button type="button" className="icon-danger" onClick={()=>{if(window.confirm(`Remover ${what}?`))updateAt(path,list.filter((_,k)=>k!==i));}}><Trash2 size={15}/> Remover</button></div>;
 const textField=(path,label,value,rows)=><label className="cms-field" key={path.join('.')}><span>{label}</span>{rows?<textarea rows={rows} value={value??''} onChange={e=>updateAt(path,e.target.value)}/>:<input value={value??''} onChange={e=>updateAt(path,e.target.value)}/>}</label>;
 const listEditor=(path,list,label,rows,addLabel)=>{const arr=Array.isArray(list)?list:[];return <div className="cms-array"><div className="cms-array-head"><div><h4>{label}</h4><small>{arr.length} item(ns)</small></div><button type="button" onClick={()=>updateAt(path,[...arr,''])}><Plus size={15}/> {addLabel||'Adicionar'}</button></div>{arr.map((item,i)=><div className="cms-array-item" key={i}><div className="cms-array-title"><b>{label} {i+1}</b>{rowActions(path,arr,i,`${label.toLowerCase()} ${i+1}`)}</div><textarea rows={rows||2} value={item??''} onChange={e=>updateAt([...path,i],e.target.value)}/></div>)}{arr.length===0&&<small>Nenhum item cadastrado.</small>}</div>;};
 const teamList=Array.isArray(home.teamDesktop)?home.teamDesktop:[];
 const teamEditor=<><h2>Sobre Nós — Equipe</h2><p className="cms-editor-help">Título, fotografia vertical e integrantes da seção “Conheça a atual equipe da casa” (versão desktop). Os integrantes aparecem em duas colunas, na ordem abaixo.</p>
  <fieldset className="cms-fieldset"><legend>Título e fotografia</legend><div className="cms-fields">{textField(['home','teamTitle'],'Título da seção',home.teamTitle)}{editor(home.teamImage,['home','teamImage'],'Fotografia principal da equipe (vertical)')}</div></fieldset>
  <div className="cms-array"><div className="cms-array-head"><div><h4>Integrantes</h4><small>{teamList.length} integrante(s)</small></div><button type="button" onClick={()=>updateAt(['home','teamDesktop'],[...teamList,{name:'',role:'',text:''}])}><Plus size={15}/> Adicionar integrante</button></div>
  {teamList.map((p,i)=><div className="cms-array-item" key={i}><div className="cms-array-title"><b>Integrante {i+1}{p.name?` — ${p.name}`:''}</b>{rowActions(['home','teamDesktop'],teamList,i,`o integrante ${i+1}`)}</div><div className="cms-fields">{textField(['home','teamDesktop',i,'name'],'Nome',p.name)}{textField(['home','teamDesktop',i,'role'],'Cargo / função',p.role)}</div>{textField(['home','teamDesktop',i,'text'],'Descrição',p.text,4)}</div>)}</div></>;
 const galleryLabels=['Primeira fotografia — linha 1, esquerda (larga)','Segunda fotografia — linha 1, direita','Terceira fotografia — linha 2, esquerda (vertical)','Quarta fotografia — linha 2, direita (larga)'];
 const galleryList=Array.from({length:4},(_,i)=>home.milestoneGallery?.[i]||{image:''});
 const galleryEditor=<><h2>Sobre Nós — Galeria dos Principais Marcos</h2><p className="cms-editor-help">Quatro espaços de fotografia com proporções fixas (o site recorta a imagem para preencher o espaço, sem distorcer). Envie um arquivo, cole uma URL, substitua ou remova. Sem imagem, o site mostra um espaço cinza neutro.</p>
  <fieldset className="cms-fieldset"><legend>Título</legend><div className="cms-fields">{textField(['home','milestonesTitle'],'Título da seção',home.milestonesTitle)}</div></fieldset>
  {galleryList.map((g,i)=><fieldset className="cms-fieldset" key={i}><legend>{galleryLabels[i]}</legend><div className="cms-fields">{editor(g.image,['home','milestoneGallery',i,'image'],`Fotografia ${i+1}`)}</div></fieldset>)}</>;
 const years=Array.isArray(home.milestonesDesktop)?home.milestonesDesktop:[];
 const yp=['home','milestonesDesktop'];
 const timelineEditor=<><h2>Sobre Nós — Linha do tempo</h2><p className="cms-editor-help">Um bloco por ano. Cada ano tem faixa vermelha (ano), título, texto introdutório e lista de acontecimentos. Para destacar uma parte do texto em negrito, coloque-a entre dois asteriscos: **assim**. Para o formato em colunas lado a lado (como em 2021), preencha “Textos em colunas”: nesse caso a lista de acontecimentos não é exibida.</p>
  {years.map((m,i)=><details className="cms-year" key={i}><summary>{m.year||'Novo ano'} — {m.title||'Sem título'}</summary><div className="cms-year-body">
   {rowActions(yp,years,i,`o ano ${m.year||i+1}`)}
   <div className="cms-fields">{textField([...yp,i,'year'],'Ano (faixa vermelha)',m.year)}{textField([...yp,i,'title'],'Título do marco',m.title)}</div>
   {textField([...yp,i,'text'],'Texto introdutório',m.text,3)}
   {listEditor([...yp,i,'items'],m.items,'Acontecimento',2,'Adicionar acontecimento')}
   {listEditor([...yp,i,'columns'],m.columns,'Texto em coluna',3,'Adicionar texto em coluna')}
  </div></details>)}
  <div className="cms-array-head"><button type="button" onClick={()=>updateAt(yp,[...years,{year:'',title:'',text:'',columns:[],items:[]}])}><Plus size={15}/> Adicionar ano</button></div></>;
 const {teamTitle:_a,teamImage:_b,teamDesktop:_c,milestonesTitle:_d,milestoneGallery:_e,milestonesDesktop:_f,...homeRest}=data.home;
 const sections=[['dashboard','Visão geral',LayoutDashboard],['home','Página inicial',FileText],['sobre-equipe','Sobre Nós — Equipe',FileText],['sobre-galeria','Sobre Nós — Galeria',Images],['sobre-timeline','Sobre Nós — Linha do tempo',CalendarDays],['acervo','Acervo',Images],['programacao','Programação',CalendarDays],['projetos','Projetos especiais',FileText],['memorias','Memórias',Images],['support','Apoio e rodapé',Settings],['nav','Menu e identidade',Settings],['theme','Aparência e cores',Settings],['media','Biblioteca de mídia',ImageIcon]];
 const current=tab==='home'?data.home:tab==='acervo'?data.acervo:tab==='programacao'?data.programacao:tab==='projetos'?data.projetos:tab==='memorias'?data.memorias:tab==='support'?{support:data.support,footer:data.footer}:tab==='nav'?{brand:data.brand,nav:data.nav}:tab==='theme'?{theme:data.theme}:null;
 if(!session)return <section className="admin-login wp-login"><div className="wp-login-brand"><div className="wp-login-logo official-logo-crop"><img src="/assets/CCJT_marca.png" alt="Casa de Cultura Juarez Teixeira"/></div><span>PAINEL DE ADMINISTRAÇÃO</span></div><form onSubmit={login}><LogIn/><h1>Acessar o painel</h1><p>Entre com o e-mail e a senha da conta autorizada da Casa de Cultura.</p><input type="email" placeholder="E-mail" autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Senha" autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} required/><button className="red-btn" type="submit">Entrar no painel</button><button type="button" className="wp-forgot" onClick={recoverPassword}>Esqueci minha senha</button><a className="wp-back-site" href="/">Voltar ao site</a></form></section>;
 const editorContent=tab==='home'?<><h2>Página inicial e Nossa História</h2><p className="cms-editor-help">Gerencie as imagens, título, quatro parágrafos, legenda e faixa de destaque da seção Nossa História. As mesmas informações são usadas no desktop e no mobile.</p>{editor(homeRest,['home'],'Conteúdo da página inicial')}<p className="cms-editor-help">Equipe, galeria e linha do tempo têm menus próprios: “Sobre Nós — Equipe”, “Galeria” e “Linha do tempo”.</p></>:tab==='sobre-equipe'?teamEditor:tab==='sobre-galeria'?galleryEditor:tab==='sobre-timeline'?timelineEditor:tab==='nav'?<><h2>Nome e navegação do site</h2>{editor(data.brand,['brand'],'Nome institucional')}{editor(data.nav,['nav'],'Itens do menu')}</>:tab==='theme'?<><h2>Identidade visual</h2>{editor(data.theme,['theme'],'Cores e tipografia')}</>:tab==='support'?<><h2>Conteúdo de apoio e rodapé</h2>{editor(data.support,['support'],'Blocos de apoio')}{editor(data.footer,['footer'],'Rodapé e contatos')}</>:current?editor(current,[tab],sections.find(x=>x[0]===tab)?.[1]):null;
 return <div className="cms wp-admin">
  <div className="wp-adminbar"><div className="wp-adminbar-brand"><div className="wp-adminbar-logo official-logo-crop"><img src="/assets/CCJT_marca.png" alt="Casa de Cultura Juarez Teixeira"/></div> <span className="wp-adminbar-label">Administração</span></div><div className="wp-adminbar-actions"><button type="button" onClick={onViewSite}>↗ Visualizar site</button><button type="button" onClick={()=>supabase.auth.signOut()}>Sair</button></div></div>
  <aside className="cms-sidebar"><div className="cms-logo"><div className="cms-logo-mark official-logo-crop"><img src="/assets/CCJT_marca.png" alt="Casa de Cultura Juarez Teixeira"/></div><small>PAINEL DO SITE</small></div><div className="wp-menu-label">GERENCIAR</div>{sections.map(([id,name,Icon])=><button type="button" className={tab===id?'selected':''} onClick={()=>setTab(id)} key={id}><Icon size={17}/>{name}</button>)}<div className="wp-menu-label wp-tools-label">CONTA</div><button type="button" className="cms-logout" onClick={()=>supabase.auth.signOut()}><LogOut size={17}/> Sair</button></aside>
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
