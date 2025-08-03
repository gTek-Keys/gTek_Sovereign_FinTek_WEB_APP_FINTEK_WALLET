from fastapi import FastAPI
from routes import router

app = FastAPI(title="Sovereign Comm Backend")
app.include_router(router)
