import axios from "axios";
import { UserType } from "../redux/users-reducer";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
  headers: {
    "API-KEY": process.env.REACT_APP_API_KEY!,
  },
});

export const usersAPI = {
  getUsers(pageSize: number = 1, currentPage: number = 10) {
    return instance
      .get<GetUsersResponse>(`users?count=${pageSize}&page=${currentPage}`)
      .then((response) => response.data);
  },
  followUser(userId: number) {
    return instance
      .post<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  unFollowUser(userId: number) {
    return instance
      .delete<ResponseType>(`follow/${userId}`)
      .then((response) => response.data);
  },
};

export const profileAPI = {
  getUserProfile(userId: string) {
    return instance
      .get<ProfileModel>(`profile/${userId}`)
      .then((response) => response.data);
  },
  getStatus(userId: string) {
    return instance.get(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType>("profile/status", { status });
  },
};

export const authAPI = {
  getAuthData() {
    return instance
      .get<ResponseType<UserModel>>("auth/me")
      .then((response) => response.data);
  },
};

export type GetUsersResponse = {
  items: UserType[];
  totalCount: number;
  error: string;
};

export type ResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: [];
  data: D;
};

export type UserModel = {
  email: string;
  id: number;
  login: string;
};

export type ProfileModel = {
  aboutMe: string;
  contacts: ContactsModel;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  userId: number;
  photos: PhotosModel;
};

type ContactsModel = {
  facebook: string;
  website: string;
  vk: string;
  twitter: string;
  instagram: string;
  youtube: string;
  github: string;
  mainLink: string;
};

type PhotosModel = {
  small: string;
  large: string;
};
