#!/usr/bin/env ruby

input = ''"
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
..........
.....1*1..
"''

input = File.read('input.txt', encoding: 'UTF-8')

lines = input.chop.strip.split("\n")
puzzle_matrix = lines.map { |line| line.split('') }

def symbol?(input)
  !'0123456789.'.include?(input)
end

result_sum = 0

puzzle_matrix.each_with_index do |line, line_number|
  num_start_index = 0
  num_end_index = 0
  parsed_num = ''
  line.each_with_index do |char, i|
    is_num_char = char =~ /[0-9]/
    if is_num_char && parsed_num == ''
      num_start_index = i
      parsed_num += char
    elsif is_num_char
      parsed_num += char
    elsif !is_num_char && parsed_num != ''
      num_end_index = i - 1
      # puts "parsed num from #{num_start_index} to #{num_end_index}: #{parsed_num.to_i}"
      candidate = parsed_num.to_i
      parsed_num = ''
      adjacent_symbol = false
      if num_start_index.positive? && symbol?(line[num_start_index - 1])
        adjacent_symbol = true
        puts "adjacent match left #{candidate}"
      end
      if num_end_index < line.length - 1 && symbol?(line[num_end_index + 1])
        adjacent_symbol = true
        puts "adjacent match right #{candidate}"
      end
      if line_number.positive?
        adjacent_match_top = ((num_start_index - 1)..(num_end_index + 1)).to_a.any? do |i|
          if i >= 0 && i < puzzle_matrix[line_number - 1].length
            match = symbol?(puzzle_matrix[line_number - 1][i])
            match
          else
            false
          end
        end
        if adjacent_match_top
          adjacent_symbol = true
          puts "adjacent match top #{candidate}"
        end
      end
      if line_number < puzzle_matrix.length - 1
        adjacent_match_bot = ((num_start_index - 1)..(num_end_index + 1)).to_a.any? do |i|
          if i >= 0 && i < puzzle_matrix[line_number + 1].length
            match = symbol?(puzzle_matrix[line_number + 1][i])
            match
          else
            false
          end
        end
        if adjacent_match_bot
          adjacent_symbol = true
          puts "adjacent match bot #{candidate}"
        end
      end
      result_sum += candidate if adjacent_symbol
    end
  end
end

puts result_sum
