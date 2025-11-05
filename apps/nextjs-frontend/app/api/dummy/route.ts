import { NextRequest, NextResponse } from "next/server";
import { prisma, Room } from "@repo/db";
import { DATABASE_URL } from "@repo/shared-secrets/secrets";

export async function POST(req: NextRequest) {
    console.log(DATABASE_URL);
    type RoomModel = Room;
    const { roomName } = await req.json();
    try{
         const newRoom: RoomModel  = await prisma.room.create({
            data:{
                name: roomName
            }
        })
        console.log(newRoom);
        return NextResponse.json({ success: true, room: newRoom });
    }
   catch(err){
    if(err instanceof Error){
        console.log('Unable to create room',err);

        return NextResponse.json({
            error : err
        })
    }
   }
}