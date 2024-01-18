import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// export function sortData(data: any[], key: string) {
//   return data.sort((a: any, b: any) => {
//     return a[key] - b[key];
//   });
// }