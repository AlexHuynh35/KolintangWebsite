export type SocialType = "facebook" | "instagram";

export interface Social {
  type: SocialType
  link: string
};

export interface Person {
  id: number
  name: string
  position: string
  description: string
  imageUrl: string
  socials: Social[]
};

export const people: Person[] = [
  {
    id: 1,
    name: "Paul Lomendehe",
    position: "Chairman",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 2,
    name: "Tommy Gonny",
    position: "Co-Chairman",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 3,
    name: "Surya Ginting",
    position: "Treasurer",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 4,
    name: "",
    position: "Music Director",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 5,
    name: "",
    position: "Sounds-Tech",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 6,
    name: "",
    position: "Logistic",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 7,
    name: "",
    position: "Administrative Event Planner",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
  {
    id: 8,
    name: "",
    position: "Custom & Makeup Artist",
    description: "Put Bio Here",
    imageUrl: "/media/general/kolintang.jpg",
    socials: [
      {
        type: "facebook",
        link: ""
      },
      {
        type: "instagram",
        link: ""
      },
    ]
  },
];
