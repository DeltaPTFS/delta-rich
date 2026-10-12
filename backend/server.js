import http from 'node:http';

const port = Number(process.env.PORT || 10000);
const clientId = '1559217374668922882';
const secret = process.env.DISCORD_CLIENT_SECRET;

const server = http.createServer(async (req,res)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS'){res.writeHead(204).end();return;}
  if(req.url==='/' || req.url==='/health'){
    res.writeHead(200,{'Content-Type':'application/json'}).end(JSON.stringify({status:'ok',name:'Delta Activity OAuth backend'}));return;
  }
  if(req.url!== '/api/token' || req.method!=='POST'){
    res.writeHead(404).end('Not found');return;
  }
  if(!secret){res.writeHead(503).end(JSON.stringify({error:'Server DISCORD_CLIENT_SECRET is not set'}));return;}
  try{
    let body='';
    for await(const chunk of req){body+=chunk;if(body.length>10000){res.writeHead(413).end();return;}}
    const {code}=JSON.parse(body);
    if(typeof code!=='string' || !code){res.writeHead(400).end(JSON.stringify({error:'Missing code'}));return;}
    const form=new URLSearchParams({client_id:clientId,client_secret:secret,grant_type:'authorization_code',code});
    const r=await fetch('https://discord.com/api/v10/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:form});
    const data=await r.json();
    res.writeHead(r.ok?200:400,{'Content-Type':'application/json','Cache-Control':'no-store'}).end(JSON.stringify(r.ok?{access_token:data.access_token}: {error:data.error||'Token exchange failed',description:data.error_description||''}));
  }catch(e){res.writeHead(500,{'Content-Type':'application/json'}).end(JSON.stringify({error:'OAuth exchange failed'}));}
});
server.listen(port,'0.0.0.0',()=>console.log('OAuth backend listening on '+port));
