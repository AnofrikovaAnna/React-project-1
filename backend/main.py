from fastapi import FastAPI, HTTPException
import sqlite3
import hashlib
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class RegisterData(BaseModel):
    name: str
    surname: str
    login: str
    password: str

class LoginData(BaseModel):
    login: str
    password: str

def hash_pwd(pwd):
    return hashlib.sha256(pwd.encode()).hexdigest()

@app.post("/api/signup")
def register(data: RegisterData):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id FROM users WHERE login = ?", (data.login,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="Логин уже зарегистрирован")
        
        cursor.execute("""
            INSERT INTO users (name, surname, login, password, is_auth)
            VALUES (?, ?, ?, ?, 1)
        """, (data.name, data.surname, data.login, hash_pwd(data.password)))
        
        conn.commit()
        user_id = cursor.lastrowid
        
        return {
            "data": {
                "id": user_id,
                "isAuth": True
            },
            "status": 200,
            "statusText": "OK",
        }
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        raise HTTPException(500, str(e))
    finally:
        conn.close()

@app.post("/api/signin")
def login(data: LoginData):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        hashed_password = hash_pwd(data.password)

        cursor.execute("""
            SELECT id, name, surname, login, is_auth 
            FROM users 
            WHERE login = ? AND password = ?
        """, (data.login, hashed_password))
        
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=401, detail="Неверный логин или пароль")
        
        cursor.execute("UPDATE users SET is_auth = 1 WHERE id = ?", (user[0],))
        conn.commit()
        
        return {
            "data": {
                "id": user[0],
                "isAuth": True
            },
            "status": 200,
            "statusText": "OK",
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, str(e))
    finally:
        conn.close()

@app.post("/api/signout")
def logout(user_id: int):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("UPDATE users SET is_auth = 0 WHERE id = ?", (user_id,))
        conn.commit()
        
        return {
            "data": {
                "isAuth": False
            },
            "status": 200,
            "statusText": "OK",
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, str(e))
    finally:
        conn.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)