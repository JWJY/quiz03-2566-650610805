import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  const roomId = request.nextUrl.searchParams.get("roomId");

  const foundroomId = DB.rooms.find((x) => x.roomId === roomId);
  readDB();
  if(!foundroomId){
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }
  
};

export const POST = async (request) => {
  readDB();
  const body = await request.json();
  const foundroomId = DB.rooms.find((x) => x.roomId === body.roomId);
  readDB();
  if(!foundroomId){
    return NextResponse.json(
      {
        ok: false,
        message: `Room is not found`,
      },
      { status: 404 }
    );
  }

  const messageId = nanoid();
  DB.messages.push({
    messageId,
  });

  writeDB();

  return NextResponse.json({
    ok: true,
    messageId,
    message: "Message has been sent",
  });
};

export const DELETE = async (request) => {
  const rawAuthHeader = headers().get("authorization");
  const payload = checkToken();

  const body = await request.json();

  if(!payload){
    return NextResponse.json(
    {
      ok: false,
      message: "Invalid token",
    },
    { status: 401 }
  );
  }

  readDB();



  const foundIndex = DB.messages.findIndex(
    (x) => x.messageId === body.messageId
  );
  if (foundIndex === -1) {
    return NextResponse.json(
    {
      ok: false,
      message: "Message is not found",
    },
    { status: 404 }
  );
  }

  DB.enrollments = DB.enrollments.filter(
    (x) => x.messageId != body.messageId 
  );

  writeDB();

  return NextResponse.json({
    ok: true,
    message: "Message has been deleted",
  });
};
