import { WebSocketServer } from 'ws';
import { verifyToken } from "@clerk/backend";
import { CLERK_SECRET_KEY } from "@repo/shared-secrets/secrets"

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', async function connection(ws, request) {
  const url = request.url;
  console.log(url);
  if(!url){
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]); 
  console.log(queryParams);
  const token = queryParams.get("token");

  if(!token){
    ws.close();
    return;
  }

  // Verify Clerk token manually
  try{
    const { sub: userId } = await verifyToken(token,{
      secretKey : CLERK_SECRET_KEY
    })

    if(!userId){
      ws.close();
      return;
    }
    console.log("Authenticated user",userId);
    ws.send(`Welcome authenticated user ${userId} you are connected securely`)
  }
  catch(err){
    console.error("Clerk token verification failed",err);
    ws.close();
  }
  
  // const decoded = jwt.verify(token,JWT_TOKEN) as { userId : string };

  // console.log(decoded);

  // if(!decoded || !decoded.userId){
  //   ws.close();
  //   return;
  // }

  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});