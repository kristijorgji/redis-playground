__author__      = "Kristi Jorgji"

import matplotlib.pyplot as plt
import re
import csv

x = []
y = []


def to_mebibyte(value, quantifier):  
    switcher = {
        'MiB': 1,        
        'GiB': 1024
    }
    t = switcher.get(quantifier, "Unknown size")
    return t * float(value)

with open('performance/2021-03-11.log','r') as csvfile:
    plots = csv.reader(csvfile, delimiter=',')
    for row in plots:
        match = re.search('(\d+\.?\d*)(\w+)', row[1])
        kbUsage =  to_mebibyte(match.group(1), match.group(2))
        x.append(int(row[0]))
        y.append(kbUsage)

plt.plot(x,y, label='Memory usage of redis in KiB')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.show()


