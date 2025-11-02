import { WebSocketServer } from 'ws';
import { JWT_TOKEN } from './config';
import jwt from "jsonwebtoken";


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  console.log(url);
  if(!url){
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]); 
  console.log(queryParams);
  const token = queryParams.get("token") as string;
  console.log(token);
  const decoded = jwt.verify(token,JWT_TOKEN) as { userId : string };

  console.log(decoded);

  if(!decoded || !decoded.userId){
    ws.close();
    return;
  }

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});