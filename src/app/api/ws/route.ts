import { NextRequest } from "next/server";
import { IncomingMessage } from "http";
import { Socket } from "net";
import WebSocket, { WebSocketServer } from "ws";

export const config = {
  runtime: "nodejs", // 在 Node.js 環境運行
};

let wss: WebSocketServer | null = null;

export async function GET(req: NextRequest) {
  if (!req.headers.get("upgrade")?.includes("websocket")) {
    return new Response("Expected WebSocket", { status: 426 });
  }

  // 使用 Node.js server 啟動 WebSocket
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const server = (req as any).socket?.server;
  if (!server) {
    return new Response("Socket server unavailable", { status: 500 });
  }

  if (!wss) {
    wss = new WebSocketServer({ noServer: true });
    server.on("upgrade", (request: IncomingMessage, socket: Socket, head: Buffer) => {
      wss?.handleUpgrade(request, socket, head, (ws) => {
        wss?.emit("connection", ws, request);
      });
    });

    wss.on("connection", (ws: WebSocket) => {
      console.log("New WebSocket connection");

      ws.on("message", (message: string) => {
        try {
          const { requestId } = JSON.parse(message); // 提取 requestId
          console.log(`收到請求: ${requestId}`);

          // 每秒發送資料，連續發送 10 次
          let counter = 0;
          const interval = setInterval(() => {
            if (counter < 10) {
              ws.send(
                JSON.stringify({
                  requestId,
                  value: Math.random() * 100,
                  timestamp: Date.now(),
                })
              );
              counter++;
            } else {
              clearInterval(interval);
              ws.close();
            }
          }, 1000);
        } catch (error) {
          console.error("訊息解析錯誤:", error);
        }
      });

      ws.on("close", () => {
        console.log("WebSocket 已關閉");
      });
    });
  }

  return new Response(null, { status: 101 });
}
