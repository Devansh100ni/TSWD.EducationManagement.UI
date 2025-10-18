export interface UsersDtos {
  id?: string;              
  roleId?: string | null;  
  roleName?: string | null;
  userName: string;
  fullName?: string | null;
  email: string;
  isActive: boolean;
  name?: string | null;
  surname?: string | null;
  phoneNumber?: string | null;
}
