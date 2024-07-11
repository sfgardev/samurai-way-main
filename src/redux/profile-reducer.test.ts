import { addPostAC, deletePostAC, ProfilePageType, profileReducer } from "./profile-reducer";

let state: ProfilePageType;

beforeEach(() => {
  state = {
    posts: [
      { id: 1, message: "Hi, how are you?", likesCount: 12 },
      { id: 2, message: "It's my first post", likesCount: 11 },
      { id: 3, message: "Blabla", likesCount: 11 },
      { id: 4, message: "Dada", likesCount: 11 },
    ],
    profile: {
      aboutMe: "",
      contacts: {
        facebook: "",
        github: "",
        instagram: "",
        mainLink: "",
        twitter: "",
        vk: "",
        website: "",
        youtube: "",
      },
      fullName: "",
      lookingForAJob: false,
      lookingForAJobDescription: "",
      photos: {
        small: "",
        large: "",
      },
      userId: 0,
    },
    status: "",
  };
});

it("new post should be added", () => {
  const action = addPostAC("new title");

  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(5);
  expect(newState.posts[4].id).toBe(5);
  expect(newState.posts[4].message).toBe("new title");
  expect(newState.posts[4].likesCount).toBe(0);
});

it("correct post should be deleted", () => {
  const action = deletePostAC(1);

  const newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});
