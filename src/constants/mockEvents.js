const eventList = [
  {
    title: "Artistic Insights: Painting Techniques",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Unleash your creativity at our art workshop! Join our seasoned painters to learn about different painting techniques, from oil to watercolor.",
    address: "123 Dong Khoi Street, District 1, Ho Chi Minh City",
    date: "2023-06-15",
    time: "18:00-20:00",
  },
  {
    title: "Tech Talk: Future of AI",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Join industry experts as they discuss the future of Artificial Intelligence and its potential impacts on various sectors.",
    address: "456 Le Loi Street, District 3, Ho Chi Minh City",
    date: "2023-06-20",
    time: "19:00-21:00",
  },
  {
    title: "Healthy Living: Vegan Cooking Class",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Want to make delicious plant-based meals? Our chefs will teach you how to cook nutritious and tasty vegan dishes.",
    address: "789 Vo Van Kiet Street, District 5, Ho Chi Minh City",
    date: "2023-06-25",
    time: "18:00-20:00",
  },
  {
    title: "Yoga Session: Harmony of Mind and Body",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Unwind from the stress of daily life in our yoga session. Learn to harmonize your mind and body for improved wellness.",
    address: "321 Tran Hung Dao Street, District 1, Ho Chi Minh City",
    date: "2023-06-30",
    time: "07:00-08:30",
  },
  {
    title: "Photography Workshop: Capturing Moments",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Capture life's beautiful moments. Join our photography workshop and enhance your skills in different photography styles.",
    address: "102 Hai Ba Trung Street, District 1, Ho Chi Minh City",
    date: "2023-07-05",
    time: "15:00-17:00",
  },
  {
    title: "Musical Night: Classical Concert",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Experience a night of exquisite classical music. Our talented musicians will play timeless pieces from famous composers.",
    address: "204 Nguyen Trai Street, District 1, Ho Chi Minh City",
    date: "2023-07-10",
    time: "19:30-21:30",
  },
  {
    title: "Writing Workshop: Unleashing Creativity",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Find your voice and tell your story. Join our writing workshop to learn tips and techniques for effective storytelling.",
    address: "305 Le Van Sy Street, District 3, Ho Chi Minh City",
    date: "2023-07-15",
    time: "14:00-16:00",
  },
  {
    title: "Networking Event: Business Mixer",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Expand your network at our business mixer. Connect with industry professionals, entrepreneurs, and potential partners.",
    address: "407 Cach Mang Thang Tam Street, District 10, Ho Chi Minh City",
    date: "2023-07-20",
    time: "18:00-21:00",
  },
  {
    title: "Sustainable Living Workshop",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Discover how to live sustainably in our workshop. Learn practical strategies to reduce waste and conserve resources.",
    address: "508 Ba Thang Hai Street, District 10, Ho Chi Minh City",
    date: "2023-07-25",
    time: "14:00-16:00",
  },
  {
    title: "Wellness Talk: Mindfulness in Everyday Life",
    img: "https://images.unsplash.com/photo-1685468412851-228199f688d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2304&q=80",
    description:
      "Learn how to integrate mindfulness into your everyday life. Our experts will share tips for reducing stress and increasing focus.",
    address: "609 Truong Sa Street, Phu Nhuan District, Ho Chi Minh City",
    date: "2023-07-30",
    time: "10:00-12:00",
  },
];

export default eventList;
