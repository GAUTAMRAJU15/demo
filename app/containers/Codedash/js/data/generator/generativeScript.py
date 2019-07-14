import random
import os
import subprocess

operands = ["+","-","/","//","*","**","%"]
selectedOperands = []
print(selectedOperands)

numbers = [0,1,2,3,4,5,6,7,8,9]

howManyToSelect = random.randrange(2,5,1)

selectedNumbers = []

for i in range(howManyToSelect):
    selectedNumbers.append(random.choice(numbers))

for i in range(howManyToSelect - 1):
    selectedOperands.append(random.choice(operands))

print(selectedNumbers)
print(selectedOperands)

function = ["print"]

selectedFunction = random.choice(function)

finalString = selectedFunction+"("+str(selectedNumbers[0])

for i in range(1,howManyToSelect):
    finalString += selectedOperands[i-1]
    finalString += str(selectedNumbers[i])

finalString += ")"

print(finalString)

f = open("temp.py","w+")
f.write(finalString+"\n")
f.close()

command = open("temp.py").read()

exec(command)