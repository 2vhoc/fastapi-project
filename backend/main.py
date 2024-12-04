from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import Union
import numpy as np
import cv2
from io import BytesIO
import base64
from queryDB import MyServer, MyCursor

index = 0

class ImageData(BaseModel):
    img: str
    group: str


class Form(BaseModel):
    user: str
    Name: Union[str, None] = None
    password: str


app = FastAPI()
app.mount("/static", StaticFiles(directory="../frontend/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
async def UI():
    with open("../frontend/home.html", "r") as f:
        return HTMLResponse(content=f.read(), status_code=200)
    

@app.get("/login")
async def login():
    with open("../frontend/login.html", "r") as f:
        return HTMLResponse(content=f.read(), status_code=200)
main = None
@app.get("/index")
async def index():
    with open("../frontend/index.html", "r") as f:
        return HTMLResponse(content=f.read(), status_code=200)
@app.get("/index/nameDisplay")
async def nameDisplay():
    if main:
        return JSONResponse(content={"main": main})
    else:
        return JSONResponse(content={"main": "No user logged in"})
    
    


@app.post("/api/recognize")
async def recognize(imgData: ImageData):
    try:
        ImageSeries = imgData.img.split(',')[1]
        ImageByte = base64.b64decode(ImageSeries)
        ImageNP = np.frombuffer(ImageByte, np.uint8)
        Image = cv2.imdecode(ImageNP, cv2.IMREAD_COLOR)
        if Image is None:
            print("Del the tai anh")
        cv2.imwrite(f"../anhtest/anh{index}.png", Image)
        print(imgData.group)
    except:
        pass
@app.post("/login/forms")
async def User(form: Form):
    user = form.user
    password = form.password
    MyCursor.execute("SELECT User, Name, Email, Password FROM Accounts.Acc")
    Data = MyCursor.fetchall()
   # print(user, password)
    global main
    for us, nm, em, pw in Data:
        #print(us, pw)
        if((us == user or em == user) and pw == password):
            form.Name = nm
            main = form.Name
            print(form.Name)
            return JSONResponse(content={"success": True, "message": "Login successfully"})
    return JSONResponse(content={
        "succes": False, "detail": "Invalid"
    })
    print('thanh cong')
    # if form.user == valid_users['us'] and valid_users['pw'] == form.password:
    #     print('if ok')
    #     return {"success": True, "message": "Login successful"}
    # else:
    #     print('sai rooif')
    #     raise HTTPException(status_code=401, detail="Invalid username or password dcm")
 