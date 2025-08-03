from fastapi import APIRouter, UploadFile, File
import pytesseract
from PIL import Image
import io

router = APIRouter()

@router.post("/ocr")
async def run_ocr(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("L")
    text = pytesseract.image_to_string(image)
    return {"text": text[:2000]}
