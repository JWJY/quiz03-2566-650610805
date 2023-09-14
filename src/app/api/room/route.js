import { DB, readDB, writeDB } from "@/app/libs/DB";
import { checkToken } from "@/app/libs/checkToken";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// http://localhost:3000/

export const GET = async () => {
  const roomId = request.nextUrl.searchParams.get("roonId");
  const roomName = request.nextUrl.searchParams.get("roomName");

  // const roomNoList = [];
  //   for (const room of DB.rooms) {
  //     if (room.studentId === studentId) {
  //       courseNoList.push(enroll.courseNo);
  //     }
  //   } 

  const foundIndex = DB.rooms.findIndex();

  readDB();
  return NextResponse.json({
    ok: true,
    rooms: DB.rooms,
    totalRooms: foundIndex,
  });
};

export const POST = async (request) => {
  const rawAuthHeader = headers().get("authorization");
  const token = rawAuthHeader.split(" ")[1];
  const payload = checkToken();

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

  const foundroomName = DB.rooms.find(
    (x) => x.roomId === roomId 
  );
  if (foundroomName) {
    return NextResponse.json(
    {
      ok: false,
      message: `Room ${"replace this with room name"} already exists`,
    },
    { status: 400 }
  );
  }

  const roomId = nanoid();
  DB.rooms.push({
    roomId,
  });
  //call writeDB after modifying Database
  writeDB();

  return NextResponse.json({
    ok: true,
    roomId,
    message: `Room ${"replace this with room name"} has been created`,
  });
};
