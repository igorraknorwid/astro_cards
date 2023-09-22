const cards_groq_params =
  " _id,title,image_slug,theme->{title,_id},subtheme->{title,_id},  years[]->{title},theme2[]->{title,_id},slug,warning";

export const groq_params = { cards_groq_params };
