import random
import os
strTest = ""
numberOfVarialbles = random.randrange(2,5,2)

variables = ['a','b','c','d']

numbers = [0,1,2,3,4,5,6,7,8,9]

operators = [">","<","<=",">=","==","!="]

connector = ["and","or"]

selectedNumbers = []

howManyToSelect = numberOfVarialbles

f = open("temp2.py","w+")
f.write("")
f.close()

f = open("temp2.py","a+")

for i in range(howManyToSelect):
    selectedNumbers.append(random.choice(numbers))

for i in range(numberOfVarialbles):
    f.write(variables[i]+" = "+str(selectedNumbers[i]))
    strTest += variables[i]+" = "+str(selectedNumbers[i]) + "\n"
    f.write("\n")

ifString = "if "
count = 0
for i in range(howManyToSelect):
    ifString += variables[i]+" "
    count += 1
    if(count%2 == 0 and howManyToSelect > count):
        ifString += random.choice(connector) + " "
    elif howManyToSelect != count:
        ifString += random.choice(operators) + " "
    
ifString += ":\n\tprint(\"inside\")\nelse:\n\tprint(\"outside\")"
strTest += ifString
f.write(ifString)
f.close()

command = open("temp2.py").read()
print(strTest)
v = exec(strTest)
print(v)