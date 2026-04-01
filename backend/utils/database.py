import psycopg2
import bcrypt

def get_database(name, user, password, host, port):
    return psycopg2.connect(
        dbname = name,
        user = user,
        password = password,
        host = host,
        port = port
    )

def insert_request(cursor, name, email, phone, date, venue, city, state, event_type, length, message):
    if check_request_date(cursor, date) and check_request_contact(cursor, email, phone):
        cursor.execute(
            """INSERT INTO booking_requests (name, email, phone, event_date, venue, city, state, event_type, length, message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s);""",
            (name, email, phone, date, venue, city, state, event_type, length, message,)
        )
        return True
    else:
        return False

def check_request_date(cursor, date):
    cursor.execute(
        """SELECT * FROM booking_requests WHERE event_date = %s AND (status = 'pending' OR status = 'confirmed');""",
        (date,)
    )
    requests = cursor.fetchall()
    return len(requests) == 0

def check_request_contact(cursor, email, phone):
    cursor.execute(
        """SELECT * FROM booking_requests WHERE (email = %s OR phone = %s) AND status = 'pending';""",
        (email, phone,)
    )
    requests = cursor.fetchall()
    return len(requests) == 0

def check_login(cursor, email, password):
    cursor.execute(
        """SELECT * FROM admins WHERE email = %s;""",
        (email,)
    )
    admin = cursor.fetchone()
    if admin:
        if bcrypt.checkpw(password.encode(), admin[2].encode()):
            return admin
    return None

def get_all_requests(cursor):
    cursor.execute("SELECT id, name, email, phone, event_date, venue, city, state, event_type, length, message, status FROM booking_requests")
    requests = cursor.fetchall()

    request_list = []
    for request in requests:
        request_list.append({
            "id": request[0],
            "name": request[1],
            "email": request[2],
            "phone": request[3],
            "date": request[4].strftime("%Y-%m-%d"),
            "venue": request[5],
            "city": request[6],
            "state": request[7],
            "type": request[8],
            "length": request[9],
            "message": request[10],
            "status": request[11]
        })
    return request_list

def update_status(cursor, booking_id, status):
    cursor.execute(
        """UPDATE booking_requests SET status = %s WHERE id = %s RETURNING *""",
        (status, booking_id,)
    )
    updated = cursor.fetchone()
    if updated:
        return updated
    return None