export interface SignInRequestDTO {
  user: string;
  password: string;
}

export interface SignInResponseDTO {
  username: string;
  email: string;
  jwt: {
    token: string;
    expiresIn: string;
  }
}

export interface SignUpRequestDTO {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface SignUpResponseDTO {
  id: string;
  fullname: string;
  email: string;
  createdAt: Date;
}