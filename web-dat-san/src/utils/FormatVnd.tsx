export function formatToVND(number: number) {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
}

// export function formatVNDManual(amount: number) {
//   let str = amount.toString();
//   let reversed = str.split("").reverse();
//   let formatted = [];

//   for (let i = 0; i < reversed.length; i++) {
//     formatted.push(reversed[i]);
//     if ((i + 1) % 3 === 0 && i !== reversed.length - 1) {
//       formatted.push(".");
//     }
//   }

//   return formatted.reverse().join("") + " ₫";
// }
