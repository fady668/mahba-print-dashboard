string = "test some things"
string2 = "test (2)"

print(string2.replace(" ", "").replace("(", "").replace(")", ""))
if string2.strip(" ").strip("(").strip(")") == "test" :
    print("ok")