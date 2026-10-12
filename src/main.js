import { DiscordSDK } from '@discord/embedded-app-sdk';
import './style.css';

const CLIENT_ID = '1559217374668922882';
const sdk = new DiscordSDK(CLIENT_ID);
const root = document.querySelector('#app');
root.innerHTML = `<main><div class="brand">▲ <span>DELTA</span></div><div class="sub">AIR LINES · COMMUNITY ACTIVITY</div><h1>Welcome aboard.</h1><p>Delta Air Lines community experience, built for Discord.</p><div id="status" role="status">Waiting for Discord…</div><button id="presence" disabled>Set Competing Activity</button><p class="foot">This Activity must launch inside Discord. It does not create a permanent profile status or a Join Server profile button.</p></main>`;
const status = document.querySelector('#status');
const button = document.querySelector('#presence');
const setStatus=(s)=>{status.textContent=s;};
async function start(){
  try {
    if (!new URLSearchParams(location.search).has('frame_id')) { setStatus('Website online. Launch this Activity from Discord to connect.'); return; }
    await sdk.ready();
    setStatus('Connected to Discord. Rich Presence requires the rpc.activities.write OAuth scope and a secure token-exchange backend.');
    button.disabled=false;
  } catch (e) {setStatus('Discord connection failed: '+(e.message||String(e)));}
}
button.addEventListener('click',async()=>{
  button.disabled=true;
  try {
    await sdk.commands.setActivity({activity:{type:5,details:'Delta Air Lines Community',state:'Welcome aboard',assets:{large_image:'delta_logo_main',large_text:'Delta Air Lines'}}});
    setStatus('Competing activity submitted. Check your Discord profile.');
  } catch(e) {
    setStatus('Could not set activity: '+(e.message||String(e))+'. Discord may require OAuth authentication and a server-side token exchange.');
  } finally {button.disabled=false;}
});
start();
