const placeList = [
  {
    title: "The Running Bean",
    address: "33 Mac Thi Buoi, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thiet-ke-the-running-bean-3.jpg",
      "https://theme.hstatic.net/200000196083/1000658513/14/en_blog_banner_2.png?v=33",
    ],
    category: "Coffee",
    description:
      "Nestled in the heart of downtown, the aroma of freshly roasted coffee beans wafts through the air as you enter the door of the luxurious coffee shop. The chic interior is adorned with plush velvet chairs and dimly lit chandeliers, creating an ambiance of elegance and sophistication. The menu features an array of handcrafted beverages, each made with the finest ingredients and brewed to perfection. Indulge in a decadent pastry or gourmet sandwich, all made with locally sourced, artisanal ingredients. The attentive and knowledgeable staff cater to your every need, ensuring a memorable and indulgent experience. Whether you're looking for a quiet place to work or a relaxing spot to catch up with friends, this coffee shop is the perfect destination for a truly luxurious coffee experience.",
    open: { from: 9, to: 22 },
    comments: [],
  },
  {
    title: "Du Bar",
    address: "36 Huynh Khuong Ninh, District 1, Ho Chi Minh city",
    images: [
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/1.jpg",
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/2.jpg",
    ],
    category: "Bar",
    description:
      "Tucked away in a discreet location, the premium luxury cocktail bar exudes an air of exclusivity and elegance. The sleek and stylish interior is adorned with plush leather seating and mood lighting, creating a chic and intimate ambiance. The menu boasts a selection of premium spirits, rare and vintage wines, and bespoke cocktails crafted by expert mixologists. Indulge in a gourmet bar snack or a delicious charcuterie board, all made with the finest ingredients. The attentive and knowledgeable staff provide impeccable service, catering to your every need and ensuring a memorable and indulgent experience. Whether you're celebrating a special occasion or simply enjoying a night out with friends, this cocktail bar is the perfect destination for a truly premium and luxurious experience.",
    open: { from: 20, to: 4 },
    comments: [],
  },
  {
    title: "The Gangs Central",
    address: "87 Nguyen Hue, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/0.%20fastimg/thi-cong-the-gangs-central-nguyen-hue-12.jpg",
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thi-cong-the-gangs-central-nguyen-hue-8.jpg",
    ],
    category: "Restaurant",
    description:
      "Nestled in a vibrant neighborhood, the premium beer drinking restaurant offers a relaxed and inviting atmosphere perfect for enjoying a cold brew. The rustic interior features wooden tables and walls adorned with vintage beer memorabilia, creating a cozy and laid-back ambiance. The menu boasts a vast selection of craft beers, including seasonal and rare brews from local and international breweries. Savor the flavors of artisanal bar snacks or indulge in a hearty meal paired with your favorite beer. The knowledgeable staff are passionate about beer and can recommend the perfect brew to suit your tastes. Whether you're a beer aficionado or simply looking for a fun and casual night out, this restaurant is the perfect destination for a truly premium and enjoyable beer drinking experience",
    open: { from: 18, to: 1 },
    comments: [],
  },

  {
    title: "The Running Bean",
    address: "33 Mac Thi Buoi, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thiet-ke-the-running-bean-3.jpg",
      "https://theme.hstatic.net/200000196083/1000658513/14/en_blog_banner_2.png?v=33",
    ],
    category: "Coffee",
    description:
      "Nestled in the heart of downtown, the aroma of freshly roasted coffee beans wafts through the air as you enter the door of the luxurious coffee shop. The chic interior is adorned with plush velvet chairs and dimly lit chandeliers, creating an ambiance of elegance and sophistication. The menu features an array of handcrafted beverages, each made with the finest ingredients and brewed to perfection. Indulge in a decadent pastry or gourmet sandwich, all made with locally sourced, artisanal ingredients. The attentive and knowledgeable staff cater to your every need, ensuring a memorable and indulgent experience. Whether you're looking for a quiet place to work or a relaxing spot to catch up with friends, this coffee shop is the perfect destination for a truly luxurious coffee experience.",
    open: { from: 9, to: 22 },
    comments: [],
  },
  {
    title: "Du Bar",
    address: "36 Huynh Khuong Ninh, District 1, Ho Chi Minh city",
    images: [
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/1.jpg",
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/2.jpg",
    ],
    category: "Bar",
    description:
      "Tucked away in a discreet location, the premium luxury cocktail bar exudes an air of exclusivity and elegance. The sleek and stylish interior is adorned with plush leather seating and mood lighting, creating a chic and intimate ambiance. The menu boasts a selection of premium spirits, rare and vintage wines, and bespoke cocktails crafted by expert mixologists. Indulge in a gourmet bar snack or a delicious charcuterie board, all made with the finest ingredients. The attentive and knowledgeable staff provide impeccable service, catering to your every need and ensuring a memorable and indulgent experience. Whether you're celebrating a special occasion or simply enjoying a night out with friends, this cocktail bar is the perfect destination for a truly premium and luxurious experience.",
    open: { from: 20, to: 4 },
    comments: [],
  },
  {
    title: "The Gangs Central",
    address: "87 Nguyen Hue, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/0.%20fastimg/thi-cong-the-gangs-central-nguyen-hue-12.jpg",
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thi-cong-the-gangs-central-nguyen-hue-8.jpg",
    ],
    category: "Restaurant",
    description:
      "Nestled in a vibrant neighborhood, the premium beer drinking restaurant offers a relaxed and inviting atmosphere perfect for enjoying a cold brew. The rustic interior features wooden tables and walls adorned with vintage beer memorabilia, creating a cozy and laid-back ambiance. The menu boasts a vast selection of craft beers, including seasonal and rare brews from local and international breweries. Savor the flavors of artisanal bar snacks or indulge in a hearty meal paired with your favorite beer. The knowledgeable staff are passionate about beer and can recommend the perfect brew to suit your tastes. Whether you're a beer aficionado or simply looking for a fun and casual night out, this restaurant is the perfect destination for a truly premium and enjoyable beer drinking experience",
    open: { from: 18, to: 1 },
    comments: [],
  },

  {
    title: "The Running Bean",
    address: "33 Mac Thi Buoi, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thiet-ke-the-running-bean-3.jpg",
      "https://theme.hstatic.net/200000196083/1000658513/14/en_blog_banner_2.png?v=33",
    ],
    category: "Coffee",
    description:
      "Nestled in the heart of downtown, the aroma of freshly roasted coffee beans wafts through the air as you enter the door of the luxurious coffee shop. The chic interior is adorned with plush velvet chairs and dimly lit chandeliers, creating an ambiance of elegance and sophistication. The menu features an array of handcrafted beverages, each made with the finest ingredients and brewed to perfection. Indulge in a decadent pastry or gourmet sandwich, all made with locally sourced, artisanal ingredients. The attentive and knowledgeable staff cater to your every need, ensuring a memorable and indulgent experience. Whether you're looking for a quiet place to work or a relaxing spot to catch up with friends, this coffee shop is the perfect destination for a truly luxurious coffee experience.",
    open: { from: 9, to: 22 },
    comments: [],
  },
  {
    title: "Du Bar",
    address: "36 Huynh Khuong Ninh, District 1, Ho Chi Minh city",
    images: [
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/1.jpg",
      "https://www.wowweekend.vn/document_root/upload/articles/image/BrowseContent/LifeStyle/202201/Du%20Bar%20n%C6%A1i%20th%C6%B0%E1%BB%9Fng%20th%E1%BB%A9c%20n%C6%B0%E1%BB%9Bc%20hoa%20niche/2.jpg",
    ],
    category: "Bar",
    description:
      "Tucked away in a discreet location, the premium luxury cocktail bar exudes an air of exclusivity and elegance. The sleek and stylish interior is adorned with plush leather seating and mood lighting, creating a chic and intimate ambiance. The menu boasts a selection of premium spirits, rare and vintage wines, and bespoke cocktails crafted by expert mixologists. Indulge in a gourmet bar snack or a delicious charcuterie board, all made with the finest ingredients. The attentive and knowledgeable staff provide impeccable service, catering to your every need and ensuring a memorable and indulgent experience. Whether you're celebrating a special occasion or simply enjoying a night out with friends, this cocktail bar is the perfect destination for a truly premium and luxurious experience.",
    open: { from: 20, to: 4 },
    comments: [],
  },
  {
    title: "The Gangs Central",
    address: "87 Nguyen Hue, District 1, Ho Chi Minh city",
    images: [
      "https://noithatkendesign.vn/storage/app/media/0.%20fastimg/thi-cong-the-gangs-central-nguyen-hue-12.jpg",
      "https://noithatkendesign.vn/storage/app/media/uploaded-files/thi-cong-the-gangs-central-nguyen-hue-8.jpg",
    ],
    category: "Restaurant",
    description:
      "Nestled in a vibrant neighborhood, the premium beer drinking restaurant offers a relaxed and inviting atmosphere perfect for enjoying a cold brew. The rustic interior features wooden tables and walls adorned with vintage beer memorabilia, creating a cozy and laid-back ambiance. The menu boasts a vast selection of craft beers, including seasonal and rare brews from local and international breweries. Savor the flavors of artisanal bar snacks or indulge in a hearty meal paired with your favorite beer. The knowledgeable staff are passionate about beer and can recommend the perfect brew to suit your tastes. Whether you're a beer aficionado or simply looking for a fun and casual night out, this restaurant is the perfect destination for a truly premium and enjoyable beer drinking experience",
    open: { from: 18, to: 1 },
    comments: [],
  },
];

export default placeList;
