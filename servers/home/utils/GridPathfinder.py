#You are in a grid with 8 rows and 6 columns, and you are positioned in the top-left corner of that grid. You are trying to reach the bottom-right corner of the grid, but you can only move down or right on each step. Determine how many unique paths there are from start to finish.
#Data should be displayed as an array, i.e. [8, 6]

def numberOfPaths(r, c):
  if r == 1 or c == 1:
    return 1

  return numberOfPaths(r-1, c) + numberOfPaths(r, c-1)

    r: int = 8
    c: int = 6

print(numberOfPaths(r, c))
