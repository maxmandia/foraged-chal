import isEven from "./is-even";
export default function calculateStreak(string: string) {
  let prevCharEven = null;
  let startingStreakIndex = 0;
  let endingStreakIndex = 0;
  let streakLength = 0;
  let longestStreakStart = 0;
  let longestStreakEnd = 0;
  let longestStreakLength = 0;

  for (let i = 0; i < string.length; i++) {
    let currentCharEven = isEven(string[i]);

    // If the character is a space, keep the streak but do not increment streak length.
    if (currentCharEven === null) continue;

    if (prevCharEven === null) {
      prevCharEven = currentCharEven;
      streakLength = 1;
      endingStreakIndex = i;
      continue;
    }

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
