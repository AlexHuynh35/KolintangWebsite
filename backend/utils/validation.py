import re

def validate_email(email):
    pattern = r'^[^@\s]+@[^@\s]+\.[^@\s]+$'
    return re.match(pattern, email) is not None

def validate_phone(phone):
    digits = re.sub(r"\D", "", phone)
    return len(digits) == 10