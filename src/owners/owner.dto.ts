export class CreateOwnerDto {
  fullName: string;
  phone: string;
  address: string;
}

export class UpdateOwnerDto {
  fullName?: string;
  phone?: string;
  address?: string;
}

export class ListOwnerDto {
  id: number;
  fullName: string;
  phone: string;
  address: string;
}
