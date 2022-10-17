export interface SignInRequestDTO {
  user: string;
  password: string;
}

export interface SignInResponseDTO {
  username: string;
  email: string;
  jwt: { token: string; expiresIn: string };
}

export interface SignUpRequestDTO {
  username: string;
  email: string;
  password: string;
}
