import { createContext } from "react";

export const FeedbackFiltersPageContext = createContext()


export const FeedbackFiltersConstants = {
    All:"All",
    UI:"UI",
    UX:"UX",
    Enhancement:"Enhancement",
    Bug:"Bug",
    Feature:"Feature",
    MostUpvotes:"Most Upvotes",
    LeastUpvotes:"Least Upvotes",
    MostComments:"Most Comments",
    LeastComments:"Least Comments"
}


