lines = File.read('input.txt', encoding: 'UTF-8').strip.split("\n")

cards = lines.map do |l|
  match = /^Card\W+?([0-9]+?):(.*?)\|(.*)$/.match(l)
  card_id = match[1].to_i
  input = match[2].strip.split(' ').map(&:to_i)
  winning = match[3].strip.split(' ').map(&:to_i)

  {
    id: card_id,
    input: input,
    winning: winning
  }
end

result = cards.inject(0) do |sum, card|
  input = card[:input]
  winning = card[:winning]

  points = input.inject(0) do |card_sum, i|
    card_sum + (winning.include?(i) ? 1 : 0)
  end
  result = points.positive? ? (points - 1).times.inject(1) { |r| r * 2 } : 0
  puts "Points #{points} for card #{card[:id]}: endresult #{result}"
  sum + result
end

puts result
