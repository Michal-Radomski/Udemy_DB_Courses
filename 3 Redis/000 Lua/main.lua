print("Hello World!")
print(111)

local sum = 1+1
sum = 5
print(sum)

if sum >0 then
    print ("Sum is greaten than 0")
end

if sum ~= 0 then
    print ("Sum is not equal 0")
end

if sum == 0 then
    print ("Sum is equal 0")
end

-- 0 and "" is truthy
if 0 and "" then
    print("0 is truthy")
end

if nil then
  print("won't run")
end

-- Create an array of players
players = {"Player1", "Player2", "Player3"}

-- Accessing the first player
print(players[1])  -- Outputs: Player1

-- Adding a new player
table.insert(players, "Player4")
print(players[4])  -- Outputs: Player4

for i, player in ipairs(players) do
  print(i, player)
end

-- Create an empty array with negative indices
array = {}

-- Initialize array with negative indexes
for i = -2, 2 do 
    array[i] = i * 2 
end

-- Print elements of the array
for i = -2, 2 do 
    print(array[i]) 
end

-- Create a 3x3 grid (tic-tac-toe board)
board = {
  {0, 1, 0},
  {1, 0, 2},
  {2, 1, 0}
}

-- Accessing an element in the grid
print(board[2][3])  -- Outputs: 2 (second row, third column)

topScores = {90, 72, 85, 60, 92}
table.sort(topScores)

for _, score in ipairs(topScores) do 
    print(score) 
end
