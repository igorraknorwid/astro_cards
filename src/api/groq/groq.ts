const cards_groq_params =
  " _id,title,image_slug,theme->{title,_id},subtheme->{title,_id},  years[]->{title},theme2[]->{title,_id},slug,warning";

const years_groq_params = "_id,title,";

const theme_groq_params = "_id,title,subtheme[]->{_id,title},";

export const groq_params = {
  cards_groq_params,
  years_groq_params,
  theme_groq_params,
};
