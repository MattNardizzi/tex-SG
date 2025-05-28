# mock_ws_server.py
import asyncio
import websockets
import json

async def handler(websocket):
    while True:
        data = {
            "agent_focus": "Strategic Planning",
            "coherence": 0.92,
            "emotion": "hope"
        }
        await websocket.send(json.dumps(data))
        await asyncio.sleep(2)

start_server = websockets.serve(handler, "localhost", 8000, path="/ws/tex")

asyncio.get_event_loop().run_until_complete(start_server)
print("🧪 Mock WebSocket running at ws://localhost:8000/ws/tex")
asyncio.get_event_loop().run_forever()