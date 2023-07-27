export default function isEven(char: string): boolean | null {
  if (char === " ") return null;

  const lowerChar = char.toLowerCase();
  const charCode = lowerChar.charCodeAt(0);

  // Check if the character is a letter
  if (charCode < 97 || charCode > 122) return false;

  // If the letter is a, c, e... return true. If b, d, f... return false.
  return (charCode - 97) % 2 === 0;
}
