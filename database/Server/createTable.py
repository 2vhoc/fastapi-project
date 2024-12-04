from serverData import MyCursor, MyServer

MyCursor.execute("CREATE TABLE Acc(User VARCHAR(255), Name VARCHAR(255), Password VARCHAR(255),Email VARCHAR(255))")

MyServer.commit()