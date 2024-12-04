import mysql.connector as mc

MyDB = mc.connect(
    host = "localhost",
    user = 'root',
    password = '29082005',
)
if MyDB.is_connected():
    print("Connected to MySQL database")
else:
    print("Connection failed")
MyCursor = MyDB.cursor()

print("Thanh cong tao DATABASE")

