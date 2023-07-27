import isEven from "./is-even";

export default function calculateStreak(string: string) {
  let prevCharEven = null;
  let startingStreakIndex = 0;
  let endingStreakIndex = 0;
  let streakLength = 0;
  let longestStreakStart = null;
  let longestStreakEnd = null;
  let longestStreakLength = 0;

  // additional logic to prevent first character being non-alphabetic
  if (
    string.length === 1 &&
    (!isNaN(parseInt(string[0])) || /\W/.test(string[0]))
  ) {
    return {
      streakLength: 0,
      streakStart: null,
      streakEnd: null,
    };
  }

  for (let i = 0; i < string.length; i++) {
    // If the character is non-alphabetic, break the streak.
    if (
      !isNaN(parseInt(string[i])) ||
      (/\W/.test(string[i]) && string[i] != " ")
    ) {
      // the streak has ended, check if it is the longest
      if (streakLength > longestStreakLength) {
        longestStreakStart = startingStreakIndex;
        longestStreakLength = streakLength;
        longestStreakEnd = endingStreakIndex; // Store end of the longest streak.
      }
      // start a new streak
      prevCharEven = null;
      startingStreakIndex = i + 1;
      streakLength = 0;
      continue;
    }

    let currentCharEven = isEven(string[i]);

    // If the character is a space, keep the streak but do not increment streak length.
    if (currentCharEven === null) continue;

    // If this is the first character, start a new streak.
    if (prevCharEven === null) {
      prevCharEven = currentCharEven;
      streakLength = 1;
      endingStreakIndex = i;
      continue;
    }

    // If the current character is the same as the previous character, continue the streak.
    if (prevCharEven == currentCharEven) {
      streakLength++; // continue the streak
      endingStreakIndex = i;
    } else {
      // the streak has ended, check if it is the longest
      if (streakLength > longestStreakLength) {
        longestStreakStart = startingStreakIndex;
        longestStreakLength = streakLength;
        longestStreakEnd = endingStreakIndex; // Store end of the longest streak.
      }
      // start a new streak
      startingStreakIndex = i;
      streakLength = 1;
      prevCharEven = currentCharEven;
    }
  }

  // check one last time if the last streak was the longest
  if (streakLength > longestStreakLength) {
    longestStreakStart = startingStreakIndex;
    longestStreakLength = streakLength;
    longestStreakEnd = endingStreakIndex;
  }

  return {
    streakLength: longestStreakLength,
    streakStart: longestStreakStart,
    streakEnd: longestStreakEnd,
  };
}
