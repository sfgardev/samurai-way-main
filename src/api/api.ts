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
  savePhoto(photo: File) {
    const formData = new FormData();
    formData.append("image", photo);
    return instance.put<ResponseType<{ photos: PhotosModel }>>(
      "profile/photo",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },
};

export const authAPI = {
  getAuthData() {
    return instance
      .get<ResponseType<UserModel>>("auth/me")
      .then((response) => response.data);
  },
  login(arg: LoginRequestArgs) {
    return instance.post<ResponseType<LoginDataModel>>("auth/login", arg);
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};

export type LoginDataModel = {
  userId: number;
  token: string;
};

export type LoginRequestArgs = {
  email: string;
  password: string;
  rememberMe?: boolean;
  captcha?: string;
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
  id: number | null;
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
