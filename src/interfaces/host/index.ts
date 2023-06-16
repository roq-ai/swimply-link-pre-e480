import { PreviewPageInterface } from 'interfaces/preview-page';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface HostInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  preview_page?: PreviewPageInterface[];
  user?: UserInterface;
  _count?: {
    preview_page?: number;
  };
}

export interface HostGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
