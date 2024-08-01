export class AuthUserDTO {
  first_name: string;
  email: string;
  phone_number: string;
  role?: string;
  address?: string;
}

export class CurrentUserDTO {
  id: string;
  first_name: string;
  email: string;
  phone_number: string;
  role?: string;
  address?: string;
}