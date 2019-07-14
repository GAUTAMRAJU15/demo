from random_word import RandomWords
import random

r = RandomWords()
string = r.get_random_word()

f = open("temp3.py","w+")
f.write("")
f.close()

f = open("temp3.py","a+")

var = "s = \""+string+"\"\n"

f.write(var)

functions = [".find(",".index(",".count("]

finalString = "print(s"+random.choice(functions)+"\'"+random.choice(string)+"\'))"

f.write(finalString)
f.close()

exec(open("temp3.py").read())