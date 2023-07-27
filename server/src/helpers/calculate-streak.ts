import isEven from "./is-even";
export default function calculateStreak(string: string) {
  let prevCharEven = null;
  let startingStreakIndex = 0;
  let endingStreakIndex = 0;
  let longestStreakStart = 0;
  let longestStreakEnd = 0;

  for (let i = 0; i < string.length; i++) {
    if (string[i] === " ") continue;

    if (prevCharEven === null) {
      prevCharEven = isEven(string[i]);
      continue;
    }

    let currentCharEven = isEven(string[i]);

    if (prevCharEven == currentCharEven) {
      endingStreakIndex = i; // continue the streak
    } else {
      // the streak has ended, check if it is the longest
      if (
        endingStreakIndex - startingStreakIndex >
        longestStreakEnd - longestStreakStart
      ) {
        longestStreakStart = startingStreakIndex;
        longestStreakEnd = endingStreakIndex;
      }
      // start a new streak
      startingStreakIndex = i;
      endingStreakIndex = i;
      prevCharEven = currentCharEven;
    }
  }

  // check one last time if the last streak was the longest
  if (
    endingStreakIndex - startingStreakIndex >
    longestStreakEnd - longestStreakStart
  ) {
    longestStreakStart = startingStreakIndex;
    longestStreakEnd = endingStreakIndex;
  }

  return {
    streakLength: longestStreakEnd - longestStreakStart + 1,
    streakStart: longestStreakStart,
    streakEnd: longestStreakEnd,
  };
}
