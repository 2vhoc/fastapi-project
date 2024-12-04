from serverData import MyCursor, MyServer
MyCursor.execute("INSERT INTO Acc(User, Name, Password, Email) VALUES('2vhoc7', 'Vu Van Hoc', '29082005', '2vhoc7@gmail.com')")
MyServer.commit()
print('ok')