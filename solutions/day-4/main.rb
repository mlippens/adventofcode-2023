lines = File.read('input.txt', encoding: 'UTF-8').strip.split("\n")

cards = lines.map do |l|
  match = /^Card\W+?([0-9]+?):(.*?)\|(.*)$/.match(l)
  card_id = match[1].to_i
  input = match[2].strip.split(' ').map(&:to_i)
  winning = match[3].strip.split(' ').map(&:to_i)

  {
    id: card_id,
    input: input,
    winning: (input.filter { |i| winning.include?(i) }).length
  }
end

result = 0
stack = Array.new(cards)
until stack.empty?
  card = stack.shift
  result += 1
  winning = card[:winning]

  cards[card[:id], winning].each do |c|
    stack.unshift(c)
  end
end

puts result
