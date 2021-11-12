from fastapi import FastAPI, File, UploadFile
import shutil
import wave
import logging, sys

app = FastAPI()

logger = logging.getLogger(__name__)
handler = logging.StreamHandler(sys.stdout)
logger.addHandler(handler)
logger.setLevel(logging.DEBUG)


@app.get("/")
def read_root():
    with wave.open("upload.wav","rb") as fp:
        logger.debug(fp.getnchannels())
    fp.close()
    return {"Hello": "World"}

@app.post("/mic")
async def create_upload_file(file: UploadFile = File(...)):
    try:
        with open('./upload.wav',"wb") as fp:
            shutil.copyfileobj(file.file,fp)
            fp.write(file.file.read())
    except Exception as e:
        logger.error(str(e))
    return {"file": file.content_type}
