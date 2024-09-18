export const FEATURE = 0;
export const BUG = 1;
export const ENHANCEMENT = 2;
export const UI = 3;
export const UX = 4;

export function displayCategoryName(categoryInteger) {
    if (ENHANCEMENT === categoryInteger) return "Enhancement";
    else if (BUG === categoryInteger) return "Bug";
    else if (FEATURE === categoryInteger) return "Feature";
    else if (UI === categoryInteger) return "UI";
    else if (UX === categoryInteger) return "UX";


}