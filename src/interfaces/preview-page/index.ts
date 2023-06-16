import { HostInterface } from 'interfaces/host';
import { GetQueryInterface } from 'interfaces';

export interface PreviewPageInterface {
  id?: string;
  link: string;
  host_id?: string;
  created_at?: any;
  updated_at?: any;

  host?: HostInterface;
  _count?: {};
}

export interface PreviewPageGetQueryInterface extends GetQueryInterface {
  id?: string;
  link?: string;
  host_id?: string;
}
