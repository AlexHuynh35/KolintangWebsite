import psycopg2

def get_database(name, user, password, host, port):
    return psycopg2.connect(
        dbname = name,
        user = user,
        password = password,
        host = host,
        port = port
    )

def insert_request(cursor, name, email, phone, date, venue, city, state, message):
    if check_request_date(cursor, date) and check_request_contact(cursor, email, phone):
        cursor.execute(
            """INSERT INTO booking_requests (name, email, phone, event_date, venue, city, state, message) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);""",
            (name, email, phone, date, venue, city, state, message,)
        )
        return True
    else:
        return False

def check_request_date(cursor, date):
    cursor.execute(
        """SELECT * FROM booking_requests WHERE event_date = %s;""",
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