import { PermissionItem } from "./permission-item.interface";


export interface PermissionGroup {
  groupName: string;
  permissions: PermissionItem[];
}