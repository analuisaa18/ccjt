# Casa de Cultura Juarez Teixeira — Site + Painel de Administração

Aplicação React/Vite com páginas responsivas e painel editorial para a equipe atualizar o conteúdo sem editar código. A interface administrativa foi organizada por seções, em um fluxo familiar para quem já utiliza WordPress: escolher a página, editar campos, enviar imagens e publicar.

## Rodar localmente
1. Instale Node.js 20 ou superior.
2. Extraia o ZIP e abra a pasta no terminal.
3. Execute `npm install`.
4. Copie `.env.example` para `.env` e preencha as credenciais do Supabase.
5. Execute `npm run dev`.
6. Para gerar a versão de produção: `npm run build` (saída em `dist`).

## Acesso ao painel
- No rodapé do site, clique no pequeno ponto após os créditos para abrir a Área Administrativa.
- Entre com o e-mail e a senha de um usuário criado previamente em Supabase > Authentication > Users.
- Não existe cadastro público de administradores.
- O painel tem visão geral e menu por áreas: Sobre Nós, Acervo, Programação, Projetos Especiais, Memórias, Apoio e Rodapé, Menu e Identidade e Aparência e Cores.

## O que a equipe pode editar
- **Menu e identidade:** nome da Casa e rótulos/ordem dos links do menu.
- **Sobre Nós:** textos, títulos, fotos, equipe, marcos históricos e botão Conhecer.
- **Acervo:** título, apresentação, itens, metadados, descrições e imagens. É possível adicionar/remover itens.
- **Programação:** texto de apresentação e imagem da página; criar, editar e excluir eventos com data, horário, local, preço e descrição.
- **Projetos Especiais:** textos, títulos, imagens e cards; adicionar/remover cards.
- **Memórias:** textos do formulário e imagem da página; aprovar ou rejeitar envios feitos pelos visitantes.
- **Apoio e rodapé:** textos dos blocos de apoio, telefone, e-mail, endereço, Instagram e créditos.
- **Aparência e cores:** cores principais e fontes de títulos/corpo.
- **Imagens:** em cada campo de imagem, a equipe pode colar uma URL ou enviar um arquivo pelo próprio painel (bucket `site-media`).

Após alterar qualquer conteúdo, clique em **Salvar e publicar**. O conteúdo do site é salvo em `site_content` (JSONB) no Supabase.

## Configurar Supabase
1. Crie um projeto Supabase.
2. Abra SQL Editor e execute o arquivo `supabase/schema.sql`.
3. Crie o usuário da equipe em Authentication > Users.
4. Configure `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` em `.env` e nas variáveis de ambiente da Vercel.
5. O script SQL cria tabelas para memórias, eventos, materiais pedagógicos e conteúdo editável, além dos buckets `memories` e `site-media`.
6. Ajuste no painel Storage os limites e tipos de arquivo permitidos conforme a política da instituição.

**Segurança:** use apenas a chave pública `anon` no frontend. Nunca coloque `service_role` no navegador. As alterações de conteúdo, eventos e mídia do site exigem autenticação. Revise as políticas RLS e os limites de upload antes de produção.

## Publicar na Vercel
- Build command: `npm run build`
- Output directory: `dist`
- Adicione as variáveis do Supabase em Settings > Environment Variables e faça novo deploy.

## Observações
- O painel salva conteúdo em Supabase; sem credenciais válidas, o site usa o conteúdo inicial e o login administrativo não fica disponível.
- O ZIP original continha imagens exportadas do Figma, não o arquivo editável com camadas e componentes. A implementação usa HTML/CSS/JS para as páginas e usa apenas recortes de imagens individuais como mídia, não páginas inteiras como PNG.
- A página de Programação começa vazia até a equipe cadastrar os eventos no painel. A programação pode então ser mantida pela equipe sem alterar código.
