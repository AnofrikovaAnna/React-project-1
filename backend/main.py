from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
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

class Login(BaseModel):
    login: str

class User(BaseModel):
    id: int
    name: str
    surname: str
    login: str
    age: int
    country: str
    city: str
    studyPlace: str
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
            return JSONResponse(
                status_code=400,
                content={
                    "data": None,
                    "status": 400,
                    "statusText": "Логин уже зарегистрирован"
                }
            )
        
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
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
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
            return JSONResponse(
                status_code=401,
                content={
                    "data": None,
                    "status": 401,
                    "statusText": "Неверный логин или пароль"
                }
            )
        
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
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

@app.post("/api/signout")
def logout(data: Login):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("UPDATE users SET is_auth = 0 WHERE login = ?", (data.login,))
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
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

@app.get("/api/profile/{login}")
def get_user_by_login(login: str):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT name, surname, login, age, country, city, study_place FROM users WHERE login = ?",
            (login,)
        )
        user = cursor.fetchone()

        if not user:
            return JSONResponse(
                status_code=404,
                content={
                    "data": None,
                    "status": 404,
                    "statusText": "Пользователь не найден"
                }
            )

        return {
            "data": {
                "name": user[0],
                "surname": user[1],
                "login": user[2],
                "age": user[3],
                "country": user[4],
                "city": user[5],
                "studyPlace": user[6],
            },
            "status": 200,
            "statusText": "OK"
        }
    except HTTPException:
        raise
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

@app.put("/api/profile/{login}/update")
def update_user_by_login(login: str, data: User):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute("SELECT login FROM users WHERE id = ?", (data.id,))
        if not cursor.fetchone():
            return JSONResponse(
                status_code=404,
                content={
                    "data": None,
                    "status": 404,
                    "statusText": "Пользователь не найден"
                }
            )
        
        cursor.execute("SELECT id FROM users WHERE login = ?", (data.login,))

        id = cursor.fetchone()

        if id and id[0] != data.id:
            return JSONResponse(
                status_code=400,
                content={
                    "data": None,
                    "status": 400,
                    "statusText": "Логин уже зарегистрирован"
                }
            )
        

        if data.password == '':
            cursor.execute(
                """
                UPDATE users
                SET name = ?,
                    surname = ?,
                    age = ?,
                    country = ?,
                    city = ?,
                    study_place = ?,
                    login = ?
                WHERE id = ?
                """,
                (
                    data.name,
                    data.surname,
                    data.age,
                    data.country,
                    data.city,
                    data.studyPlace,
                    data.login,
                    data.id
                )
            )
        else:
            cursor.execute(
                """
                UPDATE users
                SET name = ?,
                    surname = ?,
                    age = ?,
                    country = ?,
                    city = ?,
                    study_place = ?,
                    login = ?,
                    password = ?
                WHERE id = ?
                """,
                (
                    data.name,
                    data.surname,
                    data.age,
                    data.country,
                    data.city,
                    data.studyPlace,
                    data.login,
                    hash_pwd(data.password),
                    data.id
                )
            )

        conn.commit()

        return {
            "data": None,
            "status": 200,
            "statusText": "Данные успешно обновлены"
        }
    except HTTPException:
        raise
    except Exception as e:
        conn.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

@app.delete("/api/profile/{user_id}/update")
def delete_account(user_id: int):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return JSONResponse(
                status_code=404,
                content={
                    "data": None,
                    "status": 404,
                    "statusText": "Пользователь не найден"
                }
            )
        
        cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
        
        conn.commit()
        
        return {
            "data": None,
            "status": 200,
            "statusText": "Аккаунт успешно удален"
        }
        
    except Exception as e:
        conn.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()






class CompetitionCreate(BaseModel):
    name: str
    date: str
    duration: int
    numOfTasks: int
    userId: int

@app.post("/api/newcomp")
def create_competition(comp: CompetitionCreate):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute(
            "SELECT name FROM competitions WHERE name = ?",
            (comp.name,)
        )
        if cursor.fetchone():
            return JSONResponse(
                status_code=400,
                content={
                    "data": None,
                    "status": 400,
                    "statusText": "Соревнование с таким именем уже существует"
                }
            )
        
        cursor.execute(
            """
            INSERT INTO competitions (num_of_tasks, duration, name, date, is_ended, user_id)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                comp.numOfTasks,
                comp.duration,
                comp.name,
                comp.date,
                0,
                comp.userId
            )
        )

        conn.commit()

        competition_id = cursor.lastrowid

        return {
            "data": {
                "id": competition_id,
            },
            "status": 201,
            "statusText": "Соревнование успешно создано"
        }
    except HTTPException:
            raise
    except Exception as e:
        conn.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

class CompetitionStoreInterface(BaseModel):
    id: int
    name: str
    date: str
    numOfTasks: int
    duration: int
    isEnded: bool
    userId: int

def to_dict(c) -> dict:
    return {
        "id": c.id,
        "name": c.name,
        "date": c.date,
        "numOfTasks": c.numOfTasks,
        "duration": c.duration,
        "isEnded": c.isEnded,
        "userId": c.userId
    }

@app.get("/api/getallcomp")
def get_all_competitions():
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, name, date, num_of_tasks, duration, is_ended, user_id
            FROM competitions
            ORDER BY id DESC
            """
        )
        rows = cursor.fetchall()

        competitions = []
        for row in rows:
            competition = CompetitionStoreInterface(
                id=row[0],
                name=row[1],
                date=row[2],
                numOfTasks=row[3],
                duration=row[4],
                isEnded=bool(row[5]),
                userId=row[6]
            )
            competitions.append(competition)

        competitions_list = [to_dict(comp) for comp in competitions]

        return {
            "data": competitions_list,
            "status": 200,
            "statusText": "Список соревнований успешно получен"
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

@app.get("/api/user/{id}/getcomp")
def get_all_competitions(id: int):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()

    try:
        cursor.execute(
            """
            SELECT id, name, date, num_of_tasks, duration, is_ended, user_id
            FROM competitions
            WHERE user_id = ?
            ORDER BY id DESC
            """,
            (id,)
        )
        rows = cursor.fetchall()

        competitions = []
        for row in rows:
            competition = CompetitionStoreInterface(
                id=row[0],
                name=row[1],
                date=row[2],
                numOfTasks=row[3],
                duration=row[4],
                isEnded=bool(row[5]),
                userId=row[6]
            )
            competitions.append(competition)

        competitions_list = [to_dict(comp) for comp in competitions]

        return {
            "data": competitions_list,
            "status": 200,
            "statusText": "Список соревнований успешно получен"
        }
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка сервера"
            }
        )
    finally:
        conn.close()

class Date(BaseModel):
    date: str

@app.patch("/api/comp/{id}/changedate")
def update_competition_time(id:int, date: Date):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id FROM competitions WHERE id = ?", (id,))
        if not cursor.fetchone():
            return JSONResponse(
                status_code=404,
                content={
                    "data": None,
                    "status": 404,
                    "statusText": "Соревнование не найдено"
                }
            )
        
        cursor.execute("UPDATE competitions SET date = ? WHERE id = ?", (date.date, id,))
        conn.commit()
        
        return {
            "data": {
                "id": id,
            },
            "status": 200,
            "statusText": "Время соревнования успешно обновлено"
        }
        
    except Exception as e:
        conn.rollback()
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": "Ошибка на сервере"
            }
        )
    finally:
        conn.close()

@app.get("/api/user/{user_id}/lastcomp")
def get_last_user_competition(user_id: int):
    conn = sqlite3.connect('database.db')
    cursor = conn.cursor()
    
    try:
        cursor.execute("SELECT id FROM users WHERE id = ?", (user_id,))
        if not cursor.fetchone():
            return JSONResponse(
                status_code=404,
                content={
                    "data": None,
                    "status": 404,
                    "statusText": "Пользователь не найден"
                }
            )
        
        cursor.execute("""
            SELECT id, name, date, num_of_tasks, duration, is_ended, user_id
            FROM competitions
            WHERE user_id = ?
            ORDER BY id DESC
            LIMIT 1
        """, (user_id,))
        
        row = cursor.fetchone()

        competition = None
        statusText = "Соревнование не найдено"
        
        if row:
            competition = {
                "id": row[0],
                "name": row[1],
                "date": row[2],
                "numOfTasks": row[3],
                "duration": row[4],
                "isEnded": bool(row[5]),
                "userId": row[6]
            }
            statusText = "Последнее соревнование успешно получено"
        
        return {
            "data": competition,
            "status": 200,
            "statusText": statusText
        }
        
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "data": None,
                "status": 500,
                "statusText": f"Ошибка на сервере: {str(e)}"
            }
        )
    finally:
        conn.close()


@app.get("/api/protected")
def protected_page(token: str = None):
    if not token:
        return JSONResponse(
            status_code=401,
            content={
                    "data": None,
                    "status": 401,
                    "statusText": "Необходима авторизация"
                }
        )
    return {"data": "OK"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, port=8000)