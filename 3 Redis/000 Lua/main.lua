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
