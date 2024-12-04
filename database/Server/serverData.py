import mysql.connector as mc 

MyServer = mc.connect(
    host = "localhost",
    user = 'root',
    password = '29082005',
    database = 'Accounts',
)

MyCursor = MyServer.cursor()